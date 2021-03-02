import React from "react";
import { Bar } from "react-chartjs-2";

const WeightEvolution = ({ workouts }) => {
   const data = {
      labels: workouts.filter((w, i) => i >= workouts.length - 2).map(w =>  w.name),
      datasets: [
         {
            label: "Weight",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: workouts.filter((w, i) => i >= workouts.length - 2).map(w =>  w.weight),
         },
      ],
   };

   const options = {
      maintainAspectRatio: false,
      layout: {
         padding: { left: 16, top: 0, right: 16, bottom: 0 },
      },
      scales: {
         xAxes: [
            {
               gridLines: {
                  display: false,
               },
            },
         ],
         yAxes: [
            {
               gridLines: {
                  display: false,
               },
               ticks: {
                  beginAtZero: true,
                  
               },
            },
         ],
      },
   };
   return (
      <div className="">
         <h3>Weight Evolution</h3>
         <div>
            <Bar data={data} options={options} height={280} />
         </div>
      </div>
   );
};

export default WeightEvolution;
