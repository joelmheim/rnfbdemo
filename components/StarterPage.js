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
  const [time, setTime] = useState('');
  //const [all, setAll] = useState([]);
  const [first, setFirst] = useState({
    startNumber: null,
    startTime: null,
    lastName: null,
    firstName: null,
  });
  const [timeToGo, setTimeToGo] = useState(null);
  const [next, setNext] = useState([]);

  // const [data, setData] = useState({
  //   time: moment().format('HH:mm:ss'),
  //   first: {
  //     startNumber: null,
  //     startTime: '18:30:00',
  //     lastName: null,
  //     firstName: null,
  //   },
  //   timeToGo: null,
  //   next: [],
  // });

  let second = moment().seconds();
  const {event} = route.params;
  const {participants} = event;

  console.log('Starter page: ', event);
  // componentDidMount() {
  //   this.fetchParticipants()
  //   .then(participants => {
  //     this.setState(
  //       {all: participants, first: participants[0]});
  //     this.tick(moment());
  //     this.timerID = setInterval(this.run, 100);
  //   });
  // }
  //
  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }

  const startTimeString = time => {
    const hour = time.getHours();
    const min = time.getMinutes();
    return `${hour}:${min}`;
  };

  const secondsToGo = (time, startTime) => {
    console.log('Time: ', time);
    console.log('StartTime: ', startTime);
    if (time && startTime) {
      const now = moment(time, 'HH:mm:ss');
      const start = moment(startTime, 'HH:mm:ss');
      const diff = start.diff(now);
      console.log('StartTime: ', start);
      console.log('Current time: ', now);
      console.log('Diff: ', start.diff(now, 'seconds'));
      console.log('Duration: ', moment.duration(start.diff(now)).get('second'));
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
    console.log('Run...');
    const time = moment();
    const formattedTime = time.format('HH:mm:ss');
    const first = _.first(participants);
    const currentSecond = time.second();
    console.log('Run first: ', first);
    // setData({
    //   time: formattedTime,
    //   first: first,
    //   timeToGo: secondsToGo(formattedTime, first.startTime),
    //   next: _.tail(participants),
    // });
    setTime(formattedTime);
    setFirst(first);
    setNext(_.tail(participants));
    if (currentSecond !== second) {
      tick(time);
      setTime(time.format('HH:mm:ss'));
      second = currentSecond;
    }
  };

  const tick = time => {
    console.log('Tick: ', time);
    //console.log('Current data: ', data);
    const formattedTime = time.format('HH:mm:ss');
    // let newData = {
    //   time: formattedTime,
    //   first: data.first,
    //   timeToGo: data.timeToGo,
    //   next: data.next,
    // };
    let secToGo = secondsToGo(formattedTime, first.startTime);
    if (secToGo < 0) {
      const filtered = _.take(
        participants.filter(item =>
          moment(item.startTime, 'HH:mm:ss').isAfter(time),
        ),
        18,
      );
      const first = filtered[0];
      secToGo = secondsToGo(time, first.startTime);
      //newData.first = first;
      setFirst(first);
      //newData.next = _.tail(filtered);
      setNext(_.tail(filtered));
    }
    //newData.timeToGo = secToGo;
    //console.log('New data: ', newData);
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

  //console.log('Participants: ', props.participants);
  //setAll(props.participants);
  //tick(moment());
  if (event != []) {
    const timerID = setInterval(run, 500);
  }

  return (
    <View style={styles.container}>
      <View style={styles.clock}>
        <Time time={time} />
      </View>
      <View>
        <First
          startNumber={first.startNumber}
          name={`${first.firstName} ${first.lastName}`}
          firstName={first.firstName}
          timeToGo={timeToGo}
        />
      </View>
      <View>
        <Next participants={next} />
      </View>
    </View>
  );
};

export default StarterPage;
