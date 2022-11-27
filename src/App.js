import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Employee from './Components/Employee';
import EmployCreate from './Components/EmployCreate';
import EmployDetails from './Components/EmployDetails';
import EmployEdit from './Components/EmployEdit';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Employee />} />
        <Route path='/create' element={<EmployCreate />} />
        <Route path='/details/:dataId' element={<EmployDetails />} />
        <Route path='/edit/:dataId' element={<EmployEdit />} />
      </Routes>
    </>
  );
}

export default App;
