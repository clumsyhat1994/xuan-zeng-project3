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
import Landing from './components/Landing';
import reducers from './reducers/reducers';
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/searchResult/:keyword' element={<NavBar search={true} />} />
        <Route path='/jobDetail/:id' element={<NavBar search={true} />} />
        <Route path='*' element={<NavBar />} />
      </Routes>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Authentication mode='login' />} />
        <Route path='/register' element={<Authentication mode='register' />} />
        <Route path='/searchResult/:keyword' element={<SearchResult />} />
        <Route path='/jobDetail/:id' element={<JobDetail />} />
        <Route path='/postJob/:step' element={<JobForm />} />

        <Route path='/updateJob/:id' element={<JobForm />} />
        <Route path='/myFav' element={<FavList />} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);


