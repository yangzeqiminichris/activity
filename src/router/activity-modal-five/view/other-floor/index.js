import React from "react";

import { colorList } from "../../config";
import CouponItem from "../../component/coupon-item-f";
import "./index.scss";

export default function OtherFloor(props) {
  const { dataSource = [], floorCouponList } = props;
  return (
    <div>
      {dataSource.map((floor, index) => (
        <div key={floor.name + index} className='other click-autor'>
          <div className="other-floor">
            <img className="other-imgdouble" src={floor.icon} />
            <div className='goods'>
              {(floor.goodsList || []).map((item, i) => (
                <div style={{ display: 'block'}} key={item.goodsId + index}>
                  <CouponItem
                    goCouponDetail={props.goCouponDetail}
                    dataSource={item}
                    color={'#FFFFFF'}
                  />
                </div>
              ))}
            </div>
          </div>
          {/*<div className='watch-more' style={{ display: floor.showMore ? 'block' : 'none' }} onClick={ () => props.onClickShowMore(index)}>查看更多</div>*/}
        </div>
        ))}
    </div>
  );
}
