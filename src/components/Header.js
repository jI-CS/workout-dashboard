import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { logout } from "../actions/actionCreators";

const Header = ({ user, logout }) => {
   const location = useLocation();
   const path = location.pathname;

   return (
      <header className="header">
         <h1>
            <Link to="/"> workout dashboard</Link>
         </h1>

         <nav>
            <ul>
               {user ? (
                  <>
                     <li className="user">
                        <FontAwesomeIcon icon={faUserCircle} size="2x" /> <span>{user.username}</span>
                        <div
                           className="userOptions"
                           onClick={() => {
                              console.log('loggin out')
                              logout();
                           }}
                        >
                           Logout
                        </div>
                     </li>
                  </>
               ) : (
                  <>
                     <li>
                        <Link to="/login" className={`${path === "/login" ? "active" : ""}`}>
                           login
                        </Link>
                     </li>
                     <li>
                        <Link to="/register" className={`${path === "/register" ? "active" : ""}`}>
                           registro
                        </Link>
                     </li>
                  </>
               )}
            </ul>
         </nav>
      </header>
   );
};

const mapStateToProps = (state, ownProps) => {
   return {
      user: state.user,
   };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return {
      logout() {
         dispatch(logout());
      },
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
