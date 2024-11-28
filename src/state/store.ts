import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ActionType } from "./action-types";
import { CellType } from "../enums";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
  type: ActionType.INSERT_CEL_AFTER,
  payload: {
    id: null,
    type: CellType.TEXT,
  },
});

store.dispatch({
  type: ActionType.INSERT_CEL_AFTER,
  payload: {
    id: null,
    type: CellType.CODE,
  },
});

store.dispatch({
  type: ActionType.INSERT_CEL_AFTER,
  payload: {
    id: null,
    type: CellType.TEXT,
  },
});

store.dispatch({
  type: ActionType.INSERT_CEL_AFTER,
  payload: {
    id: null,
    type: CellType.CODE,
  },
});

console.log(store.getState());
