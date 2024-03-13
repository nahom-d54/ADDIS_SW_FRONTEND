import { useEffect } from 'react';

import 'video.js/dist/video-js.css';


const AudioJs = ({ src, mimetype, toggle, audioRef, volume, setTotalDuration, setCurrentDuration }) => {
  
  
  useEffect(() => {
    if (!audioRef.current) {
      return; // Return early if audioRef is null
    }
    setTotalDuration(audioRef.current.duration)
    if (toggle) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    audioRef.current.volume = volume
    

    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      if (!audioElement) {
        return; // Return early if audioRef is null
      }
      setCurrentDuration(audioElement?.currentTime);
    };

    audioElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
    //setCurrentDuration(audioRef.current.currentTime);

  }, [toggle, volume, setTotalDuration, setCurrentDuration, audioRef]);



  
  return (
    <div className="audio-player" style={{display: 'none'}}>
      <div>
        <audio ref={audioRef}>
          <source src={src} type={mimetype}/>
        </audio>
      </div>
    </div>
  )

}

export default AudioJs;