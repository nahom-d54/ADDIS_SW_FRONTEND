import { all } from "redux-saga/effects";
import { watchMusicAsync } from "./musicSaga";


export default function* rootSaga(){
    yield all([
        watchMusicAsync()
    ])
}