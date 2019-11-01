import React from 'react'
import './index.scss'
import koiActivityAreaBottom from "@/assets/koi/koi_activity_area_head.png";
import koiRulePopupTitle from '@/assets/koi/koi_rule_popup_title.png'
import koiRulePopupClose from '@/assets/koi/koi_rule_popup_close.png'

export default class RulePopup extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    this.stopBodyScroll(this.props.showRulePopup)
  }

  render(){
    const { showRulePopup } = this.props
    return (
      showRulePopup &&
      (<div className='popup'>
        <div className='popup-body'>
          <img src={ koiActivityAreaBottom } className='popup-body-head'/>
          <div className='popup-body-rule'>
            <div className='popup-body-rule-area'>
              {/*<div className='popup-body-rule-area-head'>
                <img src={ koiRuleLeft } className='popup-body-rule-area-head-icon'/>
                <p className='popup-body-rule-area-head-title'>双11活动预告&礼品说明</p>
                <img src={ koiRuleRight } className='popup-body-rule-area-head-icon'/>
              </div>*/}
              <div className='popup-body-rule-area-body'>
                <div className='popup-body-rule-area-body-item'>
                  <span className='popup-body-rule-area-body-item-title'>活动时间：</span>
                  <span className='popup-body-rule-area-body-item-content'>11月1日-11月11日</span>
                </div>
                <div className='popup-body-rule-area-body-item'>
                  <span className='popup-body-rule-area-body-item-title'>活动玩法：</span>
                  <span className='popup-body-rule-area-body-item-content'>
                    1、点击“立即参与”按钮后即可获得一次锦鲤抽奖机会。11月11日21点浙北汇生活开奖入口开放，凭锦鲤参与资格参与幸运锦鲤抽奖
                  </span>
                  <span className='popup-body-rule-area-body-item-content'>
                    2、11月11日19点-21点开奖，浙北汇生活将根据玩家的参与资格统一抽奖。
                  </span>
                </div>
                <div className='popup-body-rule-area-body-item'>
                  <span className='popup-body-rule-area-body-item-title'>开奖时间：</span>
                  <span className='popup-body-rule-area-body-item-content'>11月11日21点后公布中奖者（抽奖机会过期作废）</span>
                </div>
                <div className='popup-body-rule-area-body-item' style={{ borderBottom: 'none' }}>
                  <span className='popup-body-rule-area-body-item-title'>活动奖品：</span>
                  <span className='popup-body-rule-area-body-item-content'>锦鲤礼包总价值39048.9元，锦鲤礼包详情见活动页面。</span>
                </div>
                <span className='popup-body-rule-area-body-tips'>有任何疑问，电话咨询0572-2105066</span>
              </div>
            </div>
          </div>
          <img src={ koiActivityAreaBottom } className='popup-body-bottom'/>
          <img src={ koiRulePopupTitle } className='popup-body-title' />
          <img src={ koiRulePopupClose } className='popup-body-close' onClick={ this.closePopup }/>
        </div>
      </div>)
    )
  }

  topDistance = 0

  stopBodyScroll (isFixed) {
    var bodyEl = document.body
    if (isFixed) {
      this.top1 = window.scrollY
      bodyEl.style.position = 'fixed'
      bodyEl.style.top = -this.topDistance + 'px'
    } else {
      bodyEl.style.position = ''
      bodyEl.style.top = ''
      window.scrollTo(0, this.topDistance) // 回到原先的top
    }
  }

  closePopup = () => {
    this.props.onClosePopup()
    this.stopBodyScroll(false)
  }
}