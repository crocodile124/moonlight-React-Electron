import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { MovieContext } from '../../App';

import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  const movieContext = useContext(MovieContext);
  const isClose = movieContext.isClose;
  const setClose = movieContext.setClose;

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);
  const onClose = () => {
    setClose(1 - isClose);
    console.log(isClose);
    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  }

  const handlePlayPause = () => {
    if (!isActive) return;
    setClose(0);
    if (isPlaying) {
      dispatch(playPause(false));
      setClose(0);
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    <div className="flex w-full">
      <div className="relative sm:pl-12 pl-8 w-full flex items-center justify-between">
        <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Controls
            isPlaying={isPlaying}
            isActive={isActive}
            repeat={repeat}
            setRepeat={setRepeat}
            shuffle={shuffle}
            setShuffle={setShuffle}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
          />
          <Seekbar
            value={isClose ? 0 : appTime}
            min="0"
            max={duration}
            onInput={(event) => setSeekTime(event.target.value)}
            setSeekTime={setSeekTime}
            appTime={appTime}
          />
          <Player
            activeSong={activeSong}
            volume={volume}
            isPlaying={isClose ? false : isPlaying}
            seekTime={seekTime}
            repeat={repeat}
            currentIndex={currentIndex}
            onEnded={handleNextSong}
            onTimeUpdate={(event) => setAppTime(isClose ? 0 : event.target.currentTime)}
            onLoadedData={(event) => setDuration(event.target.duration)}
          />
        </div>
        <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />

      </div>
      <div className="items-start justify-start pr-3 pt-2">
        <MdClose className="text-white font-bold text-2xl top-0" onClick={onClose} />
      </div>
    </div>
  );
};

export default MusicPlayer;
