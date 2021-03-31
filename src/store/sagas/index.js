import {all, call, put, fork} from 'redux-saga/effects';
import { watchVideoCategories } from './video';
import { watchMostPopularVideos } from './video';

export default function* () {
    yield all([
        fork(watchMostPopularVideos),
        fork(watchVideoCategories),
    ]);
}

export function* fecthEntity(request, entity, ...args) {
    try {
        const response = yield call(request);
        console.log(response.result, entity);
        yield put(entity.success(response.result, ...args));
    } catch(error) {
        yield put(entity.failure(error, ...args));
    }
}