import React, { useEffect } from "react";
import "../style/Cake.css";
import { useSelector, useDispatch } from "react-redux";
import {decrement,increment} from '../redux/cartSlice'
import { pubSub } from "../utils/pubSub";



const Cake = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.cart);
  
  function handlBuyCake() {
    dispatch(decrement());
  }
  function handleRestoreBuyCake() {
    dispatch(increment());
  }
    useEffect(() => {
      pubSub.publish("cakeStateChange", { count: data });
    }, [data]);
  return (
    <div className="container">
      This is cake component from cake micro front end
      <h1>No of Cake - 
        {data}
        </h1>
      <button className="button" onClick={handlBuyCake}>
        Buy Cake
      </button>
      <br></br>
      <button className="button" onClick={handleRestoreBuyCake}>
        Restore
      </button>
    </div>
  );
};

export default Cake;
