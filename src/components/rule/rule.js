import React from 'react'
import koiRuleLeft from '@/assets/koi/koi_rule_left.png'
import koiRuleRight from '@/assets/koi/koi_rule_right.png'
import koiActivityAreaBottom from '@/assets/koi/koi_activity_area_head.png'
import koiAwards from '@/assets/koi/koi_awards.png'
import './index.scss'

export default class Rule extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <div className='koi-activity-rule'>
          <img src={ koiActivityAreaBottom } className='koi-activity-rule-head'/>
          <div className='koi-activity-rule-area'>
            <div className='koi-activity-rule-area-head'>
              <img src={ koiRuleLeft } className='koi-activity-rule-area-head-icon'/>
              <p className='koi-activity-rule-area-head-title'>双11活动预告&礼品说明</p>
              <img src={ koiRuleRight } className='koi-activity-rule-area-head-icon'/>
            </div>
            <div className='koi-activity-rule-area-body'>
              <div className='koi-activity-rule-area-body-item'>
                <span className='koi-activity-rule-area-body-item-title'>活动时间：</span>
                <span className='koi-activity-rule-area-body-item-content'>11月1日-11月11日</span>
              </div>
              <div className='koi-activity-rule-area-body-item'>
                <span className='koi-activity-rule-area-body-item-title'>活动玩法：</span>
                <span className='koi-activity-rule-area-body-item-content'>
                1、点击“立即参与”按钮后即可获得一次锦鲤抽奖机会。11月11日21点浙北汇生活开奖入口开放，凭锦鲤参与资格参与幸运锦鲤抽奖。
              </span>
                <span className='koi-activity-rule-area-body-item-content'>
                2、11月11日19点-21点开奖，浙北汇生活将根据玩家的参与资格统一抽奖。
              </span>
              </div>
              <div className='koi-activity-rule-area-body-item'>
                <span className='koi-activity-rule-area-body-item-title'>开奖时间：</span>
                <span className='koi-activity-rule-area-body-item-content'>11月11日21点后公布中奖者（抽奖机会过期作废）</span>
              </div>
              <div className='koi-activity-rule-area-body-item' style={{ borderBottom: 'none' }}>
                <span className='koi-activity-rule-area-body-item-title'>活动奖品：</span>
                <span className='koi-activity-rule-area-body-item-content'>锦鲤礼包总价值39048.9元，锦鲤礼包详情见下图。</span>
              </div>
              <span className='koi-activity-rule-area-body-tips'>有任何疑问，电话咨询0572-2105066</span>
            </div>
          </div>
          <img src={ koiActivityAreaBottom } className='koi-activity-rule-bottom'/>
        </div>
        <div className='koi-activity-award'>
          <img src={ koiActivityAreaBottom } className='koi-activity-award-head'/>
          <img src={ koiAwards } className='koi-activity-award-body' />
          <img src={ koiActivityAreaBottom } className='koi-activity-award-bottom'/>
        </div>
      </div>

    )
  }
}