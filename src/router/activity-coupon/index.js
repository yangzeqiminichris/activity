import React from "react";

import { Tabs, Toast } from "antd-mobile";
import { message } from "antd";
import { animateScroll as scroll } from "react-scroll";
import { setToken } from "@/cache/token.js";
import {
  getActivityDetail,
  getCouponDetail,
  postReceiveCoupon
} from "@/api/custom-modal";
import "./index.scss";
import FirstFloor from "./view/first-floor";
import OtherFloor from "./view/other-floor";
// import { getActivityDetail } from "./api/api";

const LAYOUT_LISt = 2;

export default class ActivityModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityConfig: {},
      couponList: [],
      tabTopShow: true,
      currentPage: 0
    };
  }

  componentWillMount() {
    window.addEventListener("scroll", this.handleScroll.bind(this), true);
  }

  componentDidMount() {
    Toast.loading("Loading...", 20);
    this.props.history.listen(() => {
      window.location.reload();
    });
    let token = this.getUrlToken("token", this.props.location.search);
    let shopCode = this.getUrlToken("shopCode", this.props.location.search);
    let activityId = this.getUrlToken("activityId", this.props.location.search);
    setToken(token).then(() => {
      // 获取活动详情
      getActivityDetail(activityId, shopCode).then(res => {
        if (!res) {
          message.error("暂无该活动");
          setTimeout(() => {
            window.wx.miniProgram.navigateBack({
              delta: -1
            });
          }, 1500);
          return;
        }
        if (res && res.name) {
          document.title = res.name;
        }
        // 获取券详情
        res &&
          getCouponDetail(res.couponList).then(coupon => {
            Toast.hide();
            this.setState({
              couponList: coupon ? coupon.records : []
            });
          });
        this.setState(
          {
            activityConfig: res
          },
          () => {
            let activityModal = document.getElementsByClassName(
              "activity-modal"
            );
            let tabActive = document.getElementsByClassName(
              "am-tabs-default-bar-tab-active"
            );
            activityModal[0] &&
              (activityModal[0].style.background = res.colorInfo.bgColor);
            tabActive[0] &&
              (tabActive[0].style.background =
                res.colorInfo && res.colorInfo.groupSelectedColor);
          }
        );
      });
    });
  }

  render() {
    const { activityConfig, couponList } = this.state;
    const cul = activityConfig.templateType || 1;
    let tabs = [];
    if (
      activityConfig &&
      activityConfig.activityGroup &&
      activityConfig.activityGroup.length > 0
    ) {
      activityConfig.activityGroup.forEach(item => {
        tabs.push({
          ...item,
          title: item.name
        });
      });
    }
    return (
      <div className="activity-modal clearfix">
        <div className="banner">
          <img
            className="img"
            src={activityConfig ? activityConfig.bgImg : ""}
            alt="暂无图片"
          />
        </div>
        <div className="coupon-list">
          {couponList &&
            couponList.map((item, index) => {
              return this.renderConponsItem(
                activityConfig,
                item,
                index === couponList.length - 1
              );
            })}
          <div className="white-space"></div>
        </div>
        <div id="floor">
          {activityConfig && this.renderActivityFloor(activityConfig, tabs)}
          <div
            className={`tabs-content click-autor ${cul === LAYOUT_LISt &&
              "tabs-content-2"}`}
          >
            <FirstFloor />
            <OtherFloor />
          </div>
        </div>
      </div>
    );
  }
  renderActivityFloor(activityConfig, tabs) {
    const { currentPage, tabTopShow } = this.state;
    return (
      <div>
        {
          <Tabs
            tabs={tabs}
            page={currentPage}
            animated={false}
            tabBarUnderlineStyle={{
              border: "2px #BA1D3A solid",
              bottom: "6px",
              width: "18px",
              marginLeft:
                tabs.length >= 5 ? "10%" : 100 / 2 / tabs.length + "%",
              transform: "translateX(-9px)",
              height: "2px",
              borderRadius: "2px"
            }}
            tabBarBackgroundColor={
              activityConfig.colorInfo && activityConfig.colorInfo.groupBgColor
            }
            tabBarActiveTextColor={
              activityConfig.colorInfo &&
              activityConfig.colorInfo.fontSelectedColor
            }
            tabBarInactiveTextColor={
              activityConfig.colorInfo &&
              activityConfig.colorInfo.groupFontColor
            }
            tabBarTextStyle={{
              fontSize: "14px",
              fontWeight: "600"
            }}
            onTabClick={this.tabsClick.bind(this)}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
          ></Tabs>
        }
        {
          <div
            className="top-floor"
            style={{
              background: "#FFF",
              width: "100%",
              display: !tabTopShow ? "block" : "none"
            }}
          >
            <Tabs
              tabs={tabs}
              page={currentPage}
              animated={false}
              tabBarUnderlineStyle={{
                border: "2px #BA1D3A solid",
                bottom: "6px",
                width: "18px",
                marginLeft:
                  tabs.length >= 5 ? "10%" : 100 / 2 / tabs.length + "%",
                transform: "translateX(-9px)",
                height: "2px",
                borderRadius: "2px"
              }}
              tabBarBackgroundColor={
                activityConfig &&
                activityConfig.colorInfo &&
                activityConfig.colorInfo.groupBgColor
              }
              tabBarActiveTextColor={
                activityConfig &&
                activityConfig.colorInfo &&
                activityConfig.colorInfo.fontSelectedColor
              }
              tabBarInactiveTextColor={
                activityConfig &&
                activityConfig.colorInfo &&
                activityConfig.colorInfo.groupFontColor
              }
              tabBarTextStyle={{
                fontSize: "14px",
                fontWeight: "600"
              }}
              onTabClick={this.tabsClick.bind(this)}
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
            ></Tabs>
          </div>
        }
      </div>
    );
  }
  // 顶部优惠券列表
  renderConponsItem(activityConfig, item, islast) {
    return (
      <div
        className={`coupon-item ${islast && "white-space-none"}`}
        key={item.id}
        style={{
          backgroundImage: `url(${activityConfig.couponBgImg})`,
          color: activityConfig.colorInfo
            ? activityConfig.colorInfo.couponFontColor
            : ""
        }}
      >
        <div className="top">
          <div className="price">
            <span className="sign">￥</span>
            <span className="money">{item.couponGoodsInfo.couponValue}</span>
          </div>
          <div className="reduction">
            满{item.couponGoodsInfo.thresholdAmount}可用
          </div>
          <div className="limit points">{item.couponGoodsInfo.intro}</div>
        </div>
        <div className="bottom">
          <button
            onClick={this.getCoupon.bind(
              this,
              item.id,
              item.reachPurchaseLimit
            )}
            style={{
              background: activityConfig.colorInfo
                ? activityConfig.colorInfo.couponFontColor
                : ""
            }}
          >
            {item.reachPurchaseLimit === 1 ? "已领取" : "立即领券"}
          </button>
        </div>
      </div>
    );
  }

  // 底部多个楼层
  renderCustomItem(goods, islast) {
    return <div>123</div>;
  }

  // 点击tabs
  tabsClick(title, index) {
    // 设置选中tabs
    this.setState({ currentPage: index });

    // antd-mobile无选中背景颜色 配置选中背景色
    let tabsLength = this.state.activityConfig.activityGroup.length;
    const { activityConfig } = this.state;
    let tabs = document.getElementsByClassName("am-tabs-default-bar-tab");
    for (let i in tabs) {
      tabs[i].style &&
        (tabs[i].style.background = activityConfig.colorInfo.groupBgColor);
    }

    // 页面中tabs 设置选中背景色
    tabs[index].style.background = activityConfig.colorInfo.groupSelectedColor;
    // 顶部tabs 设置选中背景色
    tabs[index + tabsLength].style.background =
      activityConfig.colorInfo.groupSelectedColor;

    // 滚动到 锚点
    let tabHeight = document.getElementsByClassName("am-tabs-top")[0]
      .offsetHeight;
    scroll.scrollTo(
      document.getElementsByClassName("click-autor")[index].offsetTop -
        tabHeight
    );
  }
  handleScroll() {
    let floorTop = document.getElementById("floor").offsetTop;
    let scrollTop = this.getScrollTop();
    this.setState({
      tabTopShow: floorTop > scrollTop
    });
  }
  getCoupon(goodsId, reachPurchaseLimit) {
    if (reachPurchaseLimit === 1) {
      return;
    }
    Toast.loading("Loading...", 10);
    postReceiveCoupon(goodsId).then(res => {
      console.log(res);
      Toast.hide();
      message.success("领取成功");
    });
  }
  goBuyGoods(goodsId) {
    window.wx.miniProgram.navigateTo({
      url: "/o2o/pages/goods/detail/detail?goodsId=" + goodsId
    });
  }
  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = str.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
  }
  getScrollTop() {
    var scroll_top = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scroll_top = document.documentElement.scrollTop;
    } else if (document.body) {
      scroll_top = document.body.scrollTop;
    }
    return scroll_top;
  }
}
