import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3000"

const getMusicsAPI = async ( page ) => axios.get(`/musics?_page=${page}&_per_page=10`);
const getMusicByIdAPI = async ( id ) => axios.get(`/musics/${id}`)
const createMusicAPI = async ( music ) => axios.post('/musics', music)
const updateMusicByIdAPI = async ( music ) => axios.patch(`/musics/${music.id}`, music)
const deleteMusicByIdAPI = async ( id ) => axios.delete(`/musics/${ id }`)


export { getMusicsAPI, getMusicByIdAPI, createMusicAPI, updateMusicByIdAPI, deleteMusicByIdAPI };