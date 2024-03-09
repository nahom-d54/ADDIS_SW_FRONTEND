import { configureStore } from "@reduxjs/toolkit"
import rootSaga from "./sagas"
import music from './slices/music'
import musics from './slices/musics'
import createSagaMiddleware from '@redux-saga/core'

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        music,
        musics
    },
    // disablig  default thunk middleware to work with saga
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware),
    devTools: true,
})

sagaMiddleware.run(rootSaga);

export default store;