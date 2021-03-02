import { combineReducers } from "redux";
import * as types from "../actions/actionTypes";
import * as selectors from './selectors';

const workouts = (state = [], action) => {
   switch (action.type) {
      case types.GET_WORKOUTS:
         return action.payload;
      case types.ADD_WORKOUT:
         return [...state, action.payload].reverse();
      case types.DELETE_WORKOUT:
         return state.filter((w) => w.id !== action.payload.id).reverse();
      case types.LOGOUT:
         return [];
      default:
         return state;
   }
};


const user = (state = null, action) => {
   switch (action.type) {
      case types.LOGIN:
         return action.payload;
      case types.LOGOUT:
         return null;
      case types.NETWORK_ERROR:
         return null;
      default:
         return state;
   }
};

const loading = (state = false, action) => {
   switch (action.type) {
      case types.SENDING_REQUEST:
      case types.RECEIVING_REQUEST:
         return action.loading;
      default:
         if (action.loading) return action.loading;
         return false;
   }
};

const workoutTypes = (state = [], action) => {
   switch (action.type) {
      case types.GET_WORKOUT_TYPES:
         return action.payload;
      default:
         return state;
   }
};

const error = (state = {}, action) => {
   switch (action.type) {
      case types.NETWORK_ERROR:
         return {
            type: action.type,
            response: action.response
         }
      case types.AUTH_ERROR:
         return {
            type: action.type,
            response: action.response
         }
      default:
         return null;
   }
}

const root = combineReducers({
   workouts,
   user,
   loading,
   workoutTypes,
   error,
});

export const getWorkoutsIMC = (state) => state.user && selectors.getWorkoutsIMC(state.workouts, state.user.height)

export default root;
