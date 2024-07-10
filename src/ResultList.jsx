import React from 'react';
import { useLocation } from 'react-router-dom';


const Result = () => {
    const { state } = useLocation();
    const { courses, scores, grades, noOfCourses } = state || { courses: [], scores: [], grades: [], noOfCourses: 1 };

    const calculateCGPA = () => {
        let totalGradePoints = 0;
        let totalUnits = 0;

        courses.forEach((course, index) => {
            const score = scores[index];
            const grade = parseInt(grades[index], 10); // Assuming grades is an array of integers representing course units

            let scorePoint = 0;
            if (score >= 70) {
                scorePoint = 4;
            } else if (score >= 60) {
                scorePoint = 3;
            } else if (score >= 50) {
                scorePoint = 2;
            } else if (score >= 45) {
                scorePoint = 1;
            } else {
                scorePoint = 0;
            }

            const gradePoint = scorePoint * grade;
            totalGradePoints += gradePoint;
            totalUnits += grade;
        });

        const CGPA = totalGradePoints / totalUnits;
        alert(`Your CGPA is: ${CGPA.toFixed(2)}`);
    };

    return (
        <div className="Result">
            <h1>Result</h1>
            <div>
                {courses.map((course, index) => (
                    <div key={index}>
                        <h2>Course {index + 1}</h2>
                        <p>Course Name: {course}</p>
                        <p>Score: {scores[index]}</p>
                        <p>Grade: {grades[index]} units</p>
                    </div>
                ))}
                <button onClick={calculateCGPA}>Generate CGPA</button>
               {/* <p>{`Your CGPA is ${}`}</p> */}

            </div>
        </div>
    );
};

export default Result;
