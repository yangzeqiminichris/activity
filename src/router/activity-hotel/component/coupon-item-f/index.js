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
  return (
    <div className="cif" onClick={() => props.goCouponDetail(dataSource.id)}>
      <div className="cif-header">
        <div className="cif-logo" style={{ backgroundColor: color }}>
          <div className="cif-logo-text">{dataSource.name}</div>
        </div>
      </div>
      <div
        className={`cif-footer ${couponGoodsInfo.couponType == 6 ? 'top' : ''}`}
      >
        <div className="cif-money">
          {couponGoodsInfo.couponType != 6 && (
            <>
              <span className="cif-money-icon">￥</span>
              <span className="cif-money-num">
                {couponGoodsInfo.couponValue}
              </span>
            </>
          )}
          <span className="cif-money-text">
            {couponType[couponGoodsInfo.couponType] || '优惠券'}
          </span>
        </div>
        <div className="cif-limit">
          {couponGoodsInfo.couponType != 6 && (
            <div>满{couponGoodsInfo.thresholdAmount}元可用</div>
          )}
          <div>
            {start}-{end}
          </div>
        </div>
        <div className="cif-btn">
          {`${
            dataSource.credit
              ? `${dataSource.credit}积分`
              : `${dataSource.price / 100}元`
          }`}
          兑
        </div>
      </div>
    </div>
  )
}
