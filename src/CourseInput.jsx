import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseInput.css';

const CourseInput = () => {
    const [name, setName] = useState('');
    const [dept, setDept] = useState('');
    const [noOfCourses, setNo_of_courses] = useState('');
    const [matric, setMatric] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && dept && noOfCourses && matric) {
            navigate('/uploadCourses', {
                state: { name, dept, noOfCourses, matric }
            });  
        } else {
            alert('Please fill in all the fields');
        }
    };
    // const  [name,setName] = useCon 

    return (
        <div className='InputCourse'>
            <form className="questForm" onSubmit={handleSubmit}>
                <div className="line-form">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id='name'
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="line-form">
                    <label htmlFor="dept">Department:</label>
                    <input
                        type="text"
                        id='dept'
                        placeholder='Enter Your Department'
                        value={dept}
                        onChange={(e) => setDept(e.target.value)} 
                    />
                </div>
                <div className="line-form">
                    <label htmlFor="matric">Matric No:</label>
                    <input
                        type="text"
                        id='matric'
                        placeholder='Enter Your Matric No'
                        value={matric}
                        onChange={(e) => setMatric(e.target.value)} 
                    />
                </div>
                <div className="line-form">
                    <label htmlFor="number">Number of Courses:</label>
                    <input
                        type="number"
                        placeholder='How Many Courses'
                        value={noOfCourses}
                        onChange={(e) => setNo_of_courses(e.target.value)} 
                    />
                </div>
                <div className="line-form">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default CourseInput;
