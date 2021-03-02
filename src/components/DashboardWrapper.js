import { connect } from "react-redux";
import { getWorkouts } from "../actions/actionCreators";
import Dashboard from "./Dashboard";
import { getWorkoutsIMC } from '../reducers/rootReducer';

const mapStateToProps = (state) => ({
   user: state.user,
   loading: state.loading,
   workouts: state.workouts.reverse(),
   workoutTypes: state.workoutTypes,
   error: state.error,
   imcs: getWorkoutsIMC(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
   getWorkouts: (user) => dispatch(getWorkouts(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
