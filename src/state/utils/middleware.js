import {all} from 'redux-saga/effects';
import watch_getBook from '@orderBook/operations';

export default function* Sagas() {
  yield all([watch_getBook]);
}
