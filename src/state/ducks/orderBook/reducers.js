import type from './types';

const INITIAL_STATE = {
  loader: false,
  error: '',
  data: [],
};

const ticker = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.UPDATE_TICKER:
      return {
        ...state,
        loader: true,
      };
    case type.UPDATE_TICKER_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      };
    case type.UPDATE_TICKER_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default ticker;
