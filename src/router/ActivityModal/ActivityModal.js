import React from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
import iconBanner from '@/assets/位图@2x.png'
import axios from 'axios'
import { getActivityDetail } from '@/api/custom-modal'
import './index.scss'

const LAYOUT_LISt = 2

export default class ActivityModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activityConfig: {}
    }
  }

  componentDidMount () {
    // let antdTabs = document.getElementsByClassName('am-tabs-default-bar-tab')
    // style.cssText='background: red'
  }

  componentDidMount () {
    getActivityDetail(12, 25).then(res => {
      document.title = res.name
      this.setState({
        activityConfig: res
      }, () => {
        let activityModal = document.getElementsByClassName('activity-modal')
        let tabActive = document.getElementsByClassName('am-tabs-default-bar-tab-active')
        activityModal[0] && (activityModal[0].style.background = res.colorInfo.bgColor)
        tabActive[0] && (tabActive[0].style.background = res.colorInfo && res.colorInfo.groupSelectedColor)
      })
      
    })
  }

  render () {
    
    const { activityConfig } = this.state
    const cul = activityConfig.templateType || 1
    let tabs = []
    if (activityConfig.activityGroup && activityConfig.activityGroup.length > 0) {
      activityConfig.activityGroup.forEach(item => {
        tabs.push({
          ...item,
          title: item.name
        })
      });
    }
    return <div className='activity-modal clearfix'>
      <div className='banner'>
        <img className='img' src={ activityConfig.bgImg } />
      </div>
      <div className='coupon-list'>
        {this.renderConponsItem(activityConfig)}
      </div>
      <div>
        {
          tabs.length > 0 && <Tabs
            tabs={tabs}
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
          activityConfig.activityGroup && activityConfig.activityGroup.map((item, index) => {
            return index ===0 ? <div className={ `tabs-content ${ cul === LAYOUT_LISt && 'tabs-content-2' }` }>
              {this.renderTabsContentItem (cul)}
            </div> : <div>
              <img className='banner-icon' src={ item.icon } />
              <div className='custom-list'>
                { this.renderCustomItem() }
                {/* <div className='white-space'></div> */}
              </div>
            </div>

          })
        }

      </div>
    </div>
  }
  renderConponsItem (activityConfig) {
    return (
      <div className='coupon-item' style={ {
        backgroundImage: `url(${ activityConfig.couponBgImg })`,
        color: activityConfig.colorInfo ? activityConfig.colorInfo.couponFontColor : ''
        } }>
        <div className='top'>
          <div className='price'>
            <span className='sign'>￥</span>
            <span className='money'>5</span>
          </div>
          <div className='reduction'>满50可用</div>
          <div className='limit'>仅生鲜品类可用</div>
        </div>
        <div className='bottom'>
          <button style={ { background: activityConfig.colorInfo ? activityConfig.colorInfo.couponFontColor : '' } }>立即领券</button>
        </div>
      </div>
    )
  }
  renderTabsContentItem (cul) {
    return (
      <div className='tabs-content-item'>
        <img src='https://zbszkj-dev.oss-cn-hangzhou.aliyuncs.com/image/190830/c7c96edb9b1e49388c54b93b2f8c41606907376203049.jfif?x-oss-process=image/resize,h_348,w_348' className='img' />
        <div className='info'>
          <div className={`name points ${ cul === LAYOUT_LISt ? 'width310' : 'width380' }`}>土鸡土蛋土鸡土蛋  土在自然</div>
          <div className='title'>叽嘟嘟土鸡蛋6枚/盒</div>
          {
            cul === LAYOUT_LISt ? <div className='col-2'>
              <div className='activity'>
                <span className='name'>限时活动价</span>
                <span className='price'><span className='sign'>￥</span>0.99</span>
              </div>
              <div className='price'>
                <span className='origin-price'>原价9.90</span>
                <span className='btn'>立即抢购</span>
              </div>
            </div> : <div>
              <div className='activity'>
                活动价：<span className='price'>0.99</span>元 <span className='origin-price'>9.90</span>
              </div>
              <div className='btn'>立即抢购</div>
            </div>
          }
        </div>
      </div>
    )
  }
  renderCustomItem () {
    return (
      <div className='custom-item'>
        <div className='img'>
          <img src='https://zbszkj-dev.oss-cn-hangzhou.aliyuncs.com/image/190830/c7c96edb9b1e49388c54b93b2f8c41606907376203049.jfif?x-oss-process=image/resize,h_348,w_348' />
        </div>
        <div className='goods-info'>
          <div className='title points'>纯享半熟芝士半熟芝士不好吃</div>
          <div className='price clearfix'>
            <span className='sign'>￥</span><span className='amount'>12.00</span><span className='origin-price'>19.00</span>
          </div>
          <div className='btn'>
            立即抢购 >
          </div>
        </div>
      </div>
    )
  }
  tabsClick (title, index) {
    const { activityConfig } = this.state
    
    let tabs = document.getElementsByClassName('am-tabs-default-bar-tab')
    // tabs.forEach((item, index) => {
    //   // item.style.background = '#FFF'
    // })
    for (let i in tabs) {
      tabs[i].style && (tabs[i].style.background = activityConfig.colorInfo.groupBgColor)
    }
    tabs[index].style.background = activityConfig.colorInfo.groupSelectedColor
  }
}