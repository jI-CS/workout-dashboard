export const getWorkoutsIMC = (workouts, height) => {
   return workouts.map(w => w.weight/((height/100)*(height/100)))
}