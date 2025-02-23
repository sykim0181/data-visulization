import { useContext } from "react";
import DateContext from "../context/DateContext";

const useDateContext = () => {
  const context = useContext(DateContext);

  if (!context) {
    throw new Error("The context is currently null");
  }

  return {
    ...context
  };
};

export default useDateContext;