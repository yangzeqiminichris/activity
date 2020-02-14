import React from 'react'
import './index.scss'
import Mask from '@/components/mask/mask'
import { Input, Button } from 'antd'
import informationLogo from '../../images/information_logo.png'

class TipsPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      showNameTips: false,
      idCard: '',
      showIdCardNoTips: false,
      code: '',
      showVerifyCodeTips: 0, // 1未空，2为错误，0为正确
      confirmDisabled: true
    }
  }

  componentDidMount() {}

  render() {
    const { name, showNameTips, idCard, showIdCardNoTips, code, showVerifyCodeTips, confirmDisabled } = this.state
    const { codeImg } = this.props
    return (
      <div className='subscribe-pop'>
        <img src={informationLogo} className='subscribe-pop-logo' />
        <div className='subscribe-pop-title'>填写身份信息</div>
        <div className='subscribe-pop-item'>
          <div className='subscribe-pop-item-main'>
            <div className='subscribe-pop-item-title'>姓名：</div>
            <Input
              className='subscribe-pop-item-input'
              placeholder='请输入姓名'
              value={name}
              onInput={this.onInputName.bind(this)}
              onBlur={this.testName.bind(this)}
            />
          </div>
          <span className='subscribe-pop-item-tips'>{showNameTips ? '*姓名不能为空' : ''}</span>
        </div>
        <div className='subscribe-pop-item'>
          <div className='subscribe-pop-item-main'>
            <div className='subscribe-pop-item-title'>身份证：</div>
            <Input
              className='subscribe-pop-item-input'
              placeholder='请输入身份证号'
              value={idCard}
              onInput={this.onInputIdCardNo.bind(this)}
              onBlur={this.testIdCardNo.bind(this)}
            />
          </div>
          <span className='subscribe-pop-item-tips'>{showIdCardNoTips ? '*身份信息有误请重新输入' : ''}</span>
        </div>
        <div className='subscribe-pop-item'>
          <div className='subscribe-pop-item-main'>
            <div className='subscribe-pop-item-title'>验证码：</div>
            <Input
              className='subscribe-pop-item-input'
              placeholder='请输入验证码'
              value={code}
              onInput={this.onInputVerifyCode.bind(this)}
              onBlur={this.testVerifyCode.bind(this)}
            />
            <img src={codeImg} className='verify-img' onClick={this.getVerifyCode.bind(this)} />
          </div>
          <span className='subscribe-pop-item-tips'>
            {showVerifyCodeTips === 1 ? '*请输入验证码' : showVerifyCodeTips === 2 ? '*验证码错误' : ''}
          </span>
        </div>
        <div className='btn'>
          <div className='cancel-btn' onClick={this.closePopup}>
            取消
          </div>
          <div
            className='confirm-btn'
            style={{ background: confirmDisabled ? '#f5f5f5' : '#F92051' }}
            onClick={this.onConfirm.bind(this)}
          >
            确认预约
          </div>
        </div>
      </div>
    )
  }

  closePopup = () => {
    this.props.closeTipsPopup()
  }

  onInputName = e => {
    this.setState({
      name: e.target.value
    })
  }

  testName = () => {
    window.scrollTo(0, 0)
    this.setState(
      prevState => {
        return {
          showNameTips: prevState.name ? false : true
        }
      },
      () => {
        this.confirmBtnState()
      }
    )
  }

  onInputIdCardNo = e => {
    this.setState({
      idCard: e.target.value
    })
  }

  checkIdCard = id => {
    var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
    if (reg.test(id)) {
      return true
    } else {
      return false
    }
  }

  testIdCardNo = () => {
    window.scrollTo(0, 0)
    this.setState(
      prevState => {
        return {
          showIdCardNoTips: !this.checkIdCard(prevState.idCard)
        }
      },
      () => {
        this.confirmBtnState()
      }
    )
  }

  onInputVerifyCode = e => {
    this.setState({
      code: e.target.value
    })
  }

  testVerifyCode = () => {
    window.scrollTo(0, 0)
    this.setState(
      prevState => {
        return {
          showVerifyCodeTips: prevState.code ? 0 : 1
        }
      },
      () => {
        this.confirmBtnState()
      }
    )
  }

  confirmBtnState = () => {
    if (this.state.showIdCardNoTips || this.state.showNameTips || this.state.showVerifyCodeTips !== 0) {
      this.setState({
        confirmDisabled: true
      })
    } else {
      this.setState({
        confirmDisabled: false
      })
    }
  }

  getVerifyCode = () => {
    this.props.getCode()
  }

  onConfirm = () => {
    if (this.state.confirmDisabled) {
      return
    } else {
      const { name, idCard, code } = this.state
      this.props.onOk({ name, idCard, code })
    }
  }
}
export default Mask(TipsPopup)
