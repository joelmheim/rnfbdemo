/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import EventPage from './components/EventPage';
import firebase from '@react-native-firebase/app';
import admob from '@react-native-firebase/admob';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import perf from '@react-native-firebase/perf';
import storage from '@react-native-firebase/storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Event from './components/Event';
import StarterPage from './components/StarterPage';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const Stack = createStackNavigator();

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    //this.state = {
    //time: "",
    //all: [],
    //first: {startNumber: null, name: null, firstName: null},
    //timeToGo: null,
    //next: []
    //};
    //this.second = moment().seconds();
    //this.run = this.run.bind(this);
  }

  componentDidMount() {
    console.log('Starter app started. Fetching participants...');

    // firebase.initializeApp(
    //   Platform.OS === 'ios' ? iosConfig : androidConfig,
    //   'stime-start',
    // )
    // .then(app => console.log('initialized apps ->', firebase.apps));

    // this.fetchParticipants()
    //     .then(participants => {
    //         console.log('Participants fetched: ', participants);
    //         this.setState(
    //         {all: participants});
    //         //this.tick(moment());
    //         //this.timerID = setInterval(this.run, 100);
    //     });
  }

  // componentWillUnmount() {
  //     //clearInterval(this.timerID);
  // }

  // run() {
  //     const time = moment();
  //     const currentSecond = time.second();
  //     if (currentSecond !== this.second) {
  //         this.tick(time);
  //         this.second = currentSecond;
  //     }
  // }
  //
  // tick(time) {
  //     const newState = {
  //         time: time.format("HH:mm:ss"),
  //     };
  //     let timeToGo = App.timeToGo(time, this.state.first.startTime);
  //     if (timeToGo < 0) {
  //         const filtered = _.take(this.state.all.filter(item => item.startTime.isAfter(time)), 18);
  //         const first = filtered[0];
  //         timeToGo = App.timeToGo(time, first.startTime);
  //         newState.first = first;
  //         newState.next = _.tail(filtered);
  //     }
  //     newState.timeToGo = timeToGo;
  //     this.setState(newState);
  // }
  //
  // static timeToGo(time, startTime) {
  //     return Math.round((new Date(startTime).getTime() - time.toDate().getTime()) / 1000);
  // }

  // getMockData() {
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
  // }
  //
  // fetchParticipants() {
  //   return this.getMockData()
  //     .then(results => {
  //       return results.map(item => {
  //         item.name = `${item.firstName} ${item.lastName}`;
  //         item.startTime = moment(item.startTime);
  //         return item;
  //       });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRoutName="Events">
          <Stack.Screen name="Events" component={EventPage} />
          <Stack.Screen name="Starter" component={StarterPage} />
        </Stack.Navigator>
      </NavigationContainer>
      //   <StarterPage participants={this.state.all} />
    );
  }
}

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
