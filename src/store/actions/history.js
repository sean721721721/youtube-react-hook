import {createAction} from './index';

export const WATCHED_VIDEO = 'WATCHED_VIDEO';
export const watchedVideo = (video) => createAction('WATCHED_VIDEO', {video});