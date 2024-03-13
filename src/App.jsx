import { useDispatch } from 'react-redux';
import './App.css'

import Header from './components/Header';
import Table from './components/Table';
import { types } from './redux/sagas/userSaga';
import { useEffect } from 'react';
import { SET_GENRES } from './redux/sagas/types';


function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type: SET_GENRES})
    dispatch({type: types.RESTORE_SESSION})
  },[dispatch])


 
  return (
    <>
      {/* there should be two sides 
       one side is navigation and the other is music list
       */}
    <Header />
    <Table/>

    </>
  )
}

export default App
