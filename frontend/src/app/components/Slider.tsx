'use client'

import React, { useEffect, useRef, useState } from 'react';
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

    const [playing, setPlaying] = useState(true);
    const playerRef = useRef<ReactPlayer | null>(null);
    const [volume, setVolume] = useState(0.8);
    const [played, setPlayed] = useState(0);

    const handlePlayPause = () => {
        // if(index === activeIndex){
        //     setPlaying(true)
        // }

        setPlaying(!playing)
    };
    const handleVolumeChange = (e: { target: { value: string; }; }) => setVolume(parseFloat(e.target.value));
    const handleProgress = (state: { played: React.SetStateAction<number>; }) => setPlayed(state.played);

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
                                                />
                                                <div className="controls">
                                                    <button onClick={handlePlayPause}>
                                                        {playing ? 'Pause' : 'Play'}
                                                    </button>
                                                    <input
                                                        type="range"
                                                        min={0}
                                                        max={1}
                                                        step="any"
                                                        value={volume}
                                                        onChange={handleVolumeChange}
                                                    />
                                                    <input
                                                        type="range"
                                                        min={0}
                                                        max={1}
                                                        value={played}
                                                        step="any"
                                                        onMouseDown={() => setPlaying(false)}
                                                        onChange={(e) => {
                                                            const newPlayed = parseFloat(e.target.value);
                                                            setPlayed(newPlayed);
                                                            if (playerRef.current) {
                                                                playerRef.current.seekTo(newPlayed);
                                                            }
                                                        }}
                                                        onMouseUp={() => setPlaying(true)}
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