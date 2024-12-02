import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { useMemo } from "react";

export const useActions = () => {
  //provide access to dispaatch function via useDispatch
  const dispatch = useDispatch();

  //memoize actions
  return useMemo(() => {
    //bind action creators to the dispatch function
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
