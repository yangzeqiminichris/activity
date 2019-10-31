import React from "react";
import { Icon } from "antd";
import moment from "moment";

import { couponType } from "../../config";
import "./index.scss";

export default function(props) {
  const { dataSource = {} } = props;
  const { stock, couponGoodsInfo = {} } = dataSource;
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
  console.log(dataSource);
  return (
    <div
      className={`cit`}
      onClick={() => props.goCouponDetail(dataSource.id, stock)}
    >
      {stock === 0 && <div className="disable"></div>}
      <div className="cit-limit">
        {stock === 0 ? (
          <div>抢光了</div>
        ) : (
          <>
            <div>限购</div>
            <div>{stock}份</div>
          </>
        )}
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
            <div className="cit-coupon-detail-date">
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
          <Icon type="right-circle" theme="filled" />
        </div>
      </div>
    </div>
  );
}
