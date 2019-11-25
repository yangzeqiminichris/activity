import loadable from '@loadable/component'

const Activity = loadable(() => import('./activity/activity.js'))
const ActivityModal = loadable(() => import('./activity-modal/activity-modal.js'))
const DidiAd = loadable(() => import('./didi-ad/didi-ad.js'))
const Koi = loadable(() => import('./koi/koi.js'))
const KoiLottery = loadable(() => import('./koi/koi-lottery/koi-lottery.js'))
const ActivityCoupon = loadable(() => import('./activity-coupon'))
const ActivityCountDown = loadable(() =>
  import('./activity-count-down/count-down')
)
const ActivityHotel = loadable(() => import('./activity-hotel'))
const ActivityMarket = loadable(() => import('./activity-market'))
const ActivityDraw = loadable(() => import('./activity-draw'))
const ActivityLimitPurchase = loadable(() => import('./activity-limit-purchase'))
const Intruduction = loadable(() => import('./introduction'))

const routes = [
  {
    path: '/intruduction', // 一张说明图
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
    path: '/activity-market/:activityId',
    component: ActivityMarket
  },
  {
    path: '/activity-hotel/:activityId',
    component: ActivityHotel
  },
  {
    path: '/activity-limit-purchase/:activityId',
    component: ActivityLimitPurchase
  },
  {
    path: '/activity-count-down',
    component: ActivityCountDown
  },
  {
    path: '/activity-coupon/:activityId',
    component: ActivityCoupon
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
    path: '/activity',
    component: Activity
  }
]

export default routes
