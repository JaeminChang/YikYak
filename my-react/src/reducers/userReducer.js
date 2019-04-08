import { ADD_USER, GET_USER, LOGOUT_USER, UPDATE_USER } from "../actions/types";
import { loadState } from "../localStorage";

export default function userReducer(state, action) {
  switch (action.type) {
    case ADD_USER:
      return (state = { user: {} });
    case GET_USER:
      return {
        ...state,
        user: { userName: action.payload.userName, image: action.payload.image }
      };
    case UPDATE_USER:
      return (state = { user: {} });
    case LOGOUT_USER:
      return (state = { user: {} });
    default:
      return loadState();
  }
}
