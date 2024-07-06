'use client'

import React, { useEffect, useState } from 'react';
import { fetchAllVideos } from '../service/videoService';
import ReactPlayer from 'react-player';
import { Video } from '../types/video';
import Link from 'next/link';

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      const videos = await fetchAllVideos();
      setVideos(videos);
    };

    loadVideos();
  }, []);

  return (
<div className="container mx-auto px-4">
  <ul className="space-y-8">
    {videos.map(video => (
      video.link && (
        <li key={video._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-5">
            <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
            <div className="aspect-w-16 aspect-h-9">
              <ReactPlayer url={video.link} controls={true} playing={false} width="auto" height="500px" />
            </div>
            <Link href={video.link}>Download video</Link>
          </div>
        </li>
      )
    ))}
  </ul>
</div>
  );
};

export default VideoList;