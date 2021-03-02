import React from "react";
import { Doughnut } from "react-chartjs-2";

const MinsPerWorkoutType = ({ workouts, types }) => {
   const data = {
      labels: types.map((t) => t.name),
      datasets: [
         {
            data: types.map((t) =>
               workouts.filter((w) => w.trainning_type === t.id).reduce((acc, curr) => acc + curr.minutes, 0)
            ),
            backgroundColor: ["rgba(255, 144, 0, 0.9)", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["rgba(255, 144, 0, 0.9)", "#36A2EB", "#FFCE56"],
         },
      ],
   };

   return (
      <>
         <h3>Mins / Workout type</h3>
         <Doughnut data={data} height={140} />
      </>
   );
};

export default MinsPerWorkoutType;
