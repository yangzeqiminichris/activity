import React from "react";
import moment from "moment";

import { couponType } from "../../config";
import "./index.scss";

export default function(props) {
  const { dataSource = {}, color } = props;
  const { couponGoodsInfo = {} } = dataSource;
  const start = moment(couponGoodsInfo.effectTime).format("MM.DD");
  const end = moment(couponGoodsInfo.invalidTime).format("MM.DD");
  return (
    <div className="cif" onClick={() => props.goCouponDetail(dataSource.id)}>
      <div className="cif-header">
        <div className="cif-logo" style={{ backgroundColor: color }}>
          {dataSource.name}
        </div>
        <div className="cif-money">
          <span className="cif-money-icon">￥</span>
          <span className="cif-money-num">{couponGoodsInfo.couponValue}</span>
          <span className="cif-money-text">
            {couponType[couponGoodsInfo.couponType] || "优惠券"}
          </span>
        </div>
      </div>
      <div className="cif-footer">
        <div className="cif-limit">
          {start}-{end} 满{couponGoodsInfo.thresholdAmount}元可用
        </div>
        <div className="cif-btn">{dataSource.credit}积分兑</div>
      </div>
    </div>
  );
}
