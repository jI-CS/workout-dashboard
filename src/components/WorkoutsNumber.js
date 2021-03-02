import React from 'react'

const WorkoutsNumber = ({cant}) => {
   return (
      <div className="workouts-number">
         <p>Has realizado<span className="gigante">{cant}</span>entrenamientos</p>
      </div>
   )
}

export default WorkoutsNumber
