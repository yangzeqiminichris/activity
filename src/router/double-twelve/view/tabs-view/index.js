import React, { useState, useEffect } from "react";
import { Tabs } from "antd-mobile";
import { animateScroll as scroll } from "react-scroll";

import "./index.scss";

export default function TabsViews(props) {
  // 数据
  const { dataSource = {} } = props;
  const { colorInfo = {}, activityGroup = [] } = dataSource;
  const otherFloor = activityGroup.map(item => ({
    title: item.name
  }));
  let tabs = [...otherFloor];
  // userState
  const [tabTopShow, setTabTopShow] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // userEffect 监听滚动事件，并且清除组件时移除监听事件
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return function clean() {
      window.removeEventListener("scroll", handleScroll, true);
    };
  });
  // 点击tabs
  const tabsClick = (title, index) => {
    // 设置选中tabs
    setCurrentPage(index);

    // antd-mobile无选中背景颜色 配置选中背景色
    let tabsLength = tabs.length;
    let tabDoms = document.getElementsByClassName("am-tabs-default-bar-tab");
    for (let i in tabDoms) {
      tabDoms[i].style && (tabDoms[i].style.background = colorInfo.groupBgColor);
    }

    // 页面中tabs 设置选中背景色
    tabDoms[index].style.background = colorInfo.groupSelectedColor;
    // 顶部tabs 设置选中背景色
    tabDoms[index +tabsLength].style.background = colorInfo.groupSelectedColor;

    // 滚动到 锚点
    let tabHeight = document.getElementsByClassName("am-tabs-top")[0]
      .offsetHeight;
    scroll.scrollTo(
      document.getElementsByClassName("click-autor")[index].offsetTop -
      tabHeight
    );
  };

  const handleScroll = () => {
    let floorTop = document.getElementById("floor").offsetTop;
    let scrollTop = getScrollTop();
    setTabTopShow(floorTop > scrollTop);
  };

  const getScrollTop = () => {
    var scroll_top = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scroll_top = document.documentElement.scrollTop;
    } else if (document.body) {
      scroll_top = document.body.scrollTop;
    }
    return scroll_top;
  };

  return (
    <div>
      {tabs.length<=1?null:(
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
                marginLeft: tabs.length >= 4 ? "12.5%" : 100 / 2 / tabs.length + "%",
                transform: "translateX(-9px)",
                height: "2px",
                borderRadius: "2px"
              }}
              tabBarBackgroundColor={ colorInfo && colorInfo.groupBgColor }
              tabBarActiveTextColor={ colorInfo && colorInfo.fontSelectedColor }
              tabBarInactiveTextColor={ colorInfo && colorInfo.groupFontColor }
              tabBarTextStyle={{
                fontSize: "0.32rem",
                fontWeight: "600"
              }}
              onTabClick={tabsClick}
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
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
                    tabs.length >= 4 ? "12.5%" : 100 / 2 / tabs.length + "%",
                  transform: "translateX(-9px)",
                  height: "2px",
                  borderRadius: "2px"
                }}
                tabBarBackgroundColor={ colorInfo && colorInfo.groupBgColor }
                tabBarActiveTextColor={ colorInfo && colorInfo.fontSelectedColor }
                tabBarInactiveTextColor={ colorInfo && colorInfo.groupFontColor }
                tabBarTextStyle={{
                  fontSize: "0.32rem",
                  fontWeight: "600"
                }}
                onTabClick={tabsClick}
                renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
              ></Tabs>
            </div>
          }

        </div>
      )}
    </div>
  );
}
