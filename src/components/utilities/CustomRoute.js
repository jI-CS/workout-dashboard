import { useEffect } from 'react';
import nprogress from 'nprogress';
import { Route } from 'react-router-dom';
import '../../../node_modules/nprogress/nprogress.css'

const CustomRoute = (props) => {

   nprogress.configure({ easing: 'ease', speed: 300 })
   useEffect(() => {
      nprogress.done();
   });
   nprogress.start();   
   
   return (
      <Route  {...props}/>
   )
}

export default CustomRoute
