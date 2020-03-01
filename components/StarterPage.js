import {useState, useEffect} from 'react';
import moment from "moment";
import {StyleSheet, View} from "react-native";
import Time from "./Time";
import First from "./First";
import Next from "./Next";
import * as _ from "lodash";
import mockdata from "../mockdata";
import React from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    padding: 10
  },
  clock: {
  },
  text: {
    color: "white"
  }
});

const StarterPage = (props) =>  {

  //const [time, setTime] = useState('');
  const [all, setAll] = useState([]);
  //const [first, setFirst] = useState({startNumber: null, startTime: null, lastName: null, firstName: null});
  //const [timeToGo, setTimeToGo] = useState(null);
  //const [next, setNext] = useState([]);

  const [data, setData] = useState({
    time: moment().format("HH:mm:ss"),
    first: {startNumber: null, startTime: '18:30:00', lastName: null, firstName: null},
    timeToGo: null,
    next: [],
  });

  let second = moment().seconds();

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

  const secondsToGo = (time, startTime) => {
    console.log('Time: ', time);
    console.log('StartTime: ', startTime);
    if (time && startTime) {
      const now = moment(time);
      const then = moment(startTime);
      console.log('StartTime: ', then);
      console.log('Current time: ', now);
      console.log('Diff: ', then.diff(now));
      console.log('Duration: ', moment.duration(then.diff(now)));
      return moment.duration(moment(startTime).diff(moment(time))).asSeconds();
    } else return -999;
    //return Math.round((Date.parse(startTime).getTime() - Date.parse(time).getTime()) / 1000);
  };

  const run = () => {
    console.log('Run...');
    const time = moment();
    const formattedTime = time.format("HH:mm:ss");
    const first = _.first(props.participants);
    const currentSecond = time.second();
    console.log('Run first: ', first);
    setData({
      time: formattedTime,
      first: first,
      timeToGo: secondsToGo(formattedTime, first.startTime),
      next: _.tail(props.participants),
    });
    if (currentSecond !== second) {
      tick(time);
      second = currentSecond;
    }
  };

  const tick = (time) => {
    console.log('Tick: ', time);
    console.log('Current data: ', data);
    const formattedTime = time.format("HH:mm:ss");
    let newData = {
      time: formattedTime,
      first: data.first,
      timeToGo: data.timeToGo,
      next: data.next,
    };
    let secToGo = secondsToGo(formattedTime, data.first.startTime);
    if (secToGo < 0) {
      const filtered = _.take(props.participants.filter(item => item.startTime.isAfter(time)), 18);
      const first = filtered[0];
      secToGo = secondsToGo(data.time, first.startTime);
      newData['first'] = first;
      newData['next'] = _.tail(filtered);
      //setFirst(first);
      //setNext(_.tail(filtered))
    }
    newData['timeToGo'] = secToGo;
    console.log('New data: ', newData);
    //setTimeToGo(secToGo);
    setData(newData);
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
  if (props.participants != []) {
    const timerID = setInterval(run, 100);
  }

  return (
    <View style={styles.container}>
      <View style={styles.clock}>
        <Time time={data.time}/>
      </View>
      <View>
        <First startNumber={data.first.startNumber} name={data.first.name} firstName={data.first.firstName} timeToGo={data.timeToGo}/>
      </View>
      <View>
        <Next participants={data.next}/>
      </View>
    </View>
  );
}

export default StarterPage;
