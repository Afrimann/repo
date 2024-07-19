import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import ShowResult from './ShowResult';

const Result = () => {
    const { state } = useLocation();
    const { courses, scores, grades } = state || { courses: [], scores: [], grades: [] };
    const [showResult, setShowResult] = useState(false);
    const [cgpa, setCgpa] = useState(null);
    const [showButton,setShowButton] = useState(true)
    const [showPrint,setShowPrint] = useState(false)
    const [remarks, setRemarks] = useState(Array(courses.length).fill(''));
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const displayRemark = (score) => {
        return score >= 45 ? 'Passed' : 'Failed';
    };


    const calculateCGPA = () => {
        let totalGradePoints = 0;
        let totalUnits = 0;
        const newRemarks = [];

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

            newRemarks[index] = displayRemark(score);

            const gradePoint = scorePoint * grade;
            totalGradePoints += gradePoint;
            totalUnits += grade;
        });

        const CGPA = totalGradePoints / totalUnits;
        setCgpa(CGPA.toFixed(2));
        setRemarks(newRemarks);
        setShowResult(true);
        setShowButton(false)
        setShowPrint(true)
        console.log(newRemarks); // Debugging log to check the remarks array
    };



    useEffect(() => {
        console.log("Remarks updated: ", remarks); // Debugging log to check remarks on update
    }, [remarks]);


    return (
        <div className="Result">
            <h1>Result</h1>
            <div ref={componentRef}>
                {courses.map((course, index) => (
                    <div key={index}>
                        <h2>Course {index + 1}</h2>
                        <p>Course Name: {course}</p>
                        <p>Score: {scores[index]}</p>
                        <p>Grade: {grades[index]} units</p>
                        <p>Remark: {remarks[index]}</p>
                    </div>
                ))}
               <div className="buttons" style={{display: 'flex', flexDirection:'column',gap:'10px'}}>
               {showButton && <button onClick={calculateCGPA}>Generate CGPA</button>}
                {showResult && cgpa && <ShowResult cgpa={cgpa} />}
                {showPrint && <button onClick={handlePrint}>Print Result</button>}
               </div>
            </div>
        </div>
    );
};

export default Result;
