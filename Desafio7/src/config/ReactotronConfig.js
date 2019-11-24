import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reacotronSaga from 'reactotron-redux-saga';

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .use(reactotronRedux())
    .use(reacotronSaga())
    .connect();

  console.tron = tron;

  tron.clear();
}
