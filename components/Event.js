import React from 'react';
import SubtitleListItem from './SubtitleListItem';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Event = event => {
  const navigation = useNavigation();

  const readyToStart =
    event.startListGenerated &&
    event.startTime.toDate() >
      moment()
        .startOf('day')
        .toDate();

  const start = event => {
    console.log('Event selected: ', event);
    if (readyToStart) {
      console.log('Going to Start page');
      navigation.navigate('Starter', {event});
    }
  };

  const title = `${event.name} - ${event.eventType}`;
  console.log('Start time: ', event.startTime.toDate());
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
      subtitle={event.startTime.toDate().toLocaleDateString()}
      onPress={start(event)}
    />
  );
};

export default Event;
