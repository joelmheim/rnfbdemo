import React from 'react';
import SubtitleListItem from './SubtitleListItem';
import moment from 'moment/min/moment-with-locales';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Event = event => {
  moment.locale('nb');
  const navigation = useNavigation();
  const startTime = moment(event.startTime.toDate());

  const readyToStart =
    event.startListGenerated &&
    startTime.isAfter(moment().startOf('day'));

  const start = event => {
    console.log('Event selected: ', event);
    if (readyToStart) {
      console.log('Going to Start page');
      navigation.navigate('Starter', {event});
    }
  };

  const title = `${event.name} - ${event.eventType}`;
  console.log('Start time: ', startTime, startTime.locale());
  return (
    <SubtitleListItem
      image={
        readyToStart ? (
          <Icon name="list" size={30} color="#228B22" />
        ) : (
          <Icon name="clear" size={30} color="#900" />
        )
      }
      title={title}
      subtitle={moment(event.startTime.toDate()).format('LLL')}
      onPress={() => start(event)}
    />
  );
};

export default Event;
