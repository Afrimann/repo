import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import './UploadCourses.css';

const UploadCourses = () => {
    const { state } = useLocation();
    const name = state?.name;
    const dept = state?.dept;
    const noOfCourses = state?.noOfCourses || 1;
    const matricNo = state?.matric;
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([]);
    const coursesCollectionRef = collection(db, 'courses');

    useEffect(() => {
        const getAllCourses = async () => {
            try {
                const course = await getDocs(coursesCollectionRef);
                const filteredCourses = course.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setAllCourses(filteredCourses);
            } catch (err) {
                console.error(err);
            }
        };
        getAllCourses();
    }, []);

    const initialCourses = Array.from({ length: noOfCourses }, () => '');
    const initialScores = Array.from({ length: noOfCourses }, () => '');
    const initialGrades = Array.from({ length: noOfCourses }, () => '');

    const [courses, setCourses] = useState(initialCourses);
    const [scores, setScores] = useState(initialScores);
    const [grades, setGrades] = useState(initialGrades);

    const handleCourseChange = (index, value) => {
        const newCourses = [...courses];
        newCourses[index] = value;
        setCourses(newCourses);
    };

    const handleScoreChange = (index, value) => {
        const newScores = [...scores];
        newScores[index] = value;
        setScores(newScores);
    };

    const handleGradeChange = (index, value) => {
        const newGrades = [...grades];
        newGrades[index] = value;
        setGrades(newGrades);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (courses.every(course => course) && scores.every(score => score) && grades.every(grade => grade)) {
            navigate('/Result', {
                state: { courses, scores, grades, noOfCourses },
            });
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <div className='UploadCourses'>
            <div className="container">
                <div className="container-heading">
                    <span>Welcome, {name}.</span>
                    <span>Department : {dept}</span>
                    <span>Matric Number : {matricNo}</span>
                </div>
                <div className="uploadCourses" style={{ display: 'flex', gap: '20px' }}>
                    <form onSubmit={handleSubmit}>
                        {Array.from({ length: noOfCourses }).map((_, index) => (
                            <div key={index} className={`course-${index + 1}`}>
                                <label htmlFor={`course${index + 1}`}>Course {index + 1}</label>
                                <select
                                    name="course"
                                    id={`course-${index + 1}`}
                                    value={courses[index]}
                                    onChange={(e) => handleCourseChange(index, e.target.value)}
                                >
                                    <option value="">{`Select Course ${index + 1}`}</option>
                                    {allCourses.map((course) => (
                                        <option key={course.id} value={course.title}>{course.title}</option>
                                    ))}
                                </select>
                                <input
                                    type='number'
                                    placeholder={`Enter Score ${index + 1}`}
                                    value={scores[index]}
                                    onChange={(e) => handleScoreChange(index, e.target.value)}
                                />
                                <select
                                    name="grade"
                                    id={`grade-${index + 1}`}
                                    value={grades[index]}
                                    onChange={(e) => handleGradeChange(index, e.target.value)}
                                >
                                    <option value="">{`Select Grade ${index + 1}`}</option>
                                    <option value="4">4 units</option>
                                    <option value="3">3 units</option>
                                    <option value="2">2 units</option>
                                    <option value="1">1 unit</option>
                                </select>
                            </div>
                        ))}
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadCourses;
