import React from 'react';
import './index.scss';
import { message } from 'antd';

import couponCash from '@/assets/cash-coupon.png'
import couponDikou from '@/assets/manjian_img_normal.png'
import couponZhekou from '@/assets/zhukuo_img_normal.png'
import couponShip from '@/assets/yunfei_img_normal.png'
import koiActivityAreaBottom from '@/assets/koi/koi_activity_area_head.png'
import { setToken } from '@/cache/token.js'
import { getKoiAwardResult } from "../../../api/koi";
import { getToken } from "@/cache/token";
import Rule from '@/components/rule/rule';
import RulePopUp from '@/components/rulePopup/rulePopup'
import LotteryPopup from '@/components/lottery-popup/lottery-popup'
import koiTitle from "@/assets/koi/koi_index_title.png";
import koiLotteryMain from '@/assets/koi/koi_lottery_bg.png'
import koiBottom from '@/assets/koi/koi_index_bottom.png';
import koiLotteryNow from '@/assets/koi/koi_lottery_now.png';
import koiIndexRule from "@/assets/koi/koi_index_rule.png";

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
      showRulePopup: false,
      showLotteryPopup: true,
      award: '',
      winLottery: false,
      interfaceFinish: false
    }
  }

  async componentWillMount() {
    await getKoiAwardResult().then(async (res) => {
      await this.setState({
        award: res.award,
        winLottery: res.winLottery,
        interfaceFinish: true
      })
    })
  }

  render () {
    const { showRulePopup, showLotteryPopup, award, winLottery, interfaceFinish } = this.state
    console.log('winLottery', winLottery)
    return (
      <div className='koi-lottery'>
        <img src={ koiIndexRule } className='koi-lottery-ruleicon' onClick={ this.showRuleModal }/>
        <img src={ koiTitle } className='koi-titleimg'/>
        <img src={ koiLotteryMain } className='koi-lottery-img'/>
        <img src={ koiBottom } className='koi-lottery-bottomimg'/>
        {/*<img src={ koiLotteryNow } className='koi-lottery-nowbtn' onClick={ this.lotteryNow } />*/}
        {
          award && <div className='koi-lottery-koi  koi-lottery-first'>
          <img src={ koiActivityAreaBottom } className='koi-lottery-koi-head'/>
          <div className='koi-lottery-koi-info'>
            {award}
          </div>
          <img src={ koiActivityAreaBottom } className='koi-lottery-koi-bottom'/>
        </div>
        }
        <div className={ award  ?  '': 'koi-lottery-first' } style={{ zIndex: 50 }}>
          <Rule />
        </div>
        { showRulePopup && <RulePopUp showRulePopup={ showRulePopup } onClosePopup={ this.showRuleModal } /> }
        <div style={{ display: showLotteryPopup && interfaceFinish ? 'block' : 'none'}}>
          <LotteryPopup winLottery={ winLottery } closeLotteryPopup={ this.closeLotteryPopup.bind(this) }/>
        </div>
      </div>
    )
  }

  showRuleModal = () => {
    this.setState((prevState) => ({
      showRulePopup: !prevState.showRulePopup
    }))
  }

  lotteryNow = () => {
    this.setState((prevState) => ({
      showLotteryPopup: !prevState.showLotteryPopup
    }))
    this.stopBodyScroll(true)
  }

  closeLotteryPopup = () => {
    this.setState((prevState) => ({
      showLotteryPopup: false
    }))
  }

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
}
