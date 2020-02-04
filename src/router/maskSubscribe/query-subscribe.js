import React from 'react'
import { Input, Button, message } from 'antd'
import { setToken } from '@/cache/token.js'

import './query-mask.scss'

export default class MaskSubscribe extends React.Component {
  state = {
    adCard: '',
    searchSuccess: true
  }
  componentWillMount() {
    this.props.history.listen(() => {
      window.location.reload()
    })
  }

  componentDidMount() {}

  render() {
    const { adCard, searchSuccess } = this.state
    return <div>
        <div>
            <Input
              className='login-phone-input'
              placeholder='输入身份证号码'
              value={ adCard }
              onInput={ this.onInputCardNumber.bind(this) }
              onBlur={ this.pageTestNumber.bind(this) }
            />
            <div className='sub-btn'>
                <Button type="primary" onClick={ this.submitCardNumber.bind(this) }>
                    查询
                </Button>
            </div>
            

        </div>
        {
            searchSuccess && <div className=''>
               <div className='success-text'>预约成功</div>
               <div className='mask-list'>
                   <div className='info-item'>
                       <div className='title'>预约门店:</div>
                       <div className='cotent'>浙北超市仁皇山店</div>
                   </div>
                   <div className='info-item'>
                       <div className='title'>预约到店时间:</div>
                       <div className='cotent'>01-31（明天）10：00 - 11：00</div>
                   </div>
                   <div className='info-item'>
                       <div className='title'>可购口罩数量:</div>
                       <div className='cotent'>5只</div>
                   </div>
                   <div className='info-item'>
                       <div className='title'>预约姓名:</div>
                       <div className='cotent'>赵国旗</div>
                   </div>
                   <div className='info-item'>
                       <div className='title'>预约身份证:</div>
                       <div className='cotent'>466987654836841598</div>
                   </div>
                   <div className='info-item'>
                       <div className='title'>门店地址:</div>
                       <div className='cotent'>湖州仁皇山超市</div>
                   </div>
                   <div className='info-item'>
                       <div className='title'>门店电话:</div>
                       <div className='cotent'>13131113113</div>
                   </div>
               </div>
            </div>
        }
        
    </div>
  }

  submitCardNumber () {
      const { adCard } = this.state
      // 提交adCard
      // *****
      // 成功
      this.setState({
          searchSuccess: true
      })
    //   message.error('该身份证无预约记录')

  }

  onInputCardNumber (e) {
    this.setState({
        adCard: e.target.value
    })
  }

  pageTestNumber () {
      if (!this.state.adCard) {
        message.error('请输入身份证号码')
      }
  }

  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    const r = str.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  }
}