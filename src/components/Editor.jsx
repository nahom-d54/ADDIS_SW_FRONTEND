import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card } from 'rebass'
import { setMusicSlice } from '../redux/slices/music';
import { CREATE_MUSIC, UPDATE_MUSIC_BY_ID } from '../redux/sagas/types';
import { nanoid } from '@reduxjs/toolkit';

export default function Editor( {editorActive, setEditorActive } ) {
    const dispatch = useDispatch();
    const music = useSelector(state => state.music )
    const handleChange = (prop) => ( event ) => {
        dispatch(setMusicSlice({...music, [prop]: event.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        music.id === null ? dispatch({type: CREATE_MUSIC, payload: {...music, id: nanoid(8)}}): dispatch({type: UPDATE_MUSIC_BY_ID, payload: music})
        dispatch(setMusicSlice(
            {
                id: null,
                title: "",
                artist: "",
                genre: "",
                duration: ""
            }
        ))
 
        console.log("editor")
        setEditorActive(false)
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
        onClick={() => setEditorActive(!editorActive)}
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
                        <input type="text" id='genre' onChange={handleChange('genre')} value={music.genre}/>

                    </Box>
                    <Box className='form-group'>
                        <label htmlFor="duration">Duration</label>
                        <input type="text" id='duration' onChange={handleChange('duration')} value={music.duration}/>
                    </Box>
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
