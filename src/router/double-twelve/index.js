import React from "react";
import { Toast } from "antd-mobile";
import { message } from "antd";

import { setToken } from "@/cache/token.js";
import { getCouponDetail, postReceiveCoupon } from "@/api/custom-modal";
import "./index.scss";
import OtherFloor from "./view/other-floor";
import CouponItemTop from "./component/coupon-item-t";
import TabsView from "./view/tabs-view";
import { getActivityDetail } from "@/api/custom-modal";
import moment from 'moment'
import TwelvePopup from './component/popup/popup'

import HasNotStart from "@/assets/double-twelve/has_not_start.png";
import RunOut from "@/assets/double-twelve/run_out.png";
import HasReceived from "@/assets/double-twelve/has_received.png";
import {getToken} from "../../cache/token";



export default class ActivityModal extends React.Component {
  state = {
    activityConfig: {},
    couponList: [],
    tabs: [],
    floorCouponList: {},
    twelvePopupBg: HasNotStart,
    showPopup: false,
    twelvePopupTips: '',
    twelvePopupSmallTips: ''
  };

  async componentDidMount() {
    Toast.loading("Loading...", 20);
    this.props.history.listen(async () => {
      await this.componentDidMount();
      window.history.back(-1);
    });
    let token = this.getUrlToken('token', this.props.location.search)
    let shopCode = this.getUrlToken('shopCode', this.props.location.search)
    let activityId = this.props.match.params.activityId;
    await setToken(token).then(async () => {
      // 获取活动详情
      await getActivityDetail(activityId, shopCode).then(res => {
        if (!res) {
          message.error("暂无该活动");
          setTimeout(() => {
            window.wx.miniProgram.navigateBack({
              delta: -1
            });
          }, 1500);
          return;
        }
        if (res.title) {
          document.title = res.title;
        }
        Toast.hide();
        const { floors = [] } = res;
        res.couponList[2] && (res.couponList[2].runOutImg = '') && (res.couponList[2].hasReceivedImg = '')
        res.couponList[3] && (res.couponList[3].runOutImg = '') && (res.couponList[3].hasReceivedImg = '')
        res.activityGroup && (
          res.activityGroup.map((item, index) => {
            item.goodsList.length > 9 && (res.activityGroup[index].showMore = true)
            item.goodsList.length <= 9 && (res.activityGroup[index].showMore = false)
          })
        );
        this.setState({ activityConfig: res }, () => {
          let activityModal = document.getElementsByClassName("activity-modal");
          let tabActive =
            document.getElementsByClassName("am-tabs-default-bar-tab-active") ||
            [];
          activityModal[0] &&
          (activityModal[0].style.background = res.colorInfo.bgColor);
          [...tabActive].forEach(item => {
            item.style.background = res.colorInfo.groupSelectedColor;
          })
          let couponIds = []
          res.couponList.map((item, index) => {
            couponIds.push(item.id)
          })
          // 获取券详情
          getCouponDetail(couponIds).then((detail) => {
            let activityConfig = this.state.activityConfig
            detail.records.map((record) => {
              activityConfig.couponList.map((item) => {
                if (item.id === record.id) {
                  item['info'] = record
                }
              })
            })
            this.setState({
              activityConfig
            })
          })
        })
      })
    })
  }

  render() {
    const { activityConfig, couponList, floorCouponList, showPopup, twelvePopupBg, twelvePopupTips, twelvePopupSmallTips } = this.state;
    return (
      <div className="activity-modal clearfix">
        <div className="banner">
          <img
            className="img"
            src={activityConfig ? activityConfig.bgImg : ""}
            alt="暂无图片"
          />
        </div>
        <div className="coupon-list">
          {
            activityConfig.couponList && activityConfig.couponList.map((item, index) => {
              return (
                <div key={'coupon' + index} className='coupon-list-img' onClick={ this.receiveCoupon.bind(this, item, index) }>
                  <img src={(index < 2) ? item.img : item.reachPurchaseLimit ? item.hasReceivedImg : item.stock ? item.img : item.runOutImg } className='coupon-list-img'/>
                </div>
              )
            })
          }
        </div>
        {
          activityConfig.adList && activityConfig.adList.map((item, index) => {
            return (
              <div key={'ad' + index} className='ad' onClick={ this.gotoAdUrl.bind(this, item) }>
                <img src={item.adImg} className='ad-img'/>
              </div>
            )
          })
        }
        <div id="floor">
          {activityConfig && <TabsView dataSource={activityConfig} />}
          <div className={`tabs-content`}>
            <OtherFloor
              goCouponDetail={this.goCouponDetail}
              dataSource={activityConfig.activityGroup}
              floorCouponList={floorCouponList}
              onClickShowMore={ this.changeShowMore.bind(this)}
            />
          </div>
        </div>
        <div style={{ display: showPopup ? 'block' : 'none'}}>
          <TwelvePopup
            tips={ twelvePopupTips }
            smallTips={ twelvePopupSmallTips }
            imgBg={twelvePopupBg}
            closeTipsPopup={ this.closeLotteryPopup }
          />
        </div>
      </div>
    );
  }

