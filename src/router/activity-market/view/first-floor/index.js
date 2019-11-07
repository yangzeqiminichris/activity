import React from "react";

import "./index.scss";

export default function FirstFloor(props) {
  const { floorBanner, coupons = [] } = props.dataSource || {};
  return (
    <div className="click-autor">
      {/* <FloorTitle title="900购1100" label="单笔购1100，不与其他活动优惠" /> */}
      <div className="floor1">
        <img
          className="floor1-banner"
          src={floorBanner}
        />
        {coupons.map(item => {
          return (
            <img
              style={{ width: "100%" }}
              className="floor1-item"
              key={"floor1" + item.id}
              src={item.img}
              onClick={() => props.goCouponDetail(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
