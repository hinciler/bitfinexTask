import type from './types';

export const updateTicker = (payload) => ({
  type: type.UPDATE_TICKER,
  payload,
});

export const getOrderBook = (payload) => ({
  type: type.GET_BOOK,
  payload,
});
