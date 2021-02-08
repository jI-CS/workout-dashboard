import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faRulerVertical, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';


const Login = () => {

   const onSubmit = e => e.preventDefault();
   const path = useLocation().pathname;

   const [userFocus, setUserFocus] = useState(false);
   const [passFocus, setPassFocus] = useState(false);
   const [altFocus, setAltFocus] = useState(false);
   return (
      <form className="login">
         <h2>{path === '/login' ? 'login' : 'registrarse'}</h2>
         <div className={`form-control ${userFocus ? 'focused' : ''}`}>
            <label htmlFor="txtUsername"><FontAwesomeIcon icon={faUserAlt} size="lg"/>
            </label>
            <input type="text" id="txtUsername" name="username" placeholder="username" onFocus={() => {
               setUserFocus(true);
            }} onBlur={() => setUserFocus(false)}/>
         </div>
         <div className={`form-control ${passFocus ? 'focused' : ''}`}>
            <label htmlFor="txtPassword"><FontAwesomeIcon icon={faKey} size="lg"/></label>
            <input type="password" id="txtPassword" name="password" placeholder="password"
               onFocus={() => {
               setPassFocus(true);
            }} onBlur={() => setPassFocus(false)}
            />
         </div>
         { path === '/register' &&
            (<div className={`form-control ${altFocus ? 'focused' : ''}`}>
            <label htmlFor="txtAltura"><FontAwesomeIcon icon={faRulerVertical} size="lg"/></label>
            <input type="number" id="txtAltura" name="password" placeholder="altura" onFocus={() => {
               setAltFocus(true);
            }} onBlur={() => setAltFocus(false)}/>
         </div>)
         }
         
         <input type="submit" name="login" id="btnLogin" value={path === '/login' ? 'login' : 'registrarse'} onSubmit={onSubmit}/>
      </form>
   )
}

export default Login
