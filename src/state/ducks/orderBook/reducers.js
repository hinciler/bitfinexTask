import type from './types';

const INITIAL_STATE = {
  loader: false,
  error: '',
  data: [],
};

const ticker = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.GET_BOOK:
      return {
        ...state,
        loader: true,
      };
    case type.GET_BOOK_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      };
    case type.GET_BOOK_FAILED:
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
