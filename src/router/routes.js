import loadable from '@loadable/component'

const Activity = loadable(() => import('./activity/activity.js'))
const ActivityModal = loadable(() => import('./ActivityModal/ActivityModal.js'))
const ActivityCoupon = loadable(() => import('./activity-coupon'))

const routes = [
	{
		path: '/activity-coupon',
		component: ActivityCoupon
	},
	{
		path: '/activity-modal',
		component: ActivityModal
	}, {
		path: '/',
		component: Activity
	}
]

export default routes
