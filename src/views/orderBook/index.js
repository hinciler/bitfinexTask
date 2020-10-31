import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Image, Text} from 'react-native';
import {styles} from './style';
import {SOCKET_ADDRESS} from 'config/constants';
import {useDispatch, useSelector} from 'react-redux';
import {updateBook} from '@orderBook/actions';

function OrderBook() {
  const [volume, setVolume] = useState('');
  const [bid, setBid] = useState('');
  const [dailyChange, setDailyChange] = useState('');
  const [dailyChangeRelative, setDailyChangeRelative] = useState('');
  const [changeColor, setChangeColor] = useState('white');
  const [high, setHigh] = useState('');
  const [low, setLow] = useState('');
  const bids = [];
  const asks = [];
  const {data} = useSelector((state) => state.orderBook);
  const dispatch = useDispatch();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  useEffect(() => {
    let wsBook = new WebSocket(SOCKET_ADDRESS);
    wsBook.onopen = function () {
      wsBook.send(
        JSON.stringify({
          event: 'subscribe',
          channel: 'book',
          symbol: 'tBTCUSD',
        }),
      );
    };

    wsBook.onmessage = function (msg) {
      let response = JSON.parse(msg.data);
      if (response[1] !== undefined || response.length > 0) {
        if (response[1][2] > 0) {
          bids.push(response[1]);
        } else {
          asks.push(response[1]);
        }
      }
    };
  });

  useEffect(() => {
    try {
      let ws = new WebSocket(SOCKET_ADDRESS);

      // Create function to send on open
      ws.onopen = function () {
        ws.send(
          JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            pair: 'tBTCUSD',
          }),
        );
      };

      // Tell function what to do when message is received and log messages
      ws.onmessage = function (msg) {
        // create a variable for response and parse the json data
        let response = JSON.parse(msg.data);
        // console.log(response);
        let hb = response[1];
        if (hb !== 'hb') {
          if (response[1] !== undefined || response.length > 0) {
            let responseVol = numberWithCommas(response[1][7].toFixed(1));
            let responseBid = numberWithCommas(response[1][0]);
            let responseDailyChange = response[1][4].toFixed(1);
            let responseDailyChangeRelative = (response[1][5] * 100).toFixed(1);
            let responseHigh = numberWithCommas(response[1][8]);
            let responseLow = numberWithCommas(response[1][9]);
            responseDailyChange > 0
              ? setChangeColor('green')
              : setChangeColor('red');
            setVolume(responseVol);
            setBid(responseBid);
            setDailyChange(responseDailyChange);
            setDailyChangeRelative(responseDailyChangeRelative);
            setHigh(responseHigh);
            setLow(responseLow);
          }
        }
      };
    } catch (error) {}
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tickerContainer}>
        <View style={styles.tickerImageContainer}>
          <Image
            style={styles.tinyLogo}
            source={require('../../assets/img/btc_icon.png')}
          />
        </View>
        <View style={styles.tickerInfo}>
          <View style={styles.tickerRow}>
            <Text style={styles.tickerText}>BTC/USD</Text>
            <Text style={styles.tickerText}>{bid}</Text>
          </View>
          <View style={styles.tickerRow}>
            <Text style={styles.tickerText}>VOL {volume} BTC</Text>
            <Text style={{color: changeColor}}>
              {dailyChange} ({dailyChangeRelative} %)
            </Text>
          </View>
          <View style={styles.tickerRow}>
            <Text style={styles.tickerText}>LOW {low}</Text>
            <Text style={styles.tickerText}>HIGH {high}</Text>
          </View>
        </View>
      </View>
      <View style={styles.orderBookContainer}>
        <View style={styles.bookBidContainer}>
          <View style={styles.orderBookTitleContainer}>
            <Text style={styles.orderBookTitle}>Total</Text>
            <Text style={styles.orderBookTitle}>Price</Text>
          </View>
        </View>
        <View style={styles.bookAskContainer}>
          <View style={styles.orderBookTitleContainer}>
            <Text style={styles.orderBookTitle}>Price</Text>
            <Text style={styles.orderBookTitle}>Total</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default OrderBook;
