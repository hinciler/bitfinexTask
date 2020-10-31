import axios from './fetch';
export default {
  getOrderBook() {
    return axios.post('book/tBTCUSD/P0');
  },
};
