import React from 'react'
import './index.scss'
import Mask from "@/components/mask/mask";
import koiPopupWinning from "@/assets/koi/koi_popup_winning.png";
import koiPopupWinningBg from "@/assets/koi/koi_popup_winning_bg.png";
import koiPopupNotWon from "@/assets/koi/koi_popup_notwon.png";
import koiPopupCloseBtn from "@/assets/koi/koi_popup_closebtn.png";

class LotteryPopup extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
  }

  render(){
    const { winLottery } = this.props
    return (
        <div className='lotterypop'>
          <img src={ koiPopupWinningBg } className='lotterypop-bodybg' style={{ display: winLottery ? 'block' : 'none' }}/>
          <img src={ winLottery ? koiPopupWinning : koiPopupNotWon } className='lotterypop-body'/>
          <img src={ koiPopupCloseBtn } className='lotterypop-btn' onClick={ this.closePopup }/>
        </div>
    )
  }

  closePopup = () => {
    this.props.closePopup()
    this.props.closeLotteryPopup()
  }
}
export default Mask(LotteryPopup);