import { useEffect } from 'react';
import nprogress from 'nprogress';
import { Route } from 'react-router-dom';
import 'nprogress/nprogress.css';
import '../nprogres.css'

const CustomRoute = (props) => {

   useEffect(() => {
      nprogress.done();
   })

   nprogress.start();
   return (
      <Route {...props}/>
   )
}

export default CustomRoute
