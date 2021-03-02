import React, { useEffect, useState } from "react";

const HealthStatus = ({height, weight}) => {
   const imc = weight/((height/100)*(height/100));
   const [result, setResult] = useState('');
   const [observacion, setObservacion] = useState('');
   useEffect(() => {
      healthStatusResult();
   })
   const healthStatusResult = () => {
      if (imc < 18.5){
         setResult('bajo peso');
         setObservacion('Debes subir un poco de peso');
      }
      else if (imc < 25) {
         setResult('adecuado');
         setObservacion('Tu peso es el adecuado');
      }
      else if (imc < 30){
         setResult('sobrepeso');
         setObservacion('Debes bajar un poco de peso');
      }
      else {
         setResult('obesidad');
         setObservacion('Debes bajar mucho de peso');
      }
   }
   return (
      <div className="health-status">
         <h3>Health status</h3>
         <div>
            <p>Estado de salud</p>
            <p className={`health-status--result ${result}`}>{result}</p>
         </div>
         <div className="health-status--data">
            <p>peso <span >{weight} kg</span></p>
            <p>altura <span>{height/100} m</span></p>
            <p>IMC <span>{Math.round(imc*100)/100}</span></p>
         </div>
         <p className="health-status--observation">{observacion}</p>
      </div>
   );
};

export default HealthStatus;
