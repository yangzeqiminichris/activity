import React from "react";

import { Tabs, Toast } from "antd-mobile";
import { message } from "antd";
import { animateScroll as scroll } from "react-scroll";
import { setToken } from "@/cache/token.js";
import { getCouponDetail, postReceiveCoupon } from "@/api/custom-modal";
import "./index.scss";
import FirstFloor from "./view/first-floor";
import OtherFloor from "./view/other-floor";
import CouponItemTop from "./component/coupon-item-t";
import { getActivityDetail } from "./api/api";

const LAYOUT_LISt = 2;

export default class ActivityModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityConfig: {},
      couponList: [],
      tabTopShow: true,
      currentPage: 0,
      tabs: [],
      floorCouponList: {}
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
    let activityId = this.getUrlToken("activityId", this.props.location.search);
    setToken(token).then(() => {
      // 获取活动详情
      getActivityDetail({ id: activityId }).then(res => {
        if (!res) {
          message.error("暂无该活动");
          setTimeout(() => {
            window.wx.miniProgram.navigateBack({
              delta: -1
            });
          }, 1500);
          return;
        }
        if (res.title) {
          document.title = res.title;
        }
        Toast.hide();
        // 获取券详情
        console.log(res);
        const { firstFloor = {}, floors = [] } = res;
        const otherFloor = floors.map(item => ({
          title: item.floorName
        }));
        const tabs = [{ title: firstFloor.floorName }, ...otherFloor];
        getCouponDetail(res.limitCoupons).then(coupon => {
          this.setState({
            couponList: coupon ? coupon.records : []
          });
        });
        floors.map((floor, index) => {
          getCouponDetail(floor.couponList).then(coupon => {
            const floorCouponList = { ...this.state.floorCouponList };
            floorCouponList[index] = coupon ? coupon.records : [];
            this.setState({ floorCouponList });
          });
        });
        this.setState(
          {
            activityConfig: res,
            tabs
          },
          () => {
            let activityModal = document.getElementsByClassName(
              "activity-modal"
            );
            let tabActive =
              document.getElementsByClassName(
                "am-tabs-default-bar-tab-active"
              ) || [];
            activityModal[0] &&
              (activityModal[0].style.background = res.colors.bgColor);
            [...tabActive].forEach(item => {
              item.style.background = res.colors.floorSelectedColor;
            });
          }
        );
      });
    });
  }

  render() {
    const { activityConfig, couponList, floorCouponList } = this.state;
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
              return <CouponItemTop key={"coupon" + index} dataSource={item} />;
            })}
          <div className="white-space"></div>
        </div>
        <div id="floor">
          {activityConfig && this.renderActivityFloor(activityConfig)}
          <div className={`tabs-content`}>
            <FirstFloor dataSource={activityConfig.firstFloor} />
            <OtherFloor
              dataSource={activityConfig.floors}
              floorCouponList={floorCouponList}
            />
          </div>
        </div>
      </div>
    );
  }
  renderActivityFloor(activityConfig = {}) {
    const { currentPage, tabTopShow, tabs } = this.state;
    const { colors = {} } = activityConfig;
    console.log(colors);
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
            tabBarBackgroundColor={colors.floorBgColor}
            tabBarActiveTextColor={colors.fontSelectedColor}
            tabBarInactiveTextColor={colors.floorFontColor}
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
              tabBarBackgroundColor={colors.floorBgColor}
              tabBarActiveTextColor={colors.fontSelectedColor}
              tabBarInactiveTextColor={colors.floorFontColor}
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

  // 点击tabs
  tabsClick(title, index) {
    // 设置选中tabs
    this.setState({ currentPage: index });

    // antd-mobile无选中背景颜色 配置选中背景色
    let tabsLength = this.state.tabs.length;
    const { activityConfig } = this.state;
    let tabs = document.getElementsByClassName("am-tabs-default-bar-tab");
    for (let i in tabs) {
      tabs[i].style &&
        (tabs[i].style.background = activityConfig.colors.floorBgColor);
    }

    // 页面中tabs 设置选中背景色
    tabs[index].style.background = activityConfig.colors.floorSelectedColor;
    // 顶部tabs 设置选中背景色
    tabs[index + tabsLength].style.background =
      activityConfig.colors.floorSelectedColor;

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
