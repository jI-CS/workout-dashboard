import { useEffect, useState } from "react";
import DashboardRow from "./DashboardRow";
import DashboardItem from "./DashboardItem";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddWorkoutForm from "./AddWorkoutForm";
import CustomSpinner from "./utilities/CustomSpinner";
import WorkoutList from "./WorkoutList";
import WeightEvolution from './WeightEvolution';
import Login from "./Login";
import MinsPerWorkoutType from "./MinsPerWorkoutType";
import WorkoutsNumber from "./WorkoutsNumber";
import IMCEvolution from "./IMCEvolution";
import Modal from "react-modal";
import HealthStatus from "./HealthStatus";

const Dashboard = ({ user, loading, workouts, workoutTypes, imcs, error, getWorkouts }) => {
   const [modalIsOpen, setModalIsOpen] = useState(false);

   Modal.setAppElement("#root");

   useEffect(() => {
      if (user) {
         getWorkouts(user);
      }
   }, [user, getWorkouts]);

   const handleOpenCloseForm = () => {
      setModalIsOpen(!modalIsOpen);
   };

   if (!user || (error && error.status === 401)) {
      return <Redirect to={Login} />;
   }

   return (
      <section className="dashboard">
         <div className="container">
            {loading ? (
               <div
                  className="custom-spinner"
                  style={{
                     marginTop: "10rem",
                     alignSelf: "center",
                  }}
               >
                  <CustomSpinner color="#efefef" size="48px" />
               </div>
            ) : workouts.length ? (
               <>
                  <DashboardRow>
                     <DashboardItem>
                        <WorkoutList workouts={workouts} types={workoutTypes}/>
                     </DashboardItem>
                     <DashboardItem>
                        <MinsPerWorkoutType workouts={workouts} types={workoutTypes} />
                     </DashboardItem>
                     <DashboardItem>
                        <WorkoutsNumber cant={workouts.length} />
                     </DashboardItem>
                  </DashboardRow>
                  <DashboardRow>
                     <DashboardItem>
                        <IMCEvolution imcs={imcs} user={user} />
                     </DashboardItem>
                     <DashboardItem><HealthStatus height={user.height} weight={workouts[workouts.length-1].weight}/></DashboardItem>
                     <DashboardItem><WeightEvolution workouts={workouts}/></DashboardItem>
                  </DashboardRow>
               </>
            ) : (
               <>
                  <p
                     className="alert"
                     style={{ color: "#efefef", fontSize: "24px", alignSelf: "center" }}
                  >
                     Aun no has realizado ningun entrenamiento
                  </p>
               </>
            )}

            <Modal overlayClassName="Overlay" className="Modal" isOpen={modalIsOpen} contentLabel="Example Modal">
               <AddWorkoutForm types={workoutTypes || []} visible={true} handleOpenClose={handleOpenCloseForm} />
            </Modal>
            <button
               className="fab"
               onClick={handleOpenCloseForm}
            >
               {modalIsOpen ? (
                  <FontAwesomeIcon icon={faMinus} size="2x" />
               ) : (
                  <FontAwesomeIcon icon={faPlus} size="2x" />
               )}
            </button>
         </div>
      </section>
   );
};


export default Dashboard;
