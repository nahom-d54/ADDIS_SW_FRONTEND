import { startMusicsSlice,addMusicSlice, editMusicSlice, deleteMusicSlice, error, isLoading } from "../slices/musics";
import { getMusicsAPI, getMusicByIdAPI,createMusicAPI, updateMusicByIdAPI, deleteMusicByIdAPI, getGenresAPI } from "../../apis"
import { put, takeEvery } from 'redux-saga/effects'
import { setMusicSlice } from "../slices/music";
import { GET_MUSIC_BY_ID, CREATE_MUSIC, UPDATE_MUSIC_BY_ID, DELETE_MUSIC_BY_ID, SET_GENRES } from "./types";
import { setGenresSlice } from "../slices/genres";

// todo add try catch
// error handling
export function* getMusicsSaga( action ) {
    try {
        const musics = yield getMusicsAPI(action.payload.page)
        yield put(startMusicsSlice(musics.data))
    }catch(e) {
        yield put(error(e.message))
    }
}
export function* getMusicByIdSaga( action ) {
    const music = yield getMusicByIdAPI(action.payload.id)
    yield put(setMusicSlice(music.data))
}
export function* createMusicSaga(action){
    
    const createMusic = yield createMusicAPI(action.payload)
    yield put(addMusicSlice(createMusic.data))
}
export function* updateMusicSaga(action){
    
    const updateMusic = yield updateMusicByIdAPI(action.payload)
    yield put(editMusicSlice(updateMusic.data))
}
export function* deleteMusicSaga(action){
    const deleteMusic = yield deleteMusicByIdAPI(action.payload)
    yield put(deleteMusicSlice(deleteMusic.data))
}

export function* setGenresSaga() {
    const getGenres = yield getGenresAPI()
    yield put(setGenresSlice(getGenres.data))
}



export function* watchMusicAsync(){
    
    yield takeEvery(isLoading,getMusicsSaga)
    yield takeEvery(GET_MUSIC_BY_ID,getMusicByIdSaga)
    yield takeEvery(CREATE_MUSIC,createMusicSaga)
    yield takeEvery(UPDATE_MUSIC_BY_ID,updateMusicSaga)
    yield takeEvery(DELETE_MUSIC_BY_ID,deleteMusicSaga)
    yield takeEvery(SET_GENRES,setGenresSaga)
    
}

