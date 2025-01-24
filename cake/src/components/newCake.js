import React from "react";
import Cake from "./Cake";
import { Provider } from "react-redux";
import store from "../redux/store";


const NewCake = () => {
  return (
    <Provider store={store}>
      <Cake />
    </Provider>
  );
};

export default NewCake;
