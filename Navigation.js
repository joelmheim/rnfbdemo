import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EventPage from './components/EventPage';
import Event from './components/Event';
import StarterPage from './components/StarterPage';

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRoutName="EventPage">
        <Stack.Screen name="EventPage" component={EventPage} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="Starter" component={StarterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
