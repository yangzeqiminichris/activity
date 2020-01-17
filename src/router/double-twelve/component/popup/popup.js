import React from 'react'
import './index.scss'
import Mask from "@/components/mask/mask";
import okBtn from "@/assets/double-twelve/ok_btn.png";

class TipsPopup extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
  }

  render(){
    const { imgBg } = this.props
    return (
      <div className='tipspop'>
        <img src={ imgBg } className='tipspop-bodybg' />
        <div className='tipspop-tips'>
          <div style={{ display: this.props.tips ? 'block' : 'none'}}>{ this.props.tips }</div>
          <div style={{ display: this.props.smallTips ? 'block' : 'none'}} className='tipspop-tips-small'>{ this.props.smallTips }</div>
        </div>
        <img src={ okBtn } className='tipspop-btn' onClick={ this.closePopup } />
      </div>
    )
  }

  closePopup = () => {
    this.props.closeTipsPopup()
  }
}
export default Mask(TipsPopup);
