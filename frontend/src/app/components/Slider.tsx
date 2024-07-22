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
    const playerRef = useRef<ReactPlayer | null>(null);
    const playerRefs = useRef(videos.map(() => createRef<ReactPlayer>()));
    const [volume, setVolume] = useState(0.8);
    const [played, setPlayed] = useState(0);

    const handlePlayPause = () => {
        // if(index === activeIndex){
        //     setPlaying(true)
        // }

        setPlaying(!playing)
    };
    const handleVolumeChange = (e: { target: { value: string; }; }) => setVolume(parseFloat(e.target.value));
    const handleProgress = (state: { played: React.SetStateAction<number>; }) => {
        setPlayed(state.played)
        console.log(state.played);
        
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

        if(splide.index == 0){
            setPlaying(false)
        }

        
    };

    useEffect(() => {
        // Обновляем массив рефов при изменении количества видео
        playerRefs.current = videos.map(() => createRef<ReactPlayer>());
    }, [videos.length]);

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
                                                <ReactPlayer
                                                    loop={true}
                                                    url={video.link}
                                                    // playing={index === activeIndex}
                                                    playing={index === activeIndex && playing}
                                                    volume={volume}
                                                    onProgress={handleProgress}
                                                    controls={false}
                                                    width="auto"
                                                    height="100%"
                                                    className="react-player"
                                                    ref={playerRefs.current[index]}
                                                />
                                                <div className="controls">
                                                    <button onClick={handlePlayPause}>
                                                        {playing ? <svg width="20" data-e2e="" height="20" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M8 6C8 5.44771 8.44772 5 9 5H17C17.5523 5 18 5.44772 18 6V42C18 42.5523 17.5523 43 17 43H9C8.44772 43 8 42.5523 8 42V6Z"></path><path d="M30 6C30 5.44771 30.4477 5 31 5H39C39.5523 5 40 5.44772 40 6V42C40 42.5523 39.5523 43 39 43H31C30.4477 43 30 42.5523 30 42V6Z"></path></svg> : <svg width="20" data-e2e="" height="20" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"></path></svg>}
                                                    </button>
                                                    <input
                                                        type="range"
                                                        min={0}
                                                        max={1}
                                                        step="any"
                                                        value={volume}
                                                        onChange={handleVolumeChange}
                                                    />
                                                    {/* <svg width="24" data-e2e="" height="24" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.3359 8.37236C22.3296 7.04325 25 8.47242 25 10.8685V37.1315C25 39.5276 22.3296 40.9567 20.3359 39.6276L10.3944 33H6C4.34314 33 3 31.6568 3 30V18C3 16.3431 4.34315 15 6 15H10.3944L20.3359 8.37236ZM21 12.737L12.1094 18.6641C11.7809 18.8831 11.3948 19 11 19H7V29H11C11.3948 29 11.7809 29.1169 12.1094 29.3359L21 35.263V12.737ZM32.9998 24C32.9998 21.5583 32.0293 19.3445 30.4479 17.7211C30.0625 17.3255 29.9964 16.6989 30.3472 16.2724L31.6177 14.7277C31.9685 14.3011 32.6017 14.2371 33.0001 14.6195C35.4628 16.9832 36.9998 20.3128 36.9998 24C36.9998 27.6872 35.4628 31.0168 33.0001 33.3805C32.6017 33.7629 31.9685 33.6989 31.6177 33.2724L30.3472 31.7277C29.9964 31.3011 30.0625 30.6745 30.4479 30.2789C32.0293 28.6556 32.9998 26.4418 32.9998 24ZM37.0144 11.05C36.6563 11.4705 36.7094 12.0995 37.1069 12.4829C40.1263 15.3951 42.0002 19.4778 42.0002 23.9999C42.0002 28.522 40.1263 32.6047 37.1069 35.5169C36.7094 35.9003 36.6563 36.5293 37.0144 36.9498L38.3109 38.4727C38.6689 38.8932 39.302 38.9456 39.7041 38.5671C43.5774 34.9219 46.0002 29.7429 46.0002 23.9999C46.0002 18.2569 43.5774 13.078 39.7041 9.43271C39.302 9.05421 38.6689 9.10664 38.3109 9.52716L37.0144 11.05Z"></path></svg>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="1"
                                                        value={played}
                                                        step="any"
                                                        onChange={(e) => {
                                                            const newPlayed = parseFloat(e.target.value);
                                                            setPlayed(newPlayed);
                                                            // Обращаемся к текущему активному видео для выполнения перемотки
                                                            const currentPlayer = playerRefs.current[activeIndex]?.current;
                                                            if (currentPlayer) {
                                                                currentPlayer.seekTo(newPlayed);
                                                            }
                                                        }}
                                                    /> */}
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