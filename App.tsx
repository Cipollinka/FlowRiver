import React from 'react';
import {Loader} from './src/components/loader/loader-screen.tsx';
import {UserProvider} from './user/Provider/UserProvider.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Main} from './src/components/main/main-container.tsx';
import {Home} from './src/components/pages/Home/home-screen.tsx';
import {AddFlows} from './src/components/pages/Home/add-flows-screen.tsx';
import {AddAchievements} from './src/components/pages/Achievements/add-achievements.tsx';
import {EditProfile} from './src/components/pages/Profile/edit-profile.tsx';
import {FlowDetails} from './src/components/pages/Home/flow-details.tsx';
import {FlowTimer} from './src/components/pages/Home/flow-timer.tsx';
import {FlowComplete} from './src/components/pages/Home/flow-complete';
import {ScreenName} from './user/lib/hooks/use-navigation';
const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, animationEnabled: false}}>
          <Stack.Screen name="Loader" component={Loader} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddFlows" component={AddFlows} />
          <Stack.Screen name="AddAchievements" component={AddAchievements} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="FlowDetails" component={FlowDetails as never} />
          <Stack.Screen
            name={ScreenName.FlowTimer}
            component={FlowTimer as never}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ScreenName.FlowComplete}
            component={FlowComplete as never}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
