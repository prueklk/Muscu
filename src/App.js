import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAWxQQENE7r3XWNAYbXAgHY7CeJKFKBhi0',
      authDomain: 'workout-b140a.firebaseapp.com',
      databaseURL: 'https://workout-b140a.firebaseio.com',
      storageBucket: 'workout-b140a.appspot.com',
      messagingSenderId: '340223409905'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    // {} (2nd argument) is for adding initial state that we want to pass to
    // reduct app e.g. email, password
    // applyMiddleware(ReduxThunk) (3rd argument) is store enhancer

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
