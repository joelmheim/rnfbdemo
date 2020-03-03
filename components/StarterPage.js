import {useState, useEffect} from 'react';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';
import Time from './Time';
import First from './First';
import Next from './Next';
import * as _ from 'lodash';
// import mockdata from '../mockdata';
import React from 'react';

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
  const [time, setTime] = useState('00:00:00');
  // const [first, setFirst] = useState({
  //   startNumber: '0',
  //   startTime: '00:00:00',
  //   lastName: '',
  //   firstName: '',
  // });
  const [timeToGo, setTimeToGo] = useState(999);
  const [next, setNext] = useState([
    {
      startNumber: '0',
      startTime: '00:00:00',
      lastName: '',
      firstName: '',
    },
  ]);

  let timerID = null;
  let second = moment().seconds();
  const {event} = route.params;
  const {participants} = event;

  console.log('Starter page: ', event);

  const startTimeString = time => {
    const hour = time.getHours();
    const min = time.getMinutes();
    return `${hour}:${min}`;
  };

  const secondsToGo = (time, startTime) => {
    // console.log('Time: ', time);
    // console.log('StartTime: ', startTime);
    if (time && startTime) {
      const now = moment(time, 'HH:mm:ss');
      const start = moment(startTime, 'HH:mm:ss');
      const diff = start.diff(now);
      // console.log('StartTime: ', start);
      // console.log('Current time: ', now);
      // console.log('Diff: ', start.diff(now, 'seconds'));
      // console.log('Duration: ', moment.duration(start.diff(now)).get('second'));
      return start.diff(now, 'seconds');
      //return Math.round(
      //  (Date.parse(startTime).getTime() - Date.parse(time).getTime()) / 1000,
      //);
    } else {
      return -999;
    }
    //return Math.round((Date.parse(startTime).getTime() - Date.parse(time).getTime()) / 1000);
  };

  const run = () => {
    // console.log('Run...');
    const currentTime = moment();
    // const formattedTime = currentTime.format('HH:mm:ss');
    // const first = _.first(participants);
    const currentSecond = currentTime.second();
    // console.log('Run first: ', first);
    // setFirst(first);
    setTime(currentTime.format('HH:mm:ss'));
    if (currentSecond !== second) {
      console.log('Tick...');
      // setNext(_.tail(participants));
      console.log('Second: ', second);
      console.log('Current second: ', currentSecond);
      tick(currentTime);
      second = currentSecond;
    }
  };

  const tick = time => {
    // console.log('Tick: ', time);
    const formattedTime = time.format('HH:mm:ss');
    //let secToGo = secondsToGo(formattedTime, first.startTime);
    // if (secToGo < 0) {
    //   const filtered = _.take(
    //     participants.filter(item =>
    //       moment(item.startTime, 'HH:mm:ss').isAfter(time),
    //     ),
    //     18,
    //   );
    //   const first = _.first(filtered);
    //   secToGo = secondsToGo(time, first.startTime);
    //   // newData.first = first;
    //   //  setFirst(first);
    //   //newData.next = _.tail(filtered);
    //   setNext(filtered);
    // }
    //newData.timeToGo = secToGo;
    //console.log('New data: ', newData);
    //setTimeToGo(secToGo);
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

  console.log('Participants: ', participants);
  //setAll(props.participants);
  if (participants && participants !== []) {
    //setNext(participants);
    //setTimeToGo(secondsToGo(time, _.first(next).startTime));
    timerID = setInterval(run, 100);
  }

  return (
    <View style={styles.container}>
      <View style={styles.clock}>
        <Time time={time} />
      </View>
      {/*<View>*/}
      {/*  <First item={_.first(next)} timeToGo={timeToGo} />*/}
      {/*</View>*/}
      {/*<View>*/}
      {/*  <Next participants={_.tail(next)} />*/}
      {/*</View>*/}
    </View>
  );
};

export default StarterPage;