  topDistance = 0

  goCouponDetail = (goods) => {
    if (goods.goodsStock === 0) {
      return
    } else {
      window.wx.miniProgram.navigateTo({
        url: "/o2o/pages/goods/detail/detail?goodsId=" + goods.shopGoodsId
      })
    }
  }

  receiveCoupon = (coupon, index) => {
    const { id: couponId, beginAt, endAt } = coupon
    console.log('coupon', coupon)
    if (coupon.reachPurchaseLimit || !coupon.info.stock) {
      return
    } else {
      if (beginAt && endAt) {
        const now = new Date().getTime()
        const start = new Date(moment(beginAt).format('YY.MM.DD')).getTime()
        const end = new Date(moment(endAt).format()).getTime()
        if (now < start) {
          if (index < 2) {
            message.warn("活动尚未开始~");
          } else {
            this.setState({
              showPopup: true,
              twelvePopupTips: '活动尚未开始~',
              twelvePopupSmallTips: `活动时间：${beginAt}至${endAt}`
            })
            this.stopBodyScroll(true)
          }
        } else if (now > end) {
          if (index < 2) {
            message.warn("活动已结束~");
          } else {
            this.setState({
              showPopup: true,
              twelvePopupTips: '活动已结束~',
              twelvePopupSmallTips: `活动时间：${beginAt}至${endAt}`
            })
            this.stopBodyScroll(true)
          }
        } else {
          let token = getToken()
          if (token) {
            postReceiveCoupon(coupon.id).then(() => {
              message.success('领取成功')
              this.getCouponInfo()
            }).catch((error) => {
              if (/^库存不足/.test(error.msg)) {
                if (index < 2) {
                  message.warn("库存不足");
                } else {
                  this.setState({
                    showPopup: true,
                    twelvePopupBg: RunOut
                  })
                  this.stopBodyScroll(true)
                }
              } else if (/^超过限购数量/.test(error.msg)) {
                if (index < 2) {
                  message.warn("您已经领取过啦~");
                } else {
                  this.setState({
                    showPopup: true,
                    twelvePopupBg: HasReceived
                  })
                  this.stopBodyScroll(true)
                }
              }
            })
          } else {
            window.wx.miniProgram.navigateTo({url: '/pages/user/login/login'})
          }
        }
      }
    }
  }

  gotoAdUrl = (ad) => {
    if (/^game?:\/\//.test(ad.adUrl)) {
      window.wx.miniProgram.navigateTo({
        url: `/packageA/pages/webviewGame/webviewGame?url=${ ad.adUrl }&title=${ ad.adTitle }`
      })
    } else {
      window.wx.miniProgram.navigateTo({
        url: `/packageA/pages/webviewWithToken/webviewWithToken?url=${ ad.adUrl }&title=${ ad.adTitle }`
      })
    }
  }

  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = str.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
  }

  stopBodyScroll = (isFixed) => {
    var bodyEl = document.body
    if (isFixed) {
      bodyEl.style.position = 'fixed'
      bodyEl.style.top = -this.topDistance + 'px'
    } else {
      bodyEl.style.position = ''
      bodyEl.style.top = ''
      window.scrollTo(0, this.topDistance) // 回到原先的top
    }
  }

  closeLotteryPopup = () => {
    this.setState((prevState) => ({
      showPopup: false
    }))
  }

  changeShowMore = (index) => {
    let t = this.state.activityConfig
    console.log(this.state)
    t.activityGroup[index].showMore = false
    this.setState({
      activityConfig: t
    })
  }
}
