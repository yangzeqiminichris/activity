import loadable from '@loadable/component'

const Activity = loadable(() => import('./activity/activity.js'))

const routes = [
    {
        path: '/activity',
        component: Activity
    }
    ]

export default routes
