import type from './types';

export const updateTicker = (payload) => ({
  type: type.UPDATE_TICKER,
  payload,
});

export const updateBook = (payload) => ({
  type: type.UPDATE_BOOK,
  payload,
});
