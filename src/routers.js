import React from 'react';
import {Platform} from 'react-native';
import {Scene, Router, Overlay, Modal, Stack} from 'react-native-router-flux';
import OrderBook from 'views/orderBook';

const stateHandler = (prevState, newState, action) => {
  // console.log('onStateChange: ACTION:', action);
};

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';

const router = () => (
  <Router onStateChange={stateHandler} uriPrefix={prefix}>
    <Overlay key="overlay" panHandlers={null}>
      <Modal key="modal" hideNavBar>
        <Scene component={OrderBook} key="orderBook" initial />
      </Modal>
    </Overlay>
  </Router>
);

export default router;
