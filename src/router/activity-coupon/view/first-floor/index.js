import React from "react";

import FloorTitle from "../../component/floor-title";
import "./index.scss";

export default function FirstFloor() {
  return (
    <div>
      <FloorTitle title="900购1100" label="单笔购1100，不与其他活动优惠" />
      <div className="floor1">
        {/* <img className="floor1-img" src={couponBigImg} /> */}
        <div className="floor1-limit">
          <div>限购</div>
          <div>200份</div>
        </div>
        <div className="floor1-content">
          <div className="floor1-flex">
            <div className="floor1-money">
              <span className="floor1-money-icon">￥</span>
              <span className="floor1-money-text">1100</span>
            </div>
            <div className="floor1-title">鞋帽/纺织/男装/女装/化妆品可用</div>
          </div>
          <div className="floor1-flex">
            <div className="floor1-type">现金券</div>
            <div className="floor1-date">
              <div>购券日期：11月1日-10月10日</div>
              <div>购券日期：11月1日-10月10日</div>
            </div>
          </div>
        </div>
        <button className="floor1-btn">￥900购买</button>
      </div>
    </div>
  );
}
