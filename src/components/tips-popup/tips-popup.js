import React from 'react'
import './index.scss'
import Mask from "@/components/mask/mask";
import koiPopupWinning from "@/assets/koi/koi_popup_winning.png";
import koiTipsBg from "@/assets/koi/koi_tips.png";
import koiTipsTimesBg from "@/assets/koi/koi_tips_times.png";
import koiPopupCloseBtn from "@/assets/koi/koi_rule_popup_close.png";
import koiTipsKnownBtn from "@/assets/koi/koi_tips_known.png";
import koiTipsLotteryNowBtn from "@/assets/koi/koi_tips_lottery_btn.png";

class TipsPopup extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
  }

  render(){
    const { times } = this.props
    return (
      <div className='tipspop'>
        <img src={ times ? koiTipsTimesBg : koiTipsBg } className='tipspop-bodybg' />
        <p className='tipspop-tips'>{ this.props.tips }</p>
        <img src={ koiPopupCloseBtn } className='tipspop-closebtn' onClick={ this.closePopup } />
        <img src={ times ? koiTipsLotteryNowBtn : koiTipsKnownBtn } className='tipspop-btn' onClick={ this.closePopup } />
      </div>
    )
  }

  closePopup = () => {
    this.props.closePopup()
    this.props.closeTipsPopup()
  }
}
export default Mask(TipsPopup);