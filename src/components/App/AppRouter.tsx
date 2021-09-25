import React from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { privateRoutes, publicRoutes } from '../../routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from '../../utils/consts'
import store from '../../store/store'
import Header from './Header'
import Loader from '../Loader/Loader'

const AppRouter = observer(() => {
    if (store.getLoading) return <Loader />
    return (
        <BrowserRouter>
            <Header />
            {store.user ? (
                <Switch>
                    {privateRoutes.map(({ path, Component }) => (
                        <Route
                            key={path}
                            path={path}
                            component={Component}
                            exact
                        />
                    ))}
                    <Redirect to={CHAT_ROUTE} />
                </Switch>
            ) : (
                <Switch>
                    {publicRoutes.map(({ path, Component }) => (
                        <Route
                            key={path}
                            path={path}
                            component={Component}
                            exact
                        />
                    ))}
                    <Redirect to={LOGIN_ROUTE} />
                </Switch>
            )}
        </BrowserRouter>
    )
})

export default AppRouter
