'use client'

import React, { createRef, useEffect, useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { fetchAllVideos } from '../service/videoService';
import { Video } from '../types/video';
import ReactPlayer from 'react-player';
import { useFilter } from '../contexts/context';

const VerticalSlider: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [page, setPage] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const hasFetched = useRef(false); 
    const videosRef = useRef<Video[]>([]);
    const firstLoad = useRef(true);
    const [preloadedIndexes, setPreloadedIndexes] = useState<Set<number>>(new Set());

    const [playing, setPlaying] = useState(false);
    const playerRefs = useRef(videos.map(() => createRef<ReactPlayer>()));
    const [played, setPlayed] = useState(0);

    const handlePlayPause = () => {
        // if(index === activeIndex){
        //     setPlaying(true)
        // }

        setPlaying(!playing)
    };
    const handleProgress = (index: number) => (state: { played: number }) => {
        if (index === activeIndex) {
            setPlayed(state.played);
        }
        

        
    };

    const { filter } = useFilter();

    useEffect(() => {
        const loadVideos = async () => {
            setLoading(true);
            const newVideos = await fetchAllVideos(page, 1, filter);
            const updatedVideos = [...videosRef.current, ...newVideos];
            setVideos(updatedVideos);
            videosRef.current = updatedVideos;
            setLoading(false);
            hasFetched.current = true;
        };

        loadVideos();
    }, [page, filter]);

    useEffect(() => {
        if (videos.length > 0 && firstLoad.current) {
            handleMoved({ index: 0 });
            firstLoad.current = false;
        }
    }, [videos]);

    useEffect(() => {
        const preloadIndexes = new Set<number>([activeIndex, activeIndex - 1, activeIndex + 1]);
        setPreloadedIndexes(preloadIndexes);
    }, [activeIndex]);

    useEffect(() => {
        setPage(1);
        setVideos([]);
        videosRef.current = [];
        firstLoad.current = true;
    }, [filter]);

    const handleMoved = (splide: { index: number; }) => {
        setActiveIndex(splide.index);
        if (splide.index === videosRef.current.length - 1 && !loading) {
            setPage(prevPage => prevPage + 1);
        }

        setPlaying(true)
        setPlayed(0)


        if(splide.index == 0){
            setPlaying(false)
        }

    };

    useEffect(() => {
        // Обновляем массив рефов при изменении количества видео
        playerRefs.current = videos.map(() => createRef<ReactPlayer>());
    }, [videos.length]);

    const handleRangeStyle = (value: number) => {
        const percentage = (value * 100).toFixed(2);
        return `linear-gradient(90deg, white ${percentage}%, rgba(255, 255, 255, 0.34) ${percentage}%)`;
    };

    return (
        <div className="container mx-auto pt-8 rounded-lg relative flex items-center h-full justify-center w-2/4">
            <Splide
                options={{
                    type: 'slide',
                    direction: 'ttb',
                    height: '600px',
                    perPage: 1,
                    drag: true,
                    snap: true,
                    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                    speed: 600,
                    gap: '1rem',
                    pagination: false,
                    arrows: true,
                    classes: {
                        arrows: 'splide__arrows splide__arrows--ttb',
                        arrow: 'splide__arrow',
                        prev: 'splide__arrow--prev',
                        next: 'splide__arrow--next',
                    },
                }}
                onMoved={handleMoved}
            >
                {videos.map((video, index) => (
                    
                    video.link && (
                        <React.Fragment key={index}>
                            <SplideSlide>
                                <div className=" h-[600px] w-[337.5px] rounded-2xl overflow-hidden relative">
                                    <div className="relative z-10 w-full h-full  mx-auto">
                                        {preloadedIndexes.has(index) ? (
                                            <div className="player-wrapper">
                                                <div
                                                className=' relative'
                                                onClick={handlePlayPause} >
                                                    {playing ? null : <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#fff" data-e2e="browse-video-play" className="player-pause"><use xlinkHref="#Play_Fill-3364e33a"></use></svg>}
                                                    <ReactPlayer
                                                        key={video.link}
                                                        loop={true}
                                                        url={video.link}
                                                        playing={index === activeIndex && playing}
                                                        onProgress={handleProgress(index)}
                                                        controls={false}
                                                        width="auto"
                                                        height="100%"
                                                        volume={0.8}
                                                        className="react-player"
                                                        ref={playerRefs.current[index]}
                                                    />
                                                </div>
                                                <div className="controls">
                                                    <button onClick={handlePlayPause}>
                                                        {playing ? <svg width="20" data-e2e="" height="20" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M8 6C8 5.44771 8.44772 5 9 5H17C17.5523 5 18 5.44772 18 6V42C18 42.5523 17.5523 43 17 43H9C8.44772 43 8 42.5523 8 42V6Z"></path><path d="M30 6C30 5.44771 30.4477 5 31 5H39C39.5523 5 40 5.44772 40 6V42C40 42.5523 39.5523 43 39 43H31C30.4477 43 30 42.5523 30 42V6Z"></path></svg> : <svg width="20" data-e2e="" height="20" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"></path></svg>}
                                                    </button>

                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="1"
                                                        value={played}
                                                        step="any"
                                                        style={{ background: handleRangeStyle(played) }}
                                                        onChange={(e) => {
                                                            const newPlayed = parseFloat(e.target.value);
                                                            setPlayed(newPlayed);
                                                            // Обращаемся к текущему активному видео для выполнения перемотки
                                                            const currentPlayer = playerRefs.current[activeIndex]?.current;
                                                            if (currentPlayer) {
                                                                currentPlayer.seekTo(newPlayed);
                                                            }
                                                        }}
                                                    />

                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </SplideSlide>
                        </React.Fragment>
                    )
                ))}
            </Splide>
        </div>
    );
};

export default VerticalSlider;