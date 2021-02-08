import './App.css';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import applicationStore from './data/applicationStore';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={applicationStore}>
      <MainPage />
    </Provider>
  );
}

export default App;
