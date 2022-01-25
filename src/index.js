import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import Authentication from './components/Authentication';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import JobDetail from './components/JobDetail';
import JobForm from './components/JobForm';
import FavList from './components/FavList';
import { isLoggedInReducer } from './redux/isLoggedIn';
const store = createStore(isLoggedInReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<SearchBar />} />
        <Route path='/login/:prevURL' element={<Authentication mode='login' />} />
        <Route path='/register' element={<Authentication mode='register' />} />
        <Route path='/searchResult/:keyword' element={<SearchResult />} />
        <Route path='/jobDetail/:id' element={<JobDetail />} />
        <Route path='/postJob' element={<JobForm />} />
        <Route path='/updateJob/:id' element={<JobForm />} />
        <Route path='/myFav' element={<FavList />} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);


