import React from "react";

import FloorTitle from "../../component/floor-title";
import CouponItem from "../../component/coupon-item-f";
import "./index.scss";

export default function FirstFloor() {
  return (
    <div>
      <FloorTitle title="积分兑换" />
      <div className="other-floor">
        {["", "", "", ""].map(item => (
          <CouponItem />
        ))}
      </div>
    </div>
  );
}
