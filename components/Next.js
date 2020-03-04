import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import BaseText from './BaseText';
import * as _ from 'lodash';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  col: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 0,
  },
  text: {
    fontSize: 40,
  },
  name: {
    textAlign: 'left',
  },
});

export default function Next(props) {
  //const [participants, setParticipants] = useState([]);
  //setParticipants(props.participants);

  return props.participants.map(participant => {
    const fullName = `${participant.firstName} ${participant.lastName}`;
    return (
      <View style={styles.row} key={participant.startNumber}>
        <View style={styles.col}>
          <BaseText style={styles.text}>{`${_.padStart(
            participant.startNumber,
            3,
            ' ',
          )} ${
            fullName.length > 30 ? participant.firstName : fullName
          }`}</BaseText>
        </View>
        <View style={styles.col}>
          <BaseText style={styles.text}>
            {participant.startTime}
          </BaseText>
        </View>
      </View>
    );
  });
}
