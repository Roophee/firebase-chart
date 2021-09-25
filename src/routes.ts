import React, { lazy } from 'react'
import { CHAT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from './utils/consts'
import EntryPopup from './components/EntryWindow'
// import Chat from './components/Chat'

interface IRouteItem {
    path: string
    Component: React.FC
}

const chat = lazy(() => import('./components/Chat'))

export const publicRoutes: IRouteItem[] = [
    {
        path: LOGIN_ROUTE,
        Component: EntryPopup,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: EntryPopup,
    },
]

export const privateRoutes: IRouteItem[] = [
    {
        path: CHAT_ROUTE,
        Component: chat,
    },
]
