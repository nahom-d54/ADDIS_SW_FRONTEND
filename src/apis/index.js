import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.headers.common['User-Agent']

// music apis
const getMusicsAPI = async ( page ) => axios.get(`/musics?_page=${page}&_per_page=10`);
const getMusicByIdAPI = async ( id ) => axios.get(`/musics/${id}`)

const createMusicAPI = async ( music ) => {
    const formData = new FormData();
    for (let key in music) {
        formData.append(key, music[key]);
    }
    return axios.post('/musics', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    })
}

const updateMusicByIdAPI = async ( music ) => axios.patch(`/musics/${music._id}`, music, {withCredentials: true})
const deleteMusicByIdAPI = async ( id ) => axios.delete(`/musics/${ id }`, {withCredentials: true})

// user apis

async function restoreToken() {
    const localUser = localStorage.getItem('localUser')
    return localUser
}

const loginUserAPI = async ( {username, password} ) => {
    const response = await axios.post(`/user/login`, { username, password }, {withCredentials: true})
    //console.log(response.headers );
    //const cookies = response.headers['set-cookie'];
    //localStorage.setItem('token', cookies);
    //axios.defaults.headers.common['cookie'] = cookies
    return response
};

const getGenresAPI = async ( ) => axios.get(`/genres`)
const registerUserAPI = async ( {username, password, email, firstName, lastName} ) => axios.post(`/user/signup`, { username, password, email, firstName, lastName });
const logoutUserAPI = async ( ) => axios.post(`/user/logout`,{}, {withCredentials: true});

export { getGenresAPI,restoreToken,getMusicsAPI, getMusicByIdAPI, createMusicAPI, updateMusicByIdAPI, deleteMusicByIdAPI, loginUserAPI, logoutUserAPI, registerUserAPI };