import { useRef, useEffect } from 'react';

export default function useFetchTrendingVideos(youtubeLibraryLoaded, callback) {
    const callbackRef = useRef();
    callbackRef.current = callback;
    useEffect(() => {
        callbackRef.current(youtubeLibraryLoaded);
    }, [callbackRef, youtubeLibraryLoaded]);
}
