import WorkoutItem from './WorkoutItem';

const WorkoutList = ({workouts, types}) => {

   const workoutsWithCalories = workouts.map(w => ({
      ...w, calories: types.find(t => t.id === w.trainning_type).calories_per_minute * w.minutes
   })).reverse();
   return (
      <>
         <h3>Workouts list</h3>
         <ul className="workouts-list">
            {workoutsWithCalories.map((w, i) => (
               <WorkoutItem 
                  key={w.id} 
                  workout={w}
                  />
            ))}
         </ul>
      </>
   )
}

export default WorkoutList
