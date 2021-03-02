import { useState } from "react";
import FormControl from "./FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faClock, faRunning, faTimes, faWeight } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { addWorkout } from "../actions/actionCreators";
import CustomSpinner from './utilities/CustomSpinner';

const AddWorkoutForm = ({ types, handleOpenClose, addWorkout, loading }) => {
   const [formState, setFormState] = useState({
      workoutType: { value: 0, focus: "", valid: "", errors: [] },
      minutes: { value: 0, focus: "", valid: "", errors: [] },
      weight: { value: 0, focus: "", valid: "", errors: [] },
   });

   const onFocus = (field) => {
      setFormState({ ...formState, [field]: { ...formState[field], focus: "focused" } });
   };

   const onBlur = (field) => {
      setFormState({
         ...formState,
         [field]: { ...formState[field], focus: "", valid: formState[field].value > 0 ? "" : "invalid" },
      });
   };

   const validate = () => {
      const formKeys = Object.keys(formState);
      const reduced = formKeys.reduce((acc, curr) => {
         return { ...acc, [curr]: { ...formState[curr], valid: formState[curr].value > 0 ? "" : "invalid" } };
      }, {});
      setFormState(reduced);
   };

   const onSubmit = () => {
      if (formState.workoutType.value && formState.minutes.value && formState.weight.value) {
         addWorkout({
            workoutType: Number(formState.workoutType.value),
            minutes: Number(formState.minutes.value),
            weight: Number(formState.weight.value),
         })
         handleOpenClose();
      }
   };

   const onChange = (field) => {
      setFormState({
         ...formState,
         [field]: { ...formState[field], focus: "", valid: formState[field].value ? "" : "invalid" },
      });
   };

   const handleInput = (field, value) => {
      setFormState({
         ...formState,
         [field]: { ...formState[field], value: value, valid: formState[field].value + 1 > 0 ? "" : "invalid" },
      });
   };

   return (
      <div className="form-wrapper">
         <form>
            <FontAwesomeIcon icon={faTimes} size="lg" className="close-form" onClick={handleOpenClose} />
            <h2>add workout</h2>
            <div className={`form-control ${formState.workoutType.focus} ${formState.workoutType.valid}`}>
               <label className="select-label">
                  <FontAwesomeIcon icon={faRunning} size="lg" />
                  <select
                     name="workoutType"
                     onChange={(e) => onChange(e.target.name)}
                     onInput={(e) => handleInput(e.target.name, Number(e.target.value))}
                     onBlur={e => onBlur(e.target.name)}
                  >
                     <option value={-1}>Selecciona un entrenamiento...</option>
                     {types.map((t) => (
                        <option key={t.id} value={t.id}>
                           {t.name}
                        </option>
                     ))}
                  </select>
                  <FontAwesomeIcon icon={faArrowDown} className="arrow-down" />
               </label>
            </div>
            <FormControl
               className={`form-control ${formState.minutes.focus} ${formState.minutes.valid}`}
               icon={<FontAwesomeIcon icon={faClock} size="lg" />}
            >
               <input
                  type="number"
                  name="minutes"
                  placeholder="minutes"
                  onInput={(e) => handleInput(e.target.name, e.target.value)}
                  onFocus={(e) => onFocus(e.target.name)}
                  onBlur={(e) => {
                     onBlur(e.target.name);
                  }}
               />
            </FormControl>
            <FormControl
               className={`form-control ${formState.weight.focus} ${formState.weight.valid}`}
               icon={<FontAwesomeIcon icon={faWeight} size="lg" />}
            >
               <input
                  type="number"
                  name="weight"
                  placeholder="peso en kg"
                  onInput={(e) => handleInput(e.target.name, e.target.value)}
                  onFocus={(e) => onFocus(e.target.name)}
                  onBlur={(e) => {
                     onBlur(e.target.name);
                  }}
               />
            </FormControl>
            <button
               type="submit"
               style={{ width: "100%" }}
               onClick={(e) => {
                  e.preventDefault();
                  validate();
                  // console.log(formState)
                  onSubmit();
               }}
               disabled={loading}
               className={loading ? 'disabled' : ''}
            >
               {loading ? <CustomSpinner color="orange" size="24px" /> : "guardar"}
            </button>
            <button
               className="cancelar"
               style={{ width: "100%" }}
               onClick={(e) => {
                  handleOpenClose();
               }}
            >
               cancelar
            </button>
         </form>
      </div>
   );
};

const mapStateToPros = ({loading}) => ({loading});

const mapDispatchToProps = (dispatch, ownProps) => {
   return {
      addWorkout: (newWorkout) => {
         dispatch(addWorkout(newWorkout));
      },
   };
};

export default connect(mapStateToPros, mapDispatchToProps)(AddWorkoutForm);
