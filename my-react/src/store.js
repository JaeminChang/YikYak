import { createStore, compose, applyMiddleware } from "redux";
import userReducer from "../src/reducers/userReducer";
import thunk from "redux-thunk";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

const middleware = [thunk];

const persistedState = loadState();

const Store = createStore(
  userReducer,
  persistedState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

Store.subscribe(
  throttle(() => {
    saveState({
      user: Store.getState().user
    });
  }, 1000)
);

export default Store;
