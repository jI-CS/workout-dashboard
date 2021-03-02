import * as types from "./actionTypes";
import nprogress from "nprogress";
import "../../node_modules/nprogress/nprogress.css";

const loginAction = (user) => ({
   type: types.LOGIN,
   payload: user,
});

const registerAction = (newUser) => ({
   type: types.REGISTER,
   payload: newUser,
});

const logoutAction = () => ({
   type: types.LOGOUT,
});

const networkError = (resp) => ({
   type: types.NETWORK_ERROR,
   response: { status: resp.status, statusText: resp.statusText, message: resp.message },
});

const authError = (error, page) => ({
   type: types.AUTH_ERROR,
   response: {
      status: error.status,
      message: error.message,
      page: page,
   },
});

export const routeChange = () => ({
   type: types.ROUTE_CHANGE,
});

const getWorkoutsAction = (workouts, workoutTypes) => ({
   type: types.GET_WORKOUTS,
   payload: workouts.map((w) => ({
      ...w,
      name: workoutTypes.find((wt) => wt.id === w.trainning_type).name,
   })),
});

const getWorkoutTypesAction = (workoutTypes, loading) => ({
   type: types.GET_WORKOUT_TYPES,
   payload: workoutTypes,
   loading,
});

const deleteWorkoutAction = (id) => ({
   type: types.DELETE_WORKOUT,
   payload: {
      id,
   },
});

const addWorkoutAction = (newWorkout) => ({
   type: types.ADD_WORKOUT,
   payload: newWorkout,
});

export const login = (user) => (dispatch, getState) => {
   dispatch({
      type: types.SENDING_REQUEST,
      loading: true,
   });
   if (getState().loading) nprogress.start();

   return fetch("https://trainning-rest-api.herokuapp.com/v1/users/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then(
         (resp) => {
            if (resp.ok || [404, 400].includes(resp.status)) return resp.json();
            else {
               dispatch(networkError(resp));
               throw new Error(resp.status, resp.message);
            }
         },
         (error) => {
            throw new Error(error);
         }
      )
      .then((data) => {
         nprogress.done();
         if (data.id) {
            dispatch(loginAction(data));
            sessionStorage.setItem("user", JSON.stringify(data));
         } else {
            dispatch(authError(data, "/login"));
         }
      })
      .catch((e) => {
         nprogress.done();
         dispatch(
            networkError({
               status: e.message || 0,
               statusText: "Something went wrong :(",
            })
         );
         console.log(e.message, e.name);
         console.error(e);
      });
};

export const register = (newUser) => (dispatch, getState) => {
   dispatch({
      type: types.SENDING_REQUEST,
      loading: true,
   });
   if (getState().loading) nprogress.start();

   return fetch("https://trainning-rest-api.herokuapp.com/v1/users/register", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
   })
      .then(
         (resp) => {
            if (resp.ok || [404, 400].includes(resp.status)) return resp.json();
            else {
               dispatch(networkError(resp));
               throw new Error(resp.status, resp.message);
            }
         },
         (error) => {
            throw new Error(error);
         }
      )
      .then((data) => {
         nprogress.done();
         if (data.status === 200) {
            dispatch(login(newUser));
            sessionStorage.setItem("user", JSON.stringify(data));
         } else {
            dispatch(authError(data, "/register"));
         }
      })
      .catch((e) => {
         nprogress.done();
         dispatch(
            networkError({
               status: e.message || 0,
               statusText: "Something went wrong :(",
            })
         );
         console.error(e);
      });
};

export const logout = () => (dispatch) => {
   dispatch(logoutAction());
   sessionStorage.removeItem("user");
};

export const getWorkouts = (user) => async (dispatch, getState) => {
   if (!getState().loading) {
      dispatch({
         type: types.SENDING_REQUEST,
         loading: true,
      });
   }
   if (getState().loading) nprogress.start();

   await dispatch(getWorkoutTypes(user.token, true));

   return fetch(`https://trainning-rest-api.herokuapp.com/v1/users/${user.id}/trainings`, {
      headers: {
         Authorization: user.token,
      },
   })
      .then(
         (resp) => {
            if (resp.ok) return resp.json();
            else {
               dispatch(networkError(resp));
               throw new Error(resp);
            }
         },
         (error) => {
            throw new Error(error);
         }
      )
      .then((workouts) => {
         nprogress.done();
         dispatch(getWorkoutsAction(workouts, getState().workoutTypes));
      })
      .catch((e) => {
         nprogress.done();
         console.log(e);
      });
};

export const getWorkoutTypes = (token, loading) => (dispatch, getState) => {
   if (!getState().loading) {
      dispatch({
         type: types.SENDING_REQUEST,
         loading: true,
      });
   }
   if (getState().loading) nprogress.start();

   return fetch(`https://trainning-rest-api.herokuapp.com/v1/training-types`, {
      headers: {
         Authorization: token,
      },
   })
      .then(
         (resp) => {
            if (resp.ok) return resp.json();
            else {
               dispatch(networkError(resp));
               throw new Error(resp);
            }
         },
         (error) => {
            throw new Error(error);
         }
      )
      .then((workoutTypes) => {
         if (workoutTypes.length) {
            dispatch(getWorkoutTypesAction(workoutTypes, loading));
         }
         if (!getState().loading) nprogress.done();
      })
      .catch((e) => {
         nprogress.done();
         console.log(e);
      });
};

export const deleteWorkout = (id) => (dispatch, getState) => {
   // if(!getState().loading){
   //    dispatch({
   //       type: types.SENDING_REQUEST,
   //       loading: true,
   //    });
   // }
   // if (getState().loading) nprogress.start();
   const user = getState().user;

   return fetch(`https://trainning-rest-api.herokuapp.com/v1/users/${user.id}/trainings/${id}`, {
      method: "DELETE",
      headers: {
         Authorization: user.token,
      },
   })
      .then(
         (resp) => {
            if (resp.ok) return resp.json();
            else {
               dispatch(networkError(resp));
               throw new Error(resp);
            }
         },
         (error) => {
            throw new Error(error);
         }
      )
      .then((resp) => {
         console.log(resp);
         dispatch(deleteWorkoutAction(id));
         if (!getState().loading) nprogress.done();
      })
      .catch((e) => {
         nprogress.done();
         dispatch(
            networkError({
               status: e.message || 0,
               statusText: "Something went wrong :(",
            })
         );
         console.log(e.message, e.name);
         console.error(e);
      });
};

export const addWorkout = ({ workoutType, minutes, weight }) => (dispatch, getState) => {

   const user = getState().user;
   const typeName = getState().workoutTypes.find((wt) => wt.id === workoutType).name;
   const newWorkout = {
      name: typeName,
      minutes: minutes,
      trainning_type: workoutType,
      user_id: user.id,
      weight: weight,
   };
   fetch(`https://trainning-rest-api.herokuapp.com/v1/trainings`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: user.token,
      },
      body: JSON.stringify(newWorkout),
   })
      .then(
         (resp) => {
            if (resp.ok) return resp.json();
            else {
               dispatch(networkError(resp));
               throw new Error({status: resp.status, message: resp.statusText || resp.message});
            }
         },
         (error) => {
            throw new Error(error);
         }
      )
      .then((data) => {
         if (data.status === 200) {
            dispatch(addWorkoutAction({ ...newWorkout, id: data.data.trainingID }));
         }
      })
      .catch((e) => {
         console.log(e)
         nprogress.done();
         dispatch(
            networkError({
               status: e.message || 0,
               statusText: "Something went wrong :(",
            })
         );
         console.log(e.message, e.name);
         console.error(e);
      });
};
