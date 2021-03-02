import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faBurn,
   faClock,
   faDumbbell,
   faHeartbeat,
   faRunning,
   faTrashAlt,
   faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { deleteWorkout } from "../actions/actionCreators";

const WorkoutItem = ({ workout, deleteWorkout }) => {
   const [justAdded, setJustAdded] = useState(true);

   useEffect(() => {
      setJustAdded(false);
   }, [justAdded]);

   const workoutIcon = (name) => {
      switch (name.toUpperCase()) {
         case "POTENCIA":
            return faDumbbell;
         case "RESISTENCIA":
            return faHeartbeat;
         case "VELOCIDAD":
         default:
            return faRunning;
      }
   };
   return (
      <li className={`workouts-list--item ${justAdded ? "just-added" : ""}`}>
         <span className="workout-info">
            <FontAwesomeIcon icon={workoutIcon(workout.name)} /> {workout.name}
         </span>
         <span className="workout-info">
            <FontAwesomeIcon icon={faClock} /> {workout.minutes}'
         </span>
         <span className="workout-info">
            <FontAwesomeIcon icon={faBurn} /> {workout.calories} kcal
         </span>
         <span className="delete">
            <FontAwesomeIcon
               icon={faTrashAlt}
               onClick={(e) => {
                  window.confirm("El entrenamiento se eliminará permanentemente") && deleteWorkout(workout.id);
               }}
            />
         </span>
      </li>
   );
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return {
      deleteWorkout: (id) => {
         dispatch(deleteWorkout(id));
      },
   };
};

export default connect(null, mapDispatchToProps)(WorkoutItem);
