import { put, takeEvery } from "redux-saga/effects";
import { loginUserAPI, logoutUserAPI, registerUserAPI, restoreToken } from "../../apis";
import { loginUser, logoutUser, restoreSession } from "../slices/user";


const types = {
    LOGIN_USER: 'LOGIN_USER',
    RESTORE_SESSION: 'RESTORE_SESSION',
    REGISTER_USER: 'REGISTER_USER',
    LOGOUT_USER: 'LOGOUT_USER'

}

export function* loginUserSaga(action) {
    try {
        const loggedIn = yield loginUserAPI(action.payload)
        yield put(loginUser(loggedIn.data))
        
    }catch(e) {
        console.log("error", e);
    }
}
export function* registerUserSaga(action) {
    try {
        return yield registerUserAPI(action.payload)
        
    }catch(e) {
        console.log("error");
    }
}

export function* logoutUserSaga() {
    try {
        yield logoutUserAPI()
        yield put(logoutUser())
    }catch(e) {
        console.log("error");
    }
}

export function* restoreSessionSaga() {
   
    const state = yield restoreToken()
    if( state ){
        yield put(restoreSession(state))
    }
}

export function* watchUserAsync(){
    
    yield takeEvery(types.LOGIN_USER,loginUserSaga)
    yield takeEvery(types.REGISTER_USER,registerUserSaga)
    yield takeEvery(types.RESTORE_SESSION,restoreSessionSaga)
    yield takeEvery(types.LOGOUT_USER,logoutUserSaga)
    
}

export {types}