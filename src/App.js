import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import CustomRoute from "./components/utilities/CustomRoute";
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import DashboardWrapper from "./components/DashboardWrapper";
import Register from "./components/Register";

function App() {

   return (
      <Router>
         <div className="App">
            <Header />
            <Main>
               <Switch>
                  <Route exact path="/">
                     <Redirect to="/login" />
                  </Route>
                  <CustomRoute
                     {...{
                        path: "/dashboard",
                        exact: true,
                        component: DashboardWrapper,
                     }}
                  />
                  <CustomRoute
                     {...{
                        path: "/login",
                        exact: true,
                        component: Login,
                     }}
                  />
                  <CustomRoute
                     {...{
                        path: "/register",
                        exact: true,
                        component: Register,
                     }}
                  />
               </Switch>
            </Main>
         </div>
      </Router>
   );
}


export default App;
