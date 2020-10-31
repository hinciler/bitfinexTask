import {StyleSheet} from 'react-native';
import {colors} from 'config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tinyLogo: {
    width: 30,
    height: 30,
  },
  tickerContainer: {
    backgroundColor: colors.secondary_bg,
    padding: 10,
    flexDirection: 'row',
  },
  tickerInfo: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  tickerImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 10,
  },
  tickerText: {
    color: colors.primary_text_color,
  },
  tickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderBookContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.secondary_bg,
    marginTop: 5,
  },
  orderBookTitleContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderBookTitle: {
    color: colors.secondary_text_color,
  },
  bookBidContainer: {
    marginLeft: 20,
    flex: 2,
  },
  bookAskContainer: {
    marginStart: 20,
    flex: 2,
    marginEnd: 10,
  },
});
