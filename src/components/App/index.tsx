import React, { Suspense } from 'react'
import AppContainer from './AppContainer'
import AppRouter from './AppRouter'
import Loader from '../Loader/Loader'

const Index: React.FC = () => {
    return (
        <AppContainer>
            <Suspense fallback={<Loader />}>
                <AppRouter />
            </Suspense>
        </AppContainer>
    )
}

export default Index
