import loadable from '@loadable/component'

const Activity = loadable(() => import('./activity/activity.js'))
const ActivityModal = loadable(() => import('./activity-modal/activity-modal.js'))
const ActivityModalFour = loadable(() => import('./activity-modal-four/activity-modal-four.js'))
const DidiAd = loadable(() => import('./didi-ad/didi-ad.js'))
const Koi = loadable(() => import('./koi/koi.js'))
const KoiLottery = loadable(() => import('./koi/koi-lottery/koi-lottery.js'))
const ActivityCoupon = loadable(() => import('./activity-coupon'))
const ActivityCouponDouble = loadable(() => import('./activity-coupon-double'))
const ActivityCountDown = loadable(() => import('./activity-count-down/count-down'))
const ActivityHotel = loadable(() => import('./activity-hotel'))
const ActivityMarket = loadable(() => import('./activity-market'))
const ActivityDraw = loadable(() => import('./activity-draw'))
const ActivityLimitPurchase = loadable(() => import('./activity-limit-purchase'))
const ActivityPeaceBuy = loadable(() => import('./activity-peace-buy'))
const Intruduction = loadable(() => import('./introduction'))
const LotAj = loadable(() => import('./lot-aj/lot-aj'))
const DoubleTwelve = loadable(() => import('./double-twelve'))
const ActivityModalThreeSecond = loadable(() => import('./activity-modal-three-second'))
const MaskSubscribe = loadable(() => import('./maskSubscribe/mask-subscribe'))
const QuerySubscribe = loadable(() => import('./maskSubscribe/query-subscribe'))

const routes = [
  {
    path: '/mask-subscribe', // 口罩预约
    component: MaskSubscribe
  },
  {
    path: '/query-subscribe/:id?', // 预约查询
    component: QuerySubscribe
  },
  {
    path: '/intruduction/:id', // 一张说明图
    component: Intruduction
  },
  {
    path: '/dd-ad/:activityId', // 滴滴首屏模块
    component: DidiAd
  },
  {
    path: '/activity-draw',
    component: ActivityDraw
  },
  {
    path: '/activity-modal-four/:activityId', // 自定义活动模块4
    component: ActivityModalFour
  },
  {
    path: '/activity-market/:activityId',
    component: ActivityMarket
  },
  {
    path: '/activity-hotel/:activityId/:limit?',
    component: ActivityHotel
  },
  {
    path: '/activity-limit-purchase/:activityId',
    component: ActivityLimitPurchase
  },
  {
    path: '/activity-peace-buy/:activityId',
    component: ActivityPeaceBuy
  },
  {
    path: '/activity-count-down',
    component: ActivityCountDown
  },
  {
    path: '/activity-coupon/:activityId/:limit?',
    component: ActivityCoupon
  },
  {
    path: '/activity-coupon-double/:activityId/:limit?',
    component: ActivityCouponDouble
  },
  {
    path: '/activity-modal-double-twelve/:activityId',
    component: DoubleTwelve
  },
  {
    path: '/activity-modal-three-second/:activityId',
    component: ActivityModalThreeSecond
  },
  {
    path: '/activity-modal', // 自定义活动模块
    component: ActivityModal
  },
  {
    path: '/koi',
    component: Koi
  },
  {
    path: '/koi-lottery',
    component: KoiLottery
  },
  {
    path: '/activity/:activityId',
    component: Activity
  },
  {
    path: '/lot-aj',
    component: LotAj
  }
]

export default routes
