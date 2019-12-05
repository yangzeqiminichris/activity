import React from "react";

import { colorList } from "../../config";
import CouponItem from "../../component/coupon-item-f";
import "./index.scss";

export default function OtherFloor(props) {
  const { dataSource = [], floorCouponList } = props;
  console.log('prop2s', props);
  return (
    <div>
      {dataSource.map((floor, index) => (
        <div key={floor.name + index} className='other click-autor'>
          <div className="other-floor">
            <img className="other-img" src={floor.icon} />
            {(floor.goodsList || []).map((item, i) => (
              <div style={{ display: (floor.showMore && i > 8) ? 'none' : 'block'}} key={item.goodsId + index}>
                <CouponItem
                  goCouponDetail={props.goCouponDetail}
                  dataSource={item}
                  color={'#FFFFFF'}
                />
              </div>
            ))}
          </div>
          <div className='watch-more' style={{ display: floor.showMore ? 'block' : 'none' }} onClick={ () => props.onClickShowMore(index)}>查看更多</div>
        </div>
        ))}
    </div>
  );
}
