import React, { useState, useEffect } from 'react';
import {FlatList, Text} from 'react-native';
import {Appbar} from 'react-native-paper';
import Event from './Event';
import firestore from '@react-native-firebase/firestore';

const EventPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [events, setEvents] = useState([]);
  const ref = firestore().collection('events');

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { name, eventType, description, startTime, startListGenerated, startListPublished, participants  } = doc.data();
        list.push({
          id: doc.id,
          name,
          eventType,
          description,
          startTime,
          startListGenerated,
          startListPublished,
          participants,
        });
      });

      setEvents(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      <Appbar>
        <Appbar.Content title={<Text>Available races</Text>} />
      </Appbar>
      <FlatList
        style={{flex: 1}}
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Event {...item} />}
      />
    </>
  );
};

export default EventPage;
