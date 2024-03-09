import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Text } from "rebass";
import { DELETE_MUSIC_BY_ID } from '../redux/sagas/types';
import { setMusicSlice } from "../redux/slices/music";
import Editor from "./Editor";
import Pagination from "./Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faMusic, faUser } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "./Skeleton";
import { isLoading } from "../redux/slices/musics";


export default function Table() {
    const dispatch = useDispatch();
    const musicList = useSelector(state => state.musics)

    
  
    useEffect(()=> {
      dispatch({type: isLoading.type ,payload:{ page: 1 }})
      
    },[dispatch])

    const [editorActive, setEditorActive] = useState(false);

    const handleButton = (musicParam) => {
        dispatch(setMusicSlice(musicParam))
        setEditorActive(!editorActive)
    }
    const currentPage = (prev, next ) => prev ? prev + 1 : next ? next - 1 : 1;
  return (
    <>
    
    {editorActive && <Editor editorActive={editorActive} setEditorActive={setEditorActive}/>}
    <Flex css={css`max-width:960px;margin: 0 auto;flex-direction:column`}>
    
                
        <ul className="music-list">
        <li className="music-list--item" style={{ borderBottom: '1px solid #777', marginBottom: '1rem'}}>
                    <Text>#</Text>
                    <Text className="text">Title</Text>
                    <Text className="text artist"><FontAwesomeIcon icon={faUser}/> </Text>
                    <Text className="text genre"><FontAwesomeIcon icon={faMusic}/></Text>
                    <Text ><FontAwesomeIcon icon={faClockRotateLeft}/></Text>
                    <Flex css={css`gap: 5px;`}>
                        
                    </Flex>
                    
                </li>
            { musicList.loading ? <Skeleton/>:
            musicList.data.map((music,index) => (

                <li key={music.id} className="music-list--item">
                    <Text>{((currentPage(musicList.prev, musicList.next) - 1) * 10)+(index+1)}</Text>
                    <Text className="text">{music.title}</Text>
                    <Text className="text artist">{music.artist}</Text>
                    <Text className="text genre">{music.genre}</Text>
                    <Text >{music.duration}</Text>
                    <Flex css={css`gap: 5px;`}>
                        <Button css={css`padding: 5px 10px;background-color: var(--link-color);cursor: pointer;
                        
                        &:hover {
                            background-color: var(--link-color-light);
                        }`}
                        onClick={ () => handleButton(music) }
                        >Edit</Button>
                        <Button css={css`padding: 5px 10px; background-color: var(--link-danger);cursor: pointer;
                        &:hover {
                            background-color: var(--link-danger-light);
                        }`} onClick={()=>dispatch({type: DELETE_MUSIC_BY_ID, payload: music.id})}>Delete</Button>
                    </Flex>
                    
                </li>
            ))
                    }
        </ul>
        <Pagination/>
    </Flex>
    </>
  )
}
