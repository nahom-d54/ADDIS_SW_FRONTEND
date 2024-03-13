import { css } from '@emotion/react'
import { faBackward, faForward, faPauseCircle, faPlayCircle, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Flex } from 'rebass'
import AudioJS from '../fc/AudioJs'

export default function Player({ src, mimetype }) {
    const [playState, setPlayState] = useState(false)
  
    const [currentDuration, setCurrentDuration] = useState(0)
    const [totalDuration, setTotalDuration] = useState(0)
    const [volume, setVolume] = useState(0.5)

    const volRef = useRef(null)
    const progRef = useRef(null)
    const audioRef = useRef(null)
    const progress = useRef(null)
    const durationToString = (du) => {
        const min = isNaN(Math.floor(du/60)) ? 0: Math.floor(du/60)
        const sec = isNaN(Math.round(du - (60 * min))) ? 0: Math.round(du - (60 * min))
        return min.toString().padStart(2, '0') + ":"+sec.toString().padStart(2, '0')
    }


    const togglePlay = () => {
        setPlayState(!playState)
        console.log(musics[0].path)
    }
    const musics = useSelector(state => state.musics.data)

    const volControl = (e)=> {
        const width = volRef.current.clientWidth
        const clickX = e.nativeEvent.offsetX

        const vol = (clickX/width)
        setVolume(vol)

        volRef.current.firstChild.style.width = `${(clickX/width)*100}%`
    } 
    const progControl = (e)=> {
        const width = progRef.current.clientWidth
        const clickX = e.nativeEvent.offsetX

        const prog = (clickX/width)
        const duration = totalDuration
        
        audioRef.current.currentTime = (duration * prog)
        
        progRef.current.firstChild.style.width = `${prog*100}%`
    } 
    
   
    useEffect(() => {
        console.log("running")
        progress.current.style.width = `${(currentDuration / totalDuration) * 100}%`
    },[currentDuration, totalDuration])


  return (
    <Box css={css`position: absolute; bottom: 0;
     left: 50%;
     transform: translateX(-50%);
     border-radius: 30px;
    width: 70vw;
    
    display: grid; grid-template-columns: 2fr 1fr;background: #222;`}>
        
        <AudioJS src={src}
            type={mimetype} toggle={playState}
            audioRef={audioRef}
            volume={volume}
            setTotalDuration={setTotalDuration}
            setCurrentDuration={setCurrentDuration}
            /> 

        <Flex className='player-controller' css={css`
            flex-direction: column;
            
            `}>
            <Box className='controllers' css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                    button {
                        background: none;
                        cursor: pointer;
                    }
                    .play button:hover {
                        color: #4bc474;
                        
                    }
                    `}>
                <Box className='prev'>
                    <Button>
                        <FontAwesomeIcon icon={faBackward} size="lg"/>
                    </Button>
                </Box>
                <Box className='play' onClick={togglePlay}>
                    <Button>
                        <FontAwesomeIcon icon={playState ? faPauseCircle : faPlayCircle} size='2xl'/>
                    </Button>
                </Box>
                <Box className='next'>
                    <Button>
                        <FontAwesomeIcon icon={faForward} size="lg"/>
                    </Button>
                </Box>
            </Box>
            <Box className='progress-bar' css={css`
                display: flex;
                justify-content: center;
                margin-bottom: 1.1rem;
                margin-top: 0.5rem;
            `}>
                <p className="current" >{durationToString(currentDuration)}</p>
                <Box ref={progRef} onClick={progControl} className='progress' css={css`
                    width: 80%;
                    height: 5px;
                    background: gray;
                    cursor: pointer;
                    border-radius: 5px;
                `}>
                    <Box ref={progress} className='elapsed' css={css`background: #1aa74b; height: inherit; 
                    width: 0%;
                    border-radius: inherit;`}/>
                </Box>
                <p className="total" >{durationToString(totalDuration)}</p>
            </Box>
        </Flex>
        <Flex className='volume-controller'>
            <Box className='volume-bar' css={css`
            display: flex; 
            align-items: center;
            width: 100%;
            justify-content: center;
            `}>
                <FontAwesomeIcon icon={faVolumeUp}/>
                <Box ref={volRef} onClick={volControl} css={css`
                        width: 30%;
                        height: 5px;
                        background: gray;
                        cursor: pointer;
                        border-radius: 5px;
                        margin-left: 5px;
                    `}>
                        <Box  css={css`background: #1aa74b; height: inherit; 
                        width: 50%;
                        border-radius: inherit;`}/>
                    </Box> 
                </Box>
        </Flex>
    </Box>
  )
}
