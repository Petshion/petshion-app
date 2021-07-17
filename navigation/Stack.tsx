import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Tabs from './Tabs';
import HeaderTitle from '../components/HeaderTitle';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        shadowColor: '#666666',
      },

      headerBackTitleVisible: false,
    }}>
    <Stack.Screen
      name="Tabs"
      component={Tabs}
      options={{
        // header 컴포넌트 만들어야 함.
        headerTitle: props => <HeaderTitle />,
      }}
    />
    {/* <Stack.Screen name="Detail" component={Detail} /> */}
  </Stack.Navigator>
);
