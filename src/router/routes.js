import loadable from '@loadable/component'

const Activity = loadable(() => import('./activity/activity.js'))
const ActivityModal = loadable(() => import('./ActivityModal/ActivityModal.js'))
const Koi = loadable(() => import('./koi/koi.js'))
const KoiLottery = loadable(() => import('./koi/koi-lottery/koi-lottery.js'))
const ActivityCoupon = loadable(() => import('./activity-coupon'))
const ActivityCountDown = loadable(() => import('./activity-count-down/count-down'))

const routes = [
	{
		path:'/activity-count-down',
		component: ActivityCountDown
	},
	{
		path: '/activity-coupon/:activityId',
		component: ActivityCoupon
	},
	{
		path: '/activity-modal',
		component: ActivityModal
	}, {
    path: '/koi',
    component: Koi
  }, {
    path: '/koi-lottery',
    component: KoiLottery
  }, {
		path: '/activity',
		component: Activity
	}
]

export default routes
