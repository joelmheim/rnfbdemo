import React from 'react';
import SubtitleListItem from './SubtitleListItem';
import moment from 'moment';
import {check, cancel} from 'react-native-vector-icons/MaterialIcons';

const Event = ({ id, name, eventType, description, startTime, startListGenerated, participants }) => {
  const start = (event) => {
      console.log('Event selected: ', event);
  };

  const title = `${name} - ${eventType}`;
  return (
    <SubtitleListItem
      image={startListGenerated ? check : cancel}
      title={title}
      subtitle={moment(startTime).format("DD.MM.YYYY HH:mm:ss")}
    />
  );
}

export default Event;
