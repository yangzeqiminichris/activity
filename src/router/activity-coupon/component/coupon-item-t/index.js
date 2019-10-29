import React from "react";
import { Icon } from "antd";
import moment from "moment";

import { couponType } from "../../config";
import "./index.scss";

export default function(props) {
  const { dataSource = {} } = props;
  const {
    stock,
    beginDatetime,
    endDatetime,
    couponGoodsInfo = {}
  } = dataSource;
  const start = moment(beginDatetime).format("MM.DD");
  const end = moment(endDatetime).format("MM.DD");
  console.log(dataSource);
  return (
    <div className="cit" onClick={() => props.goCouponDetail(dataSource.id)}>
      <div className="cit-limit">
        <div>限购</div>
        <div>{stock}份</div>
      </div>
      <div className="cit-coupon">
        <div className="cit-coupon-top">
          <div className="cit-coupon-money">
            <span className="cit-coupon-icon">￥</span>
            <span className="cit-coupon-text">
              {couponGoodsInfo.couponValue}
            </span>
          </div>
          <div className="cit-coupon-detail">
            <div>{couponType[couponGoodsInfo.couponType] || "优惠券"}</div>
            <div>
              {start}-{end}
            </div>
          </div>
        </div>
        <div className="cit-coupon-describe">{dataSource.name}</div>
      </div>
      <div className="cit-dash"></div>
      <div className="cit-bottom">
        <div className="cit-limit-text">
          满{couponGoodsInfo.thresholdAmount}使用
        </div>
        <div className="cit-btn">
          {dataSource.credit}积分兑
          <Icon
            type="right-circle"
            style={{
              backgroundColor: "#fff",
              color: "red",
              borderRadius: "50%"
            }}
          />
        </div>
      </div>
    </div>
  );
}
