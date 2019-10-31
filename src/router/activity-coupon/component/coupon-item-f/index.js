import React from "react";
import moment from "moment";

import { couponType } from "../../config";
import "./index.scss";

export default function(props) {
  const { dataSource = {}, color } = props;
  const { couponGoodsInfo = {} } = dataSource;
  const { effectTime, invalidTime, timeType, invalidDay } = couponGoodsInfo;
  let start, end;
  if (timeType == 1) {
    start = moment(effectTime).format("MM.DD");
    end = moment(invalidTime).format("MM.DD");
  } else {
    start = moment().format("MM.DD");
    end = moment()
      .add(+invalidDay, "days")
      .format("MM.DD");
  }
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
          <div>满{couponGoodsInfo.thresholdAmount}元可用</div>
          <div>
            {start}-{end}
          </div>
        </div>
        <div className="cif-btn">{dataSource.credit}积分兑</div>
      </div>
    </div>
  );
}
