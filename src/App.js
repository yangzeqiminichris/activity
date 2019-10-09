import React from 'react';
import logo from './logo.svg';
import './App.css';

import couponCash from '@/assets/cash-coupon.png'
import couponDikou from './assets/manjian_img_normal.png'
import couponZhekou from './assets/zhukuo_img_normal.png'
import couponShip from './assets/yunfei_img_normal.png'

const COUPON_IMG = {
  1: couponZhekou,
  2: couponDikou,
  4: couponCash,
  5: couponShip
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settlementInfo: {
        couponVos: [{
          couponName: "新建优惠券弹框",
          couponNum: "190927114161300477",
          couponType: 1,
          couponValue: 5,
          effectTime: "1569513600000",
          id: "1220809766893894706",
          invalidTime: "1571241599000",
          shopGoodsIds: ["111450"],
          status: 1,
          thresholdAmount: 10,
          verificationPlace: 1
        }]
      }
    }
  }

  componentDidMount() {

  }

  render () {
    const { settlementInfo } = this.state
    return (
        <div>
          <div className='choose'>
            {
              (settlementInfo.couponVos || []).map((item) => {
                let startDay = new Date(parseInt(item.effectTime))
                let startTime = `${ startDay.getFullYear() }.${ startDay.getMonth() + 1 }.${ startDay.getDate() } ${ startDay.getHours() }:${ startDay.getMinutes() }`
                let endDay = new Date(parseInt(item.invalidTime))
                let endTime = `${ endDay.getFullYear() }.${ endDay.getMonth() + 1 }.${ endDay.getDate() } ${ endDay.getHours() }:${ endDay.getMinutes() }`
                return (
                    <div className='choose-coupon' key={ item.couponNum } onClick={ this.pickCoupon.bind(this, item) }>
                      <div className='choose-coupon-left'>
                        <img src={COUPON_IMG[item.couponType]} className='choose-coupon-left-img' />
                      </div>
                      <div className='choose-coupon-middle'>
                        <div className='choose-coupon-middle-top'></div>
                        <div className='choose-coupon-middle-line'></div>
                        <div className='choose-coupon-middle-bottom'></div>
                      </div>
                      <div className='choose-coupon-right'>
                        <div className='choose-coupon-right-info'>
                          <p className='choose-coupon-right-info-name'>{ item.couponName }</p>
                          <p className='choose-coupon-right-info-time'>{startTime}至{endTime}</p>
                          <div className='choose-coupon-right-info-value'>
                            <div className='choose-coupon-right-info-value-price'>
                              <p className='choose-coupon-right-info-value-price-unit'>￥</p>
                              <p className='choose-coupon-right-info-value-price-price'>{ item.couponValue }</p>
                            </div>
                            <div className='choose-coupon-right-info-value-rule'>
                              <p className='choose-coupon-right-info-value-rule-text'>满{ item.thresholdAmount }元可用 </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                )
              })
            }
          </div>
        </div>
    )
  }

  pickCoupon = () => {

  }
}

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */
