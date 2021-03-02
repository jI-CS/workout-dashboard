import {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faClock, faRunning, faTimes, faWeight } from "@fortawesome/free-solid-svg-icons";

const Alerta = ({title, text}) => {
   const [visible, setVisible] = useState(true);

   const closeAlert = () => {
      setVisible(false);
   }

   return (
      <> 
      {visible &&
         <div className='alerta'>
            <FontAwesomeIcon icon={faTimes} size="lg" onClick={closeAlert} />
            <h3>Error {title}</h3>
            <p>{text}</p>
         </div>
         
      }
      </>
   )
}

export default Alerta
