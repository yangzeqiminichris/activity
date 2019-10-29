import React from 'react';
import './index.scss';
import { Icon, Upload, message, Spin } from 'antd'
import TipsPopup from '@/components/tips-popup/tips-popup'

import couponCash from '@/assets/cash-coupon.png'
import couponDikou from '@/assets/manjian_img_normal.png'
import couponZhekou from '@/assets/zhukuo_img_normal.png'
import couponShip from '@/assets/yunfei_img_normal.png'
import koiMain from '@/assets/koi/koi_index_main.png'
import koiTitle from '@/assets/koi/koi_index_title.png'
import koiBottom from '@/assets/koi/koi_index_bottom.png'
import koiBtn from '@/assets/koi/koi_index_btn.png'
import koiIndexRule from '@/assets/koi/koi_index_rule.png'
import { setToken } from '@/cache/token.js'
import { getKoiIndex } from "../../api/koi";
import koiActivityAreaBottom from '@/assets/koi/koi_activity_area_head.png'
import RulePopUp from '@/components/rulePopup/rulePopup'
import Rule from '@/components/rule/rule'
import lotteryLeft from "@/assets/koi/koi_lottery_left.png";
import lotteryRight from "@/assets/koi/koi_lottery_right.png";
import lotteryBtnUnable from "@/assets/koi/koi_lottery_btn_unable.png";
import lotteryBtnAble from "@/assets/koi/koi_lottery_btn_able.png";
import lotteryBtnShare from "@/assets/koi/koi_lottery_btn_share.png";
import koiUpload from "@/assets/koi/koi_upload.png";
import { getToken } from "../../cache/token";

const COUPON_IMG = {
  1: couponDikou,
  2: couponZhekou,
  4: couponCash,
  5: couponShip
}

export default class Koi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settlementInfo: {
        couponVos: []
      },
      showFirstPage: true,
      showRulePopup: false,
      showTipsPopup: false,
      showTimesPopup: false,
      longitude: '',
      latitude: '',
      activityStatus: 0, // -1 已结束 0 未开始 1 进行中
      loading: true
    }
  }

  componentDidMount() {
    const that = this
    let t = this.props.location.search.split('&')
    let token = t[0].replace('?token=', '')
    this.props.history.listen(() => {
      console.log('this.props.history')
      window.location.reload()
    })
    let mapObj = new window.AMap.Map('iCenter');
    var geolocation
    mapObj.plugin('AMap.Geolocation', function () {
      geolocation = new window.AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new window.AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      mapObj.addControl(geolocation);
      geolocation.getCurrentPosition();
      window.AMap.event.addListener(geolocation, 'complete', (res) => {
        that.setState({
          longitude: res.position.getLng(),
          latitude: res.position.getLat()
        }, () => {
          setToken(token).then(() => {
            getKoiIndex(false, that.state.longitude, that.state.latitude).then((res) => {
              if (!res.isNew) {
                that.setState({
                  showFirstPage: false
                })
              }
              that.setState({
                activityStatus: res.activityStatus,
                loading: false
              })
            })
          })
        })
      });//返回定位信息
      window.AMap.event.addListener(geolocation, 'error', (res) => {
        setToken(token).then(() => {
          that.setState({
            loading: false
          }, () => { message.warn('获取定位失败') })
        })
      });      //返回定位出错信息
    })
  }

  render () {
    const { showRulePopup, showTipsPopup, loading, showTimesPopup } = this.state
    return (
      <Spin spinning={loading}>
        <div>
          { this.renderFirstPage() }
          { this.renderKoiActivity() }
          { showRulePopup && <RulePopUp showRulePopup={ showRulePopup } onClosePopup={ this.showRuleModal } /> }
          <div style={{ display: showTipsPopup ? 'block' : 'none'}}>
            <TipsPopup tips='活动尚未开始' closeTipsPopup={ this.closeTipsPopup } />
          </div>
          <div style={{ display: showTimesPopup ? 'block' : 'none'}}>
            <TipsPopup times='1' closeTipsPopup={ this.closeTipsPopup } />
          </div>
        </div>
      </Spin>
    )
  }

  renderFirstPage () {
    const { showFirstPage } = this.state
    return (
      showFirstPage &&
      (<div className='koi'>
        <img src={ koiIndexRule } className='koi-ruleicon' onClick={ this.showRuleModal }/>
        <img src={ koiTitle } className='koi-titleimg'/>
        <img src={ koiMain } className='koi-img'/>
        <img src={ koiBottom } className='koi-bottomimg'/>
        <img src={ koiBtn } className='koi-btnimg' onClick={ this.gotoKoiActivity }/>
      </div>)
    )
  }

  renderKoiActivity () {
    const { showFirstPage, activityStatus } = this.state
    return (
      !showFirstPage &&
      (<div className='koi-activity'>
        <div className='koi-activity-rule koi-activity-first'>
          <img src={ koiActivityAreaBottom } className='koi-activity-head'/>
          <div className='koi-activity-lottery-area'>
            {/*<div className='koi-activity-lottery-area-head'>
              <img src={ lotteryLeft } className='koi-activity-lottery-area-head-icon'/>
              <p className='koi-activity-lottery-area-head-title'>当前有2次抽奖机会</p>
              <img src={ lotteryRight } className='koi-activity-lottery-area-head-icon'/>
            </div>*/}
            <div className='koi-activity-lottery-area-instruction'>
              <span>11月11日21:00:00</span>
              <span className='koi-activity-lottery-area-instruction-big'>准时开奖哦~</span>
            </div>
            <img src={ activityStatus === 0 ? lotteryBtnUnable : lotteryBtnAble } className='koi-activity-lottery-area-btn' onClick={ this.gotoKoiLottery }/>
          </div>
          <img src={ koiActivityAreaBottom } className='koi-activity-bottom'/>
        </div>
        <Rule />
      </div>)
    )
  }

  gotoKoiActivity = () => {
    const { latitude, longitude } = this.state
    const token  = getToken()
    if (token && latitude && longitude) {
      this.getKoiTime().then(() => {
        this.setState({
          showFirstPage: false,
          showTimesPopup: true
        })
      })
    } else if (!token) {
      window.wx.miniProgram.navigateTo({url: '/pages/user/login/login'})
    } else if ( !latitude || !longitude) {
      message.warn('参加此活动需开启定位,若您已拒绝，请清理微信缓存后再次尝试')
    }
  }

  getKoiTime = () => {
    return getKoiIndex(true, this.state.longitude, this.state.latitude)
  }

  showRuleModal = () => {
    this.setState((prevState) => ({
      showRulePopup: !prevState.showRulePopup
    }))
  }

  gotoKoiLottery = () => {
    if (this.state.activityStatus === 0) {
      this.setState({
        showTipsPopup: true
      })
      /* this.props.history.push({
        pathname: `/koi-lottery`
      }) */
    } else {
      this.props.history.push({
        pathname: `/koi-lottery`
      })
    }
  }

  closeTipsPopup = () => {
    this.setState({
      showTipsPopup: false
    })
  }
}
