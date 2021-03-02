import React from 'react';
import { Line } from 'react-chartjs-2';
import {connect} from 'react-redux';


const IMCEvolution = ({imcs, user}) => {
   const data = {
      labels: imcs.map(w => ""),
      datasets: [
         {
            label: 'IMC',
            data: imcs,
            fill: false,
            backgroundColor: 'rgb(240, 148, 0)',
            borderColor: 'rgba(240, 148, 0, .4)',
            spanGaps: true,
            pointRadius: 3,
            lineTension: 0.4,
         },
      ],
   }

   const options = {
      maintainAspectRatio: false,
      layout: {
            padding: {left: 16, top: 0, right: 16, bottom: 0}
      },
      scales: {
         xAxes:[
            {
               gridLines: {
                  display: false
               }
            }
         ],
         yAxes: [
            {
               gridLines: {
                  display: false
               },
               ticks: {
                  beginAtZero: false,
               },
            },
         ],
      },
   }

   return (
      <div className="imc-evolution">
         <h3>IMC Evolution</h3>
         <div>
         <Line 
            data={data} 
            options={options}
            height={280}
            width={120}
            />
         </div>
      </div>
   )
}

const mapStateToProps = (state, ownProps) => {
   return {
      user: state.user
   }
}

export default connect(mapStateToProps)(IMCEvolution);
