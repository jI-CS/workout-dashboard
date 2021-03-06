import { Redirect } from "react-router-dom";
import FormControl from "./FormControl";
import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../actions/actionCreators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import CustomSpinner from "./utilities/CustomSpinner";

const Login = ({ login, user, loading, error }) => {
   const [formState, setFormState] = useState({
      username: { value: "", focus: "", valid: "", errors: [] },
      password: { value: "", focus: "", valid: "", errors: [] },
   });

   const onFocus = (field) => {
      setFormState({ ...formState, [field]: { ...formState[field], focus: "focused" } });
   };

   const onBlur = (field) => {
      setFormState({
         ...formState,
         [field]: { ...formState[field], focus: "", valid: formState[field].value ? "" : "invalid" },
      });
   };

   const validate = () => {
      const formKeys = Object.keys(formState);
      const reduced = formKeys.reduce((acc, curr) => {
         return { ...acc, [curr]: { ...formState[curr], valid: formState[curr].value.length ? "" : "invalid" } };
      }, {});
      setFormState(reduced);
   };

   const onSubmit = () => {
      if (formState.username.value.length && formState.password.value.length)
         login({
            username: formState.username.value,
            password: formState.password.value,
         });
   };

   const handleInput = (field, value) => {
      setFormState({
         ...formState,
         [field]: { ...formState[field], value: value, valid: formState[field].value.length + 1 > 0 ? "" : "invalid" },
      });
   };

   if (user) {
      return <Redirect to="/dashboard" />;
   }

   return (
      <form className="form">
         <h2>login</h2>
         <FormControl
            className={`form-control ${formState.username.focus} ${formState.username.valid}`}
            icon={<FontAwesomeIcon icon={faUserAlt} size="lg" />}
         >
            <input
               type="text"
               name="username"
               placeholder="username"
               onInput={(e) => handleInput(e.target.name, e.target.value)}
               onFocus={(e) => onFocus(e.target.name)}
               onBlur={(e) => {
                  onBlur(e.target.name);
               }}
            />
         </FormControl>
         <FormControl
            className={`form-control ${formState.password.focus} ${formState.password.valid}`}
            icon={<FontAwesomeIcon icon={faKey} size="lg" />}
         >
            <input
               type="password"
               name="password"
               placeholder="password"
               onInput={(e) => handleInput(e.target.name, e.target.value)}
               onFocus={(e) => onFocus(e.target.name)}
               onBlur={(e) => {
                  onBlur(e.target.name);
               }}
            />
         </FormControl>
         <button
            type="submit"
            name="login"
            id="btnLogin"
            onClick={(e) => {
               console.log(formState);
               e.preventDefault();
               validate();
               onSubmit();
            }}
            disabled={loading}
            className={loading ? "disabled" : ""}
         >
            {loading ? <CustomSpinner color="orange" size="24px" /> : "login"}
         </button>
         {error && error.type === "AUTHENTICATION_ERROR" && <p className="authError">{error.response.message}</p>}
      </form>
   );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
   login: (user) => dispatch(login(user)),
});

const mapStateToProps = ({ user, loading, error }) => ({ user, loading, error });

export default connect(mapStateToProps, mapDispatchToProps)(Login);
