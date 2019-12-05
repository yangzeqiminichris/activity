import React from 'react'
import moment from 'moment'

import { couponType } from '../../config'
import './index.scss'

export default function(props) {
  const { dataSource = {}, color } = props
  const { couponGoodsInfo = {} } = dataSource
  const { effectTime, invalidTime, timeType, invalidDay } = couponGoodsInfo
  let start, end
  if (timeType == 1) {
    start = moment(effectTime).format('MM.DD')
    end = moment(invalidTime).format('MM.DD')
  } else {
    start = moment().format('MM.DD')
    end = moment()
      .add(+invalidDay, 'days')
      .format('MM.DD')
  }
  console.log('dataSource', dataSource)
  let number = `${dataSource.goodsPrice}`.split('.')
  let integer = number[0]
  let decimal = number[1] ? (number[1].length >= 1 ? number[1] : number[1] + '0') : '00'
  return (
    <div className="cif" onClick={() => props.goCouponDetail(dataSource)}>
      <div className="cif-header" style={{ backgroundColor: color }}>
        <img src={dataSource.goodsCover} className='cif-logo-img'/>
      </div>
      <div
        className={`cif-footer ${couponGoodsInfo.couponType == 6 ? 'top' : ''}`}
      >
        <span className='cif-name'>
          {dataSource.goodsName}
        </span>
        <div className='cif-money'>
          <div className='cif-money-real'>
            <span className='cif-money-real-unit'>￥</span>{integer}
            <span className='cif-money-real-decimal'>.{decimal}</span>
          </div>
          <div className='cif-money-origin' style={{ display: dataSource.goodsOriginalPrice === dataSource.goodsPrice ? 'none' : 'block' }}>￥{dataSource.goodsOriginalPrice}</div>
        </div>
        <div className="cif-btn">
          立即抢购 >
        </div>
      </div>
    </div>
  )
}
