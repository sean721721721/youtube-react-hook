import {useDispatch} from 'react-redux';
import {youtubeLibraryLoaded} from './store/actions/api';
import { useEffect } from 'react';


export default function useLoadYoutubeApi (API_KEY) {
    const dispatch = useDispatch();
    useEffect(() => {
        loadYoutubeApi();

        function loadYoutubeApi() {
            const script = document.createElement("script");
            script.src = "https://apis.google.com/js/client.js";
        
            script.onload = () => {
                window.gapi.load('client', () => {
                    window.gapi.client.setApiKey(API_KEY);
                    window.gapi.client.load('youtube', 'v3', () => {
                        dispatch(youtubeLibraryLoaded());
                    });
                });
            };
        
            document.body.appendChild(script);
        }
    }, [API_KEY, dispatch])
}