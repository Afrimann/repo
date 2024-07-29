import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CourseInput from './CourseInput.jsx';
import Result from './ResultList.jsx';
import CGPA from './CGPACalculator.jsx';
import UploadCourses from './UploadCourses.jsx';
import ShowResult from './ShowResult.jsx';

const App = () => {
  return (
    <div className='App'>
      <header className='header'>
        <h1>Calculate Your CGPA</h1>
      </header>
      
      <main className='main-content'>
        <Routes>
          <Route path='' element={<CourseInput />} />
          <Route path='uploadCourses' element={<UploadCourses />} />
          <Route path='Result' element={<Result />} />
          <Route path='CourseInput' element={<CGPA />} />
          <Route path='cgpa' element={<ShowResult />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
