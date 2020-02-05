import React from 'react'
import './index.scss'
import Mask from '@/components/mask/mask'
import { Icon } from 'antd'
import TitleImg from '../../img/title.png'

class TipsPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const { visible, onCancel } = this.props
    return (
      <div className={`popup-rule ${visible ? '' : 'disabled'}`}>
        <div className='bef-rule-box'>
          <Icon type='close-circle' className='close' onClick={onCancel} />
          <div className='title'>
            <img src={TitleImg} />
            <span>预约规则</span>
            <img className='img2' src={TitleImg} />
          </div>
          <div className='content'>
            <div>1. 2月6号9：00开始预约口罩；</div>
            <div>2. 每人每次限购5只口罩，数量有限，预约完为止；</div>
            <div>3. 预约成功后请于2月6号13：00-17：00至指定预约门店领取，逾期未领取自动失效；</div>
            <div>
              4. 指定领取地点：浙北超市红旗路店/碧浪湖店/米兰店/织里店，按照预约门店至服务台，凭个人身份证购买。
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Mask(TipsPopup)
