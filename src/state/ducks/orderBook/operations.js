import {put, takeLatest} from 'redux-saga/effects';
import type from './types';
import api from '@duck_utils/api';

export function* updateBook() {
  try {
    const response = yield api.getOrderBook();
    if (response.hasOwnProperty('error')) {
      yield put({
        type: type.GET_BOOK_FAILED,
        error: response.error,
      });
    } else {
      yield put({
        type: type.GET_BOOK_SUCCESS,
        data: response,
      });
    }
  } catch (error) {
    yield put({
      type: type.GET_BOOK_FAILED,
      error,
    });
  }
}

export default function* watch_getBook() {
  yield takeLatest(type.GET_BOOK, updateBook);
}
