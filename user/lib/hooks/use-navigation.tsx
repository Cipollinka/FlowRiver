import {
  CommonActions,
  useNavigation as useStackNavigation,
  useNavigationState,
  NavigationProp,
} from '@react-navigation/native';
import {Recipe} from '../../../user/types';

export enum ScreenName {
  Loader = 'Loader',
  OnBoards = 'OnBoards',
  Main = 'Main',
  Home = 'Home',
  AddFlows = 'AddFlows',
  AddAchievements = 'AddAchievements',
  EditProfile = 'EditProfile',
  FlowDetails = 'FlowDetails',
  FlowTimer = 'FlowTimer',
  FlowComplete = 'FlowComplete',
}

export type RootStackParamList = {
  Loader: undefined;
  Main: undefined;
  Home: undefined;
  AddFlows: undefined;
  AddAchievements: undefined;
  EditProfile: undefined;
  FlowDetails: {recipe: Recipe};
  FlowTimer: {recipe: Recipe; currentLesson: number};
  FlowComplete: {recipe: Recipe};
};

export const useNavigation = () => {
  const navigation = useStackNavigation<NavigationProp<RootStackParamList>>();
  const currentScreen = useNavigationState(state =>
    state?.routes ? state.routes[state.index].name : '',
  );

  const navigate = (screen: ScreenName, params?: any) => {
    if (currentScreen === screen) {
      return;
    }

    if (screen === ScreenName.Main || screen === ScreenName.Loader) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: screen, params}],
        }),
      );
    } else {
      navigation.navigate(screen, params);
    }
  };

  return {navigate, currentScreen};
};
