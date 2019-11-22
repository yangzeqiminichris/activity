import loadable from '@loadable/component'

const Activity = loadable(() => import('./activity/activity.js'))
const ActivityModal = loadable(() => import('./ActivityModal/ActivityModal.js'))
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
const ActivityPeaceBuy = loadable(() => import('./activity-peace-buy'))

const routes = [
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
    path: '/activity-peace-buy/:activityId',
    component: ActivityPeaceBuy
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
    path: '/activity-modal',
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
  }
]

export default routes
