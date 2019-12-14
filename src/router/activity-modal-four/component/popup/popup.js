import React from 'react'
import './index.scss'
import Mask from "@/components/mask/mask";
import koiPopupCloseBtn from "@/assets/koi/koi_rule_popup_close.png";

class TipsPopup extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
  }

  render(){
    const { imgBg } = this.props
    return (
      <div className='tipspopfour'>
        <div style={{position: 'relative'}}>
          <img src={ imgBg } className='tipspopfour-bodybg' />
          <div className='tipspopfour-btn-gouse' onClick={ this.goToUse }>去使用</div>
        </div>
        <img src={ koiPopupCloseBtn } className='tipspopfour-close' onClick={ this.closePopup }/>
        <div className='tipspopfour-tips'>
          <div style={{ display: this.props.tips ? 'block' : 'none'}}>{ this.props.tips }</div>
          <div style={{ display: this.props.smallTips ? 'block' : 'none'}} className='tipspopfour-tips-small'>{ this.props.smallTips }</div>
        </div>
      </div>
    )
  }

  closePopup = () => {
    this.props.closeTipsPopup()
  }

  goToUse = () => {
    this.props.closeTipsPopup()
    this.props.goLink()
  }
}
export default Mask(TipsPopup);
