import React from "react";

import { colorList } from "../../config";
import FloorTitle from "../../component/floor-title";
import CouponItem from "../../component/coupon-item-f";
import "./index.scss";

export default function FirstFloor(props) {
  const { dataSource = [], floorCouponList } = props;
  console.log(props);
  return (
    <div>
      {dataSource.map((floor, index) => (
        <div key={floor.floorName + index} className="other-floor click-autor">
          <img style={{ width: "100%" }} src={floor.floorBanner} />
          {(floorCouponList[index] || []).map((item, i) => (
            <CouponItem
              key={item.id + index}
              dataSource={item}
              color={colorList[i % 9]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
