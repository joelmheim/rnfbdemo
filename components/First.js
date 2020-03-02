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
  const remainStyle = props.timeToGo > 5 ? styles.time : styles.remaining;
  return (
    <View style={styles.view}>
      <View style={styles.textView}>
        <BaseText style={styles.text}>
          {_.padStart(props.startNumber, 3, ' ')}{' '}
          {props.name && props.name.length > 20 ? props.firstName : props.name}
        </BaseText>
      </View>
      <View style={styles.timeView}>
        <BaseText style={remainStyle}>{props.timeToGo}</BaseText>
      </View>
    </View>
  );
}
