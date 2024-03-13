import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card } from 'rebass'
import { setMusicSlice } from '../redux/slices/music';
import { CREATE_MUSIC, UPDATE_MUSIC_BY_ID } from '../redux/sagas/types';
import { useState } from 'react';
import FileInput from './FileInput';


export default function Editor( {editorActive, setEditorActive, type } ) {
    const dispatch = useDispatch();
    const music = useSelector(state => state.music )
    const genres = useSelector(state => state.genres )
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (prop) => ( event ) => {
        dispatch(setMusicSlice({...music, [prop]: event.target.value}))
    }
   

    const handleSubmit = (e) => {
        e.preventDefault()
        
        music._id == null? dispatch({type: CREATE_MUSIC, payload: {...music, music_file: selectedFile }}): dispatch({type: UPDATE_MUSIC_BY_ID, payload: music})
        dispatch(setMusicSlice(
            {
                _id: null,
                title: "",
                artist: "",
                genre: "",
            }
        ))
 
        toggleEditor()
    }
    const toggleEditor = () => {
        setEditorActive(!editorActive)
        dispatch(setMusicSlice(
            {
                _id: null,
                title: "",
                artist: "",
                genre: "",
            }))
    }
    
    
  return (
    <Box css={css`
        position: absolute;
        width:100vw;
        height: 100vh;
        left: 0;
        top: 0;

    `}>
        
        
        
        <Box css={css`
        position: absolute;
        width: 100vw;
        height: 100vh;
        z-index: 1;
        background: #000;
        opacity: 0.7;`}
        onClick={toggleEditor}
        />
        
            <Card css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            background-color: #191918;
            padding: 1.5rem;
            border-radius: 10px;
            min-width: 300px;
            `}>
                <form action="">
                    <Box className='form-group'>
                        <label htmlFor="title">Title</label>
                        <input type="text" id='title' onChange={handleChange('title')} value={music.title}/>

                    </Box>
                    <Box className='form-group'>
                        <label htmlFor="artist">Artist</label>
                        <input type="text" id='artist' onChange={handleChange('artist')} value={music.artist}/>
                    </Box>
                    <Box className='form-group'>
                        <label htmlFor="genre">Genre</label>
                        {/* make genre select option */}
                        <select style={{padding: "0.5rem"}} id="genre" onChange={handleChange('genre')} >
                            {genres.map(g => (
                                <option selected={music.genre._id == g._id} key={g._id} value={g._id}>{g.name}</option>
                            ))}                
                        </select>

                    </Box>
                    {/*
                    <Box className='form-group'>
                        <label htmlFor="duration">Duration</label>
                        <input type="text" id='duration' onChange={handleChange('duration')} value={music.duration}/>
                    </Box>
                    */}
                    {type === 'add' &&
                    <Box className='form-group'>
                        <label htmlFor="file">Music</label>
                        <FileInput selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
                    </Box>
                    }
                    
                    <Button css={css`
                        background: var(--link-color);
                        cursor: pointer;
                        &:hover {
                            background: var(--link-color-light);
                        }
                    `} onClick={handleSubmit}>
                        Submit
                    </Button>
                </form>
            </Card>
    </Box>

  )
}
