import { connect } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import Login from "./Login";
import Alerta from "./Alerta";
import { routeChange } from "../actions/actionCreators";
import { useEffect } from "react";

const Main = ({ children, error, user, dispatch }) => {
   const history = useHistory();
   useEffect(() => {
      history.listen((location) => {
         dispatch(routeChange());
      });
   }, [history])
   
   return (
      <main>
         {!user || (error && error.response.status === 401 && <Redirect to={Login} />)}
         {error && error.type === "NETWORK_ERROR" && (
            <Alerta title={error.response.status} text={error.response.statusText} />
         )}
         {children}
         
      </main>
   );
};

const mapStateToProps = ({ error, user }) => ({ error, user });

export default connect(mapStateToProps)(Main);
