import React from 'react'

const ShowResult = ({cgpa}) => {
  return (
    <div>
      <p style={{fontSize : '20px' ,fontWeight: 'bold'}}>Your CGPA is : {cgpa}</p>
    </div>
  )
}

export default ShowResult