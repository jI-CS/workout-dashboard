import Header from './components/Header';
import Main from './components/Main';
import CustomRoute from './components/CustomRoute';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/">
               <Redirect to="/login" />
            </Route>
            <CustomRoute {... {path:'/dashboard'}}/>
         </Switch>
         <div className="App">
            <Header/>
            <Main/>
         </div>
      </Router>
   );
}

export default App;
