import React from "react";
import "./index.scss";

export default function(props) {
  return (
    <div className="cif">
      <div className="cif-header">
        <div className="cif-logo">雅诗兰黛</div>
        <div className="cif-money">
          <span className="cif-money-icon">￥</span>
          <span className="cif-money-num">60</span>
          <span className="cif-money-text">优惠券</span>
        </div>
      </div>
      <div className="cif-footer">
        <div className="cif-limit">11.8-11.11 满698元可用</div>
        <div className="cif-btn">1000积分兑</div>
      </div>
    </div>
  );
}
