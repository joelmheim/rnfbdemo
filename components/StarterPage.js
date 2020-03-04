import React from 'react';
import {useState, useEffect} from 'react';
import moment from 'moment/min/moment-with-locales';
import {StyleSheet, View} from 'react-native';
import Time from './Time';
import First from './First';
import Next from './Next';
import * as _ from 'lodash';
// import mockdata from '../mockdata';
import useInterval  from '../hooks/useInterval';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    padding: 10,
  },
  clock: {},
  text: {
    color: 'white',
  },
});

const StarterPage = ({route, navigation}) => {
  moment().locale('nb');
  let timerID = null;
  let second = moment().seconds();
  let newData = {};
  const {event} = route.params;
  const {participants, startTime, name, eventType} = event;
  const initial = participants && participants !== [] ? _.first(participants) : { startNumber: '0', startTime: '00:00:00', firstName: 'No more', lastName: 'participants.'};
  const rest = participants && participants !== [] ? _.tail(participants) : [];
  const title = `${moment(startTime.toDate()).format('L')}: ${name} - ${eventType}`;
  navigation.setOptions({title: title, });

  const secondsToGo = (time, startTime) => {
    if (time && startTime) {
      const now = moment(time, 'HH:mm:ss');
      const start = moment(startTime, 'HH:mm:ss');
      const diff = start.diff(now);
      return start.diff(now, 'seconds') + 1;
    } else {
      return -999;
    }
  };

  const [time, setTime] = useState('00:00:00');
  const [first, setFirst] = useState(initial);
  const [timeToGo, setTimeToGo] = useState(secondsToGo(moment().format('HH:mm:ss'), initial.startTime));
  const [next, setNext] = useState(rest);
  const [data, setData] = useState({
    time: moment().format('HH:mm:ss'),
    first: first,
    timeToGo: secondsToGo(moment().format('HH:mm:ss'), first.startTime),
    next: next,
  });

  console.log('Starter page: ', event);

  const startTimeString = time => {
    const hour = time.getHours();
    const min = time.getMinutes();
    return `${hour}:${min}`;
  };

  const run = () => {
    // console.log('Run...');
    const currentTime = moment();
    const formattedTime = currentTime.format('HH:mm:ss');
    //const first = _.first(participants);
    const currentSecond = currentTime.second();
    // console.log('Run first: ', first);
    // setFirst(first);
    // setNext(participants);
    if (currentSecond !== second) {
      console.log('Tick...', formattedTime);
      // console.log('Second: ', second);
      // console.log('Current second: ', currentSecond);
      tick(currentTime);
      second = currentSecond;
    }
  };

  const tick = time => {
    // console.log('Tick: ', time);
    const formattedTime = time.format('HH:mm:ss');
    // newData = data;
    let secToGo = secondsToGo(formattedTime, data.first.startTime);
    if (secToGo < 0) {
      const filtered = _.take(
        participants.filter(item =>
          moment(item.startTime, 'HH:mm:ss').isAfter(time),
        ),
        18,
      );
      if (!_.isEmpty(filtered)) {
        const first = _.first(filtered);
        secToGo = secondsToGo(time, first.startTime);
        // newData.first = first;
        setFirst(first);
        // newData.next = _.tail(filtered);
        setNext(_.tail(filtered));
      } else {
        setFirst({startNumber: '', startTime: '', firstName: 'No more', lastName: 'participants.'});
        setNext([]);
      }
    }
    // newData.timeToGo = secToGo;
    // newData.time = formattedTime;
    //console.log('New data: ', newData);
    setTime(formattedTime);
    setTimeToGo(secToGo);
    //setData(newData);
  };

  // const getMockData = () => {
  //   let timeIndex = moment();
  //   timeIndex.set('second', 0);
  //   timeIndex.set('millisecond', 0);
  //   const mapped = [];
  //   mockdata.startList.forEach(item => {
  //     item.startTime = timeIndex.toDate();
  //     timeIndex.add(15, 's');
  //     mapped.push(item);
  //   });
  //   return Promise.resolve(mapped);
  // };
  //
  // const fetchParticipants = () => {
  //   return getMockData()
  //   .then(results => {
  //     return results.map(item => {
  //       item.name = `${item.firstName} ${item.lastName}`;
  //       item.startTime = moment(item.startTime);
  //       return item;
  //     })
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   })
  // }

  console.log('All data: ', data);
  //setAll(props.participants);
  if (participants && participants !== []) {
    //setNext(participants);
    //setTimeToGo(secondsToGo(time, _.first(next).startTime));
    timerID = useInterval(run, 100);
  }

  return _.isEmpty(participants) ? (
    <View style={styles.container} />
    ) : (
    <View style={styles.container}>
      <View style={styles.clock}>
        <Time time={time} />
      </View>
      <View>
        <First item={first} timeToGo={timeToGo} />
      </View>
      <View>
        <Next participants={next} />
      </View>
    </View>
  );
};

export default StarterPage;
