import React, {useCallback, useEffect, useRef} from 'react';
import {
  NavigationHelpersContext,
  useNavigationBuilder,
  StackRouter,
} from '@react-navigation/native';
import {View, PanResponder} from 'react-native';

const CustomNavigator = ({initialRouteName, children, screenOptions}) => {
  const {state, navigation, descriptors} = useNavigationBuilder(StackRouter, {
    children,
    screenOptions,
    initialRouteName,
  });
  const timerId = useRef(false);

  useEffect(() => {
    resetInactivityTimeout();
  }, [resetInactivityTimeout]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        resetInactivityTimeout();
      },
    }),
  ).current;

  const resetInactivityTimeout = useCallback(() => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      console.log('time out !!!');
    }, 5000);
  }, []);

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <View
        style={{flex: 1}}
        onTouchEnd={() => {
          console.log('On Touch End');
          resetInactivityTimeout();
        }}
        onStartShouldSetResponder={() => {
          console.log('You click by View');
        }}>
        {descriptors[state.routes[state.index].key].render()}
      </View>
    </NavigationHelpersContext.Provider>
  );
  //   return (
  //     <NavigationHelpersContext.Provider value={navigation}>
  //       <View style={{flex: 1}} {...panResponder.panHandlers}>
  //         {descriptors[state.routes[state.index].key].render()}
  //       </View>
  //     </NavigationHelpersContext.Provider>
  //   );
};

export default CustomNavigator;
