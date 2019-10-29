import React from "react";
import { Toast } from "antd-mobile";
import { message } from "antd";

import { setToken } from "@/cache/token.js";
import { getCouponDetail, postReceiveCoupon } from "@/api/custom-modal";
import "./index.scss";
import FirstFloor from "./view/first-floor";
import OtherFloor from "./view/other-floor";
import CouponItemTop from "./component/coupon-item-t";
import TabsView from "./view/tabs-view";
import { getActivityDetail } from "./api/api";

export default class ActivityModal extends React.Component {
  state = {
    activityConfig: {},
    couponList: [],
    tabs: [],
    floorCouponList: {}
  };

  componentWillMount() {
    // window.addEventListener("scroll", this.handleScroll.bind(this), true);
  }

  componentDidMount() {
    Toast.loading("Loading...", 20);
    this.props.history.listen(() => {
      window.location.reload();
    });
    let token = this.getUrlToken("token", this.props.location.search);
    let activityId = this.getUrlToken("activityId", this.props.location.search);
    setToken(token).then(() => {
      // 获取活动详情
      getActivityDetail({ id: activityId }).then(res => {
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
        // 获取券详情
        const { floors = [] } = res;
        getCouponDetail(res.limitCoupons).then(coupon => {
          this.setState({
            couponList: coupon ? coupon.records : []
          });
        });
        floors.map((floor, index) => {
          getCouponDetail(floor.couponList).then(coupon => {
            const floorCouponList = { ...this.state.floorCouponList };
            floorCouponList[index] = coupon ? coupon.records : [];
            this.setState({ floorCouponList });
          });
        });
        this.setState({ activityConfig: res }, () => {
          let activityModal = document.getElementsByClassName("activity-modal");
          let tabActive =
            document.getElementsByClassName("am-tabs-default-bar-tab-active") ||
            [];
          activityModal[0] &&
            (activityModal[0].style.background = res.colors.bgColor);
          [...tabActive].forEach(item => {
            item.style.background = res.colors.floorSelectedColor;
          });
        });
      });
    });
  }

  render() {
    const { activityConfig, couponList, floorCouponList } = this.state;
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
          {couponList &&
            couponList.map((item, index) => {
              return <CouponItemTop key={"coupon" + index} dataSource={item} />;
            })}
          <div className="white-space"></div>
        </div>
        <div id="floor">
          {activityConfig && <TabsView dataSource={activityConfig} />}
          <div className={`tabs-content`}>
            <FirstFloor dataSource={activityConfig.firstFloor} />
            <OtherFloor
              dataSource={activityConfig.floors}
              floorCouponList={floorCouponList}
            />
          </div>
        </div>
      </div>
    );
  }

  getCoupon(goodsId, reachPurchaseLimit) {
    if (reachPurchaseLimit === 1) {
      return;
    }
    Toast.loading("Loading...", 10);
    postReceiveCoupon(goodsId).then(res => {
      console.log(res);
      Toast.hide();
      message.success("领取成功");
    });
  }
  goBuyGoods(goodsId) {
    window.wx.miniProgram.navigateTo({
      url: "/o2o/pages/goods/detail/detail?goodsId=" + goodsId
    });
  }
  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = str.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
  }
}
