import React from 'react'

import { Tabs, Toast } from 'antd-mobile'
import { message } from 'antd'
import { animateScroll as scroll } from 'react-scroll'
import { setToken } from '@/cache/token.js'
import { getActivityDetail, getCouponDetail, postReceiveCoupon } from '@/api/custom-modal'
import './index.scss'

const LAYOUT_LISt = 2

export default class ActivityModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activityConfig: {},
      couponList: [],
      tabTopShow: true,
      currentPage: 0,
      couponListIds: []
    }
  }

  componentWillMount () {
    window.addEventListener('scroll', this.handleScroll.bind(this), true)
  }

  componentDidMount () {
    Toast.loading('Loading...', 20)
    this.props.history.listen(() => {
      window.location.reload()
    })
    let token = this.getUrlToken('token', this.props.location.search)
    let shopCode = this.getUrlToken('shopCode', this.props.location.search)
    let activityId = this.getUrlToken('activityId', this.props.location.search)
    setToken(token).then(() => {
      // 获取活动详情
      getActivityDetail(activityId, shopCode).then(res => {
        if (!res) {
          message.error('暂无该活动信息')
          setTimeout(() => {
            window.wx.miniProgram.navigateBack({
              delta: -1
            })
          }, 1500)
          return 
        }
        if (res && res.name) {
          document.title = res.name
        }
        // 获取券详情
        res && this.getCouponList(res.couponList)
        this.setState({
          activityConfig: res,
          couponListIds: res.couponList
        }, () => {
          let activityModal = document.getElementsByClassName('activity-modal')
          let tabActive = document.getElementsByClassName('am-tabs-default-bar-tab-active')
          activityModal[0] && (activityModal[0].style.background = res.colorInfo.bgColor)
          tabActive[0] && (tabActive[0].style.background = res.colorInfo && res.colorInfo.groupSelectedColor)

          let tabsLength = res.activityGroup.length
          let tabs = document.getElementsByClassName('am-tabs-default-bar-tab')
          tabs[0 + tabsLength].style.background = res.colorInfo.groupSelectedColor
        })
      }).catch(() => {
        message.error('暂无该活动信息')
        setTimeout(() => {
          window.wx.miniProgram.navigateBack({
            delta: -1
          })
        }, 1500)
      })
    })
  }

  render () {
    const { activityConfig, couponList } = this.state
    const cul = activityConfig.templateType || 1
    let tabs = []
    if (activityConfig && activityConfig.activityGroup && activityConfig.activityGroup.length > 0) {
      activityConfig.activityGroup.forEach(item => {
        tabs.push({
          ...item,
          title: item.name
        })
      });
    }
    return <div className='activity-modal clearfix'>
      {
        couponList.length !== 0 && <div className='banner'>
          <img className='img' src={ activityConfig ? activityConfig.bgImg : '' } alt='' />
        </div>
      }
      {
        couponList.length !== 0 && <div className='coupon-list'>
          {
            couponList && couponList.map((item, index) => {
              return this.renderConponsItem(activityConfig, item, index === couponList.length - 1)
            })
          }
          <div className='white-space'></div>
        </div>
      }
      
      <div id='floor'>
        {
          activityConfig && tabs.length > 1 && this.renderActivityFloor(activityConfig, tabs)
        }
        {
          activityConfig.activityGroup && activityConfig.activityGroup.map((item, index) => {
            return index === 0 ? <div className={ `tabs-content click-autor ${ cul === LAYOUT_LISt && 'tabs-content-2' }` } key={item.id}>
              {
                item.goodsList.map((goods) => {
                  return this.renderTabsContentItem (cul, goods)
                })
              }
            </div> : <div className='click-autor' key={ item.id }>
              <img className='banner-icon' src={ item.icon } alt='暂无图片' />
              <div className='custom-list'>
                {
                  item.goodsList.map((goods, index) => {
                    return this.renderCustomItem (goods, index === item.goodsList.length - 1)
                  })
                }
                {
                  item.goodsList.length > 3 && <div className='white-space'></div>
                }
              </div>
            </div>
          })
        }

      </div>
    </div>
  }
  renderActivityFloor (activityConfig, tabs) {
    const { currentPage, tabTopShow } = this.state
    return (
      <div>
        {
          <Tabs
            tabs={tabs}
            page={ currentPage }
            animated={ false }
            tabBarUnderlineStyle={ {
              border: '2px #BA1D3A solid',
              bottom: '6px',
              width: '18px',
              marginLeft: tabs.length >= 5 ? '10%' : 100/2/tabs.length + '%' ,
              transform: 'translateX(-9px)',
              height: '2px',
              borderRadius: '2px'
            } }
            tabBarBackgroundColor={ activityConfig.colorInfo && activityConfig.colorInfo.groupBgColor }
            tabBarActiveTextColor={ activityConfig.colorInfo && activityConfig.colorInfo.fontSelectedColor }
            tabBarInactiveTextColor={ activityConfig.colorInfo && activityConfig.colorInfo.groupFontColor }
            tabBarTextStyle={ {
              fontSize: '14px',
              fontWeight: '600'
            } }
            onTabClick={ this.tabsClick.bind(this) }
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
          ></Tabs>
        }
        {
          <div className='top-floor' style={ {
            background: '#FFF',
            width: '100%',
            display: !tabTopShow ? 'block' : 'none'
          } }>
            <Tabs
              tabs={tabs}
              page={ currentPage }
              animated={ false }
              tabBarUnderlineStyle={ {
                border: '2px #BA1D3A solid',
                bottom: '6px',
                width: '18px',
                marginLeft: tabs.length >= 5 ? '10%' : 100/2/tabs.length + '%' ,
                transform: 'translateX(-9px)',
                height: '2px',
                borderRadius: '2px'
              } }
              tabBarBackgroundColor={ activityConfig && activityConfig.colorInfo && activityConfig.colorInfo.groupBgColor }
              tabBarActiveTextColor={ activityConfig && activityConfig.colorInfo && activityConfig.colorInfo.fontSelectedColor }
              tabBarInactiveTextColor={ activityConfig && activityConfig.colorInfo && activityConfig.colorInfo.groupFontColor }
              tabBarTextStyle={ {
                fontSize: '14px',
                fontWeight: '600'
              } }
              onTabClick={ this.tabsClick.bind(this) }
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
            ></Tabs>
          </div>
        }
      </div>
    )
  }
  // 顶部优惠券列表
  renderConponsItem (activityConfig, item, islast) {
    return (
      <div className={ `coupon-item ${ islast && 'white-space-none'}` } key={ item.id } style={ {
        backgroundImage: `url(${ activityConfig.couponBgImg })`,
        color: activityConfig.colorInfo ? activityConfig.colorInfo.couponFontColor : ''
        } }>
        <div className='top'>
          <div className='price'>
            <span className='sign'>￥</span>
            <span className='money'>{ item.couponGoodsInfo.couponValue }</span>
          </div>
          <div className='reduction'>满{ item.couponGoodsInfo.thresholdAmount }可用</div>
          <div className='limit points'></div>
          {/* item.couponGoodsInfo.intro */}
        </div>
        <div className='bottom'>
          <button
            onClick={ this.getCoupon.bind(this, item.id, item.reachPurchaseLimit, item.stock) }
            style={ { background: activityConfig.colorInfo ? activityConfig.colorInfo.couponFontColor : '' } }
          >{item.reachPurchaseLimit === 1 ? '已领取' : item.stock > 0 ? '立即领券' : '已抢光'}</button>
        </div>
      </div>
    )
  }
  // 楼层 1楼 单列双列
  renderTabsContentItem (cul, goods) {
    return (
      <div className='tabs-content-item' onClick={ this.goBuyGoods.bind(this, goods.goodsId) } key={ goods.goodsId }>
        <img src={ goods.goodsCover } className='img' alt='暂无图片' />
        <div className='info'>
          <div className={`name points ${ cul === LAYOUT_LISt ? 'width310' : 'width380' }`}>{ goods.goodsName }</div>
          <div className='title'>{ goods.goodsIntro }</div>
          {
            cul === LAYOUT_LISt ? <div className='col-2'>
              <div className='activity'>
                <span className='name'>限时活动价</span>
                <span className='price'><span className='sign'>￥</span>{ goods.goodsPrice }</span>
              </div>
              <div className='price'>
                {/* {
                  goods.goodsOriginalPrice > goods.goodsPrice
                } */}
                {
                  goods.activityType === 2 && <span className='origin-price'>原价{ goods.goodsOriginalPrice }</span>
                }
                
                <span className='btn'>立即抢购</span>
              </div>
            </div> : <div>
              <div className='activity'>
                活动价：<span className='price'>{ goods.goodsPrice }</span>元 
                {
                  goods.activityType === 2 && <span className='origin-price'>{ goods.goodsOriginalPrice }</span>
                }
              </div>
              <div className='btn'>立即抢购</div>
            </div>
          }
        </div>
      </div>
    )
  }
  // 底部多个楼层
  renderCustomItem (goods, islast) {
    return (
      <div className={ `custom-item ${ islast && 'white-space-none'}` } onClick={ this.goBuyGoods.bind(this, goods.goodsId) } key={ goods.goodsId }>
        <div className='img'>
          <img src={ goods.goodsCover } alt='暂无图片' />
        </div>
        <div className='goods-info'>
          <div className='title points'>{ goods.goodsName }</div>
          <div className='price clearfix'>
            <span className='sign'>￥</span><span className='amount'>{ goods.goodsPrice }</span>
            {
              goods.activityType === 2 && <span className='origin-price'>{ goods.goodsOriginalPrice }</span>
            }
          </div>
          <div className='btn'>
            立即抢购 >
          </div>
        </div>
      </div>
    )
  }
  // 获取优惠券列表
  getCouponList (couponList) {
    getCouponDetail(couponList).then(coupon => {
      Toast.hide();
      this.setState({
        couponList: coupon ? coupon.records : []
      })
    })
  }
  // 点击tabs
  tabsClick (title, index) {
    // 设置选中tabs
    this.setState({currentPage: index})

    // antd-mobile无选中背景颜色 配置选中背景色
    let tabsLength = this.state.activityConfig.activityGroup.length
    const { activityConfig } = this.state
    let tabs = document.getElementsByClassName('am-tabs-default-bar-tab')
    for (let i in tabs) {
      tabs[i].style && (tabs[i].style.background = activityConfig.colorInfo.groupBgColor)
    }

    // 页面中tabs 设置选中背景色
    tabs[index].style.background = activityConfig.colorInfo.groupSelectedColor
    // 顶部tabs 设置选中背景色
    tabs[index + tabsLength].style.background = activityConfig.colorInfo.groupSelectedColor
    
    // 滚动到 锚点
    let tabHeight = document.getElementsByClassName('am-tabs-top')[0].offsetHeight
    scroll.scrollTo(document.getElementsByClassName('click-autor')[index].offsetTop - tabHeight)
  }
  handleScroll () {
    let floorTop = document.getElementById('floor').offsetTop
    let scrollTop = this.getScrollTop()
    this.setState({
      tabTopShow: floorTop > scrollTop
    })
  }
  getCoupon (goodsId, reachPurchaseLimit, stock) {
    if (reachPurchaseLimit === 1 || stock === 0) {
      return
    }
    Toast.loading('Loading...', 20)
    postReceiveCoupon(goodsId).then(res => {
      console.log(res)
      // Toast.hide();
      message.success('领取成功')
      this.getCouponList (this.state.couponListIds)
    }).catch(() => {
      this.getCouponList (this.state.couponListIds)
    })
  }
  goBuyGoods (goodsId) {
    window.wx.miniProgram.navigateTo({
      url: '/o2o/pages/goods/detail/detail?goodsId=' + goodsId
    })
  }
  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${ name}=([^&]*)(&|$)`);
    const r = str.substr(1).match(reg);
    if (r != null) return  decodeURIComponent(r[2]); return null;
  }
  getScrollTop() {
    var scroll_top = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scroll_top = document.body.scrollTop;
    }
    return scroll_top;
  }
}