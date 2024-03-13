import { all } from "redux-saga/effects";
import { watchMusicAsync } from "./musicSaga";
import { watchUserAsync } from "./userSaga";


export default function* rootSaga(){
    yield all([
        watchMusicAsync(),
        watchUserAsync()
    ])
}