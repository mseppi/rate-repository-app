import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <>
      <NativeRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
