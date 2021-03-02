import { Redirect } from "react-router-dom";
import FormControl from "./FormControl";
import { useState } from "react";
import { connect } from "react-redux";
import { register } from "../actions/actionCreators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUserAlt, faRulerVertical } from "@fortawesome/free-solid-svg-icons";
import CustomSpinner from "./utilities/CustomSpinner";

const Register = ({ register, user, loading, error }) => {
   const [formState, setFormState] = useState({
      username: { value: "", focus: "", valid: "", errors: [] },
      password: { value: "", focus: "", valid: "", errors: [] },
      height: { value: "", focus: "", valid: "", errors: [] }
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

   const onInput = (field, value) => {
      console.log(formState);
      setFormState({
         ...formState,
         [field]: { ...formState[field], value: value, valid: formState[field].value.length + 1> 0 ? "" : "invalid" },
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
      if (
            formState.username.value.length 
            && formState.password.value.length 
            && formState.height.value.length)
         register({
            username: formState.username.value,
            password: formState.password.value,
            height: Number(formState.height.value)
         });
   };

   if (user) {
      return <Redirect to="/dashboard" />;
   }

   return (
      <form className="form">
         <h2>registro</h2>
         <FormControl
            className={`form-control ${formState.username.focus} ${formState.username.valid}`}
            icon={<FontAwesomeIcon icon={faUserAlt} size="lg" />}
         >
            <input
               type="text"
               name="username"
               placeholder="username"
               onInput={(e) => onInput(e.target.name, e.target.value)}
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
               onInput={(e) => onInput(e.target.name, e.target.value)}
               onFocus={(e) => onFocus(e.target.name)}
               onBlur={(e) => {
                  onBlur(e.target.name);
               }}
            />
         </FormControl>
         <FormControl
            className={`form-control ${formState.height.focus} ${formState.height.valid}`}
            icon={<FontAwesomeIcon icon={faRulerVertical} size="lg" />}
         >
            <input
               type="number"
               name="height"
               placeholder="altura en cm"
               onInput={(e) => onInput(e.target.name, e.target.value)}
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
   register: (user) => dispatch(register(user)),
});

const mapStateToProps = ({ user, loading, error }) => ({ user, loading, error });

export default connect(mapStateToProps, mapDispatchToProps)(Register);

