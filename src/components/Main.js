import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Login from './Login';
import CustomRoute from './CustomRoute';
import { Switch } from 'react-router-dom';
const Main = () => {

   return (
      <main>
         <Switch>
            <CustomRoute {...
               {
                  path: '/dashboard', 
                  exact: true, 
                  render: () => (
                     <>
                        <Sidebar/>
                        <Dashboard/>
                     </>
                  )
               }
            }/>
            <CustomRoute {...
               {
                  path: '/add-workout', 
                  exact: true, 
                  render: () => (
                     <>
                        <Sidebar/>
                     </>
                  )
               }
            }/>
            <CustomRoute {...
               {
                  path: ['/login', '/register'],
                  exact: true,
                  component: Login
               }
            }/>
         </Switch>
      </main>
   )
}

export default Main
