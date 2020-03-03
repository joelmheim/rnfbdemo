import React from 'react';
import {StyleSheet, View} from 'react-native';
import BaseText from './BaseText';
import * as _ from 'lodash';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingTop: 0,
  },
  textView: {
  },
  text: {
    color: 'lightgreen',
    fontSize: 60,
    lineHeight: 80,
  },
  timeView: {
    marginRight: 5,
  },
  time: {
    color: 'lightgreen',
    fontSize: 100,
    lineHeight: 120,
  },
  remaining: {
    color: 'red',
    fontSize: 100,
    lineHeight: 120,
  },
});

export default function First(props) {
  const {startNumber, firstName, lastName} = props.item;
  const {timeToGo} = props;
  const name = `${firstName} ${lastName}`;
  const remainStyle = timeToGo > 5 ? styles.time : styles.remaining;
  return (
    <View style={styles.view}>
      <View style={styles.textView}>
        <BaseText style={styles.text}>
          {_.padStart(startNumber, 3, ' ')}{' '}
          {name && name.length > 20 ? firstName : name}
        </BaseText>
      </View>
      <View style={styles.timeView}>
        <BaseText style={remainStyle}>{timeToGo}</BaseText>
      </View>
    </View>
  );
}
