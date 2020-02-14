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
            <div>1. 每人每天限购口罩2只，每5天可预约一次；</div>
            <div>
              2.
              领取时间：2020年2月15日-2月22日每天早上8点开通预约，售价19.9元/只，预约成功后次日10：00-17：00凭本人身份证号至安吉购物中心烟酒柜台付款后领取；
            </div>
            <div>3. 口罩数量有限，以提交申请的现后次序排序，口罩总量约满后即关闭当日预约通道，次日8点重新开始。</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Mask(TipsPopup)
