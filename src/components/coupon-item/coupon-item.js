import React from 'react'
import './index.scss'
import koiActivityAreaBottom from "@/assets/koi/koi_activity_area_head.png";
import iconInShop from '@/assets/only-in-shop.png'
import iconInline from '@/assets/only-in-line.png'

export default class CouponInfo extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
  }

  render(){
    const { couponInfo } = this.props
    return ((<div className='coupon-box'>
        <div className='coupon-list-box'>
          {
            (couponInfo.couponGoodsInfo && (couponInfo.couponGoodsInfo.verificationPlace === 1 || couponInfo.couponGoodsInfo.verificationPlace === 2)) ? <img src={ couponInfo.couponGoodsInfo.verificationPlace === 1 ? iconInline : iconInShop } className='shop-line-icon' /> : ''
          }
          <div className='coupon-list'>
            <div className='coupon-list--info'>
              <div className='info-img'>
                {/* <img src={ couponInfo.couponGoodsInfo.couponType === 1 ? iconReduction : iconDiscount } className='img' /> */}
                {
                  couponInfo.couponGoodsInfo && this.renderGetGoodsPic(couponInfo.couponGoodsInfo)
                }
              </div>
              <div className='info-detail'>
                <div className='titles'>{ couponInfo.name }</div>
                <div className='price'>
                  {/* 兑换条件：{ couponInfo.credit }积分+{ couponInfo.price / 100 }元 */}
                  {
                    couponInfo.couponGoodsInfo && couponInfo.couponGoodsInfo.timeType === 1 ? `${couponInfo.couponGoodsInfo.invalidTime}前有效` : couponInfo.couponGoodsInfo.timeType === 2 ? `领取成功后, ${ couponInfo.couponGoodsInfo.invalidDay }天有效` : ''
                  }
                  {/*{
                    couponInfo.credit > 0 ? '兑换条件：' : couponInfo.price > 0 ? '购买条件：' : '免费领取'
                  }
                  { couponInfo.credit > 0 ? `${ couponInfo.credit }积分` : '' }
                  {
                    couponInfo.credit > 0 && couponInfo.price > 0 ? '+' : ''
                  }
                  { couponInfo.price > 0 ? `${ couponInfo.price / 100 }元` : '' }*/}
                </div>
              </div>
            </div>
            <div className='coupon-list--handle'>
              <div className='handle-btn-box'>
                {
                  this.renderGetCouponBtn(couponInfo)
                }
              </div>
            </div>
          </div>
          {/* <div className='coupon-describe'>
                  <img src={ iconMoney } className='coupon-describe-img' />
                  <span className='coupon-describe-span'>兑换条件：{ couponInfo.credit }积分+{ couponInfo.price / 100 }元</span>
                </div> */}
        </div>
      </div>)
    )
  }

  renderGetGoodsPic (integralDetail) {
    return <div className='price-box'>
      <div className='sign'>
        {
          (integralDetail.couponType === 1 || integralDetail.couponType === 4 || integralDetail.couponType === 5) ? <span className='font-w-bo'>￥</span> : ''
        }
        {
          integralDetail.couponType !== 6 ? <span className='amount'>{ integralDetail.couponValue }</span> : <span className='amount amount-1'>兑换券</span>
        }
        {
          integralDetail.couponType === 2 ? '折' : ''
        }
        {
          integralDetail.couponType === 3 ? 'h' : ''
        }
      </div>
      {
        integralDetail.couponType !== 3 && integralDetail.thresholdAmount !== 0 ? <div className='intro'>满{ integralDetail.thresholdAmount }可用</div> : ''
      }
    </div>
  }

  renderGetCouponBtn (item) {
    if (item.reachPurchaseLimit === 1) {
      return <div disabled className='handle-btn-disabled'>已领取</div>
    } else if (item.stock === 0) {
      return <div disabled className='handle-btn-disabled'>已抢光</div>
    }
  }

  closePopup = () => {
    this.props.onClosePopup()
    this.stopBodyScroll(false)
  }
}
