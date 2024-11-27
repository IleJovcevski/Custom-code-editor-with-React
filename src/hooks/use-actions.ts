import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

export const useActions = () => {
  //provide access to dispaatch function via useDispatch
  const dispatch = useDispatch();

  //bind action creators to the dispatch function
  return bindActionCreators(actionCreators, dispatch);
};
