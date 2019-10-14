import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import routes from './routes'

function RouteWithSubRoutes (route) {
    return (
        <Route
            path={ route.path }
            render={ props => (
                // pass the sub-routes down to keep nesting
                <route.component { ...props } routes={ route.routes } />
            ) }
        />
    )
}

export default () => (
    <Router>
            <Switch>
                <Redirect from='/' to='/activity' exact />
                {
                    routes.map((route, i) => (
                        <Route key={ i } { ...route } />
                    ))
                }
            </Switch>
    </Router>
)
