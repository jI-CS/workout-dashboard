import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
   const path = useLocation().pathname;

   return (
      <div className="sidebar">
         <nav>
            <ul>
               <li>
                  <Link 
                     to='/dashboard' 
                     className={`${path === '/dashboard' ? 'active' : ''}`}>
                     <FontAwesomeIcon 
                        icon={faChartBar} 
                        size='2x' 
                        />
                  </Link>
               </li>
               <li>
                  <Link 
                     to='/add-workout'
                     className={`${path === '/add-workout' ? 'active' : ''}`}>
                     <FontAwesomeIcon 
                        icon={faPlus} 
                        size='2x'
                        />
                  </Link></li>
            </ul>
         </nav>
      </div>
   )
}

export default Sidebar
