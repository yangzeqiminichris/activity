import React from 'react'

import { message } from 'antd'
import { Modal, Toast } from 'antd-mobile'
import { testPhone } from '@/utils/phone'
import { sendSms, checkLoginSms, preReleaseCoupon } from '@/api/dd'

import iconPhone from '@/assets/phone.png'
import iconPassword from '@/assets/password.png'

import './index.scss'
const alert = Modal.alert;
const SEND_SMS_LOGIN = 'PRE_RELEASE_COUPON'
const MAX_COUNT_DOWN = 60
const DEFAULT_BTN_TEXT = '获取验证码'
const windowHeight = window.innerHeight

export default class ActivityModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      countDownText: DEFAULT_BTN_TEXT,
      vcode: '',
      phone: '',
      showTips: true,
      bgImg: '',
      clientHeight: 736
    }
    this.pageTestPhone = this.pageTestPhone.bind(this)
  }
  countDownLoading = false
  componentWillMount () {
    let clientHeight =  document.documentElement.clientHeight
    this.setState({ clientHeight })
    let activityId = this.props.match.params.activityId
    preReleaseCoupon(activityId).then(res => {
      if (res && res.bgImg) {
        this.setState({
          bgImg: res.bgImg
        })
      }
    })
  }

  componentDidMount () {
      // //微信内置浏览器浏览H5页面弹出的键盘遮盖文本框的解决办法 
      // window.addEventListener("resize", function () {
      //     if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
      //         window.setTimeout(function () {
      //             document.activeElement.scrollIntoViewIfNeeded();
      //         }, 0);
      //     }
      // })
  }

  render () {
    const { countDownText, vcode, phone, showTips, bgImg, clientHeight } = this.state
    return (
      <div className='login' style={ {height: `${ clientHeight }px`} }>
        {/* style={ {backgroundImage: `url(${ 'https://zbdx.oss-cn-hangzhou.aliyuncs.com/goods/190830/6932772600727.png' })`} } */}
        <img
          className='bac-img'
          src={ bgImg }
          // style={ {height: `${ clientHeight }px`} }
        />
       <div className='info-box'>
          <div className='login-phone input-wrapper clearfix'>
            <img src={ iconPhone } className='input-wrapper-img' />
            <input
              type='tel'
              className='login-phone-input'
              placeholder='输入手机号码'
              value={ phone }
              onInput={ this.onInputPhone.bind(this) }
              onBlur={ this.pageTestPhone.bind(this) }
              onChange={ this.onChangePhone }
            />
          </div>
          <div className='login-vcode input-wrapper'>
          <img src={ iconPassword } className='input-wrapper-img' />
            <input
              className='login-vcode-input'
              id='v-code'
              placeholder='输入验证码'
              type='number'
              defaultValue={ vcode }
              onBlur={ this.vCodeBlur.bind(this) }
              onInput={ this.onInputVCode.bind(this) }
              onFocus={ this.vCodeFocus }
            />
            <button
              className={ ['login-vcode-btn', countDownText !== DEFAULT_BTN_TEXT || showTips ? 'login-vcode-btn-disable' : ''].join(' ') }
              onClick={ this.onClickGetVCode.bind(this) }
            >{ countDownText }</button>
          </div>
          <button className={ ['submit', showTips ? 'btn-disabled' : ''].join(' ') } onClick={ this.onClickLogin.bind(this) }>提交</button>
        </div>
      </div>
    )
  }

  onChangePhone (e) {
    
  } 

  onInputPhone (e) {
    let phone = e.target.value.length > 11 ? e.target.value.slice(0, 11) : e.target.value
    this.setState({
      phone
    })
    if (testPhone(phone)) {
      this.setState({
        showTips: false
      })
    } else {
      this.setState({
        showTips: true
      })
    }
  }
  onInputVCode (e) {
    this.setState({
      vcode: e.target.value
    })
  }
  async onClickGetVCode () {
    if (this.countDownLoading) return
    const { phone } = this.state
    if (!phone) {
        message.error('请输入手机号码')
      return
    } else if (!testPhone(phone)) {
      message.error('请输入正确手机号码')
      return
    }
    this.countDownLoading = true
    this.countDown(MAX_COUNT_DOWN)
    sendSms(phone, SEND_SMS_LOGIN)
  }
  async onClickLogin () {
    const { vcode, phone } = this.state
    if (!phone || !testPhone(phone)) {
      message.error('请输入正确手机号码')
      return
    }
    if (!vcode) {
        message.error('请输入正确验证码')
      return
    }
    Toast.loading("Loading...", 20);
    checkLoginSms(this.props.match.params.activityId, phone, vcode).then((res) => {
      alert('', res, [
        { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
        { text: '我知道了', onPress: () => console.log('ok') },
      ]);
      Toast.hide()
    }).catch(err => {
      alert('', err.msg, [
        { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
        { text: '我知道了', onPress: () => console.log('ok') },
      ]);
      Toast.hide()
    })
    // await this.props.dispatchCheckLoginSms(phone, vcode)
    // const { cardList } = this.props
    // if (cardList) {
    //   if (cardList.length > 1) {
    //     goto.user.bindCard()
    //   } else if (cardList.length === 0) {
    //     goto.user.chooseType()
    //     /* this.props.dispatchBindCardNo().then(() => {
    //       this.gotoFirstEdit()
    //     }) */
    //   } else if (cardList.length === 1) {
    //     this.props.dispatchBindCardNo(cardList[0].cardNo).then(() => {
    //       this.gotoFirstEdit()
    //     })
    //   }
    // }
  }
  countDown (second) {
    this.setState({
      countDownText: `${ second }秒后重试`
    })
    setTimeout(() => {
      if (second > 0) {
        this.countDown(second - 1)
      } else {
        this.countDownLoading = false
        this.setState({
          countDownText: DEFAULT_BTN_TEXT
        })
      }
    }, 1000)
  }
  pageTestPhone () {
    if (testPhone(this.state.phone)) {
      this.setState({
        showTips: false
      })
    } else {
      this.setState({
        showTips: true
      })
    }
    this.setScrollTop()
    // setTimeout(() => {
    //   window.scrollTo(0, 0)
    // }, 0)
  }
  vCodeBlur () {
    this.setScrollTop()
    // setTimeout(() => {
    //   window.scrollTo(0, 0)
    // }, 0)
  }
  vCodeFocus () {
    document.getElementById('v-code').focus()
  }
  setScrollTop () {
    let windowFocusHeight = window.innerHeight
    if (windowHeight == windowFocusHeight) {
      return
    }
    console.log(windowHeight + '--' + windowFocusHeight);
    console.log('修复');
    let currentPosition;
    let speed = 1; //页面滚动距离
    currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    currentPosition -= speed;
    window.scrollTo(0, currentPosition); //页面向上滚动
    currentPosition += speed; //speed变量
    window.scrollTo(0, currentPosition); //页面向下滚动
  }
}