import React, { useEffect, useState } from "react";
import "../style/Cake.css";
import { useSelector, useDispatch } from "react-redux";
import {decrement,increment} from '../redux/cartSlice'
import { pubSub } from "../utils/pubSub";



const Cake = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.cart);
  const [hostCakeData,setHostCakeData] = useState()
  
  
  function handlBuyCake() {
    dispatch(decrement());
  }
  function handleRestoreBuyCake() {
    dispatch(increment());
  }
  function handleHostCakeState(data){
    setHostCakeData(data.count)
  }
    useEffect(() => {
      pubSub.publish("cakeStateChange", { count: data });
      pubSub.subscribe('hostCakeState',handleHostCakeState)
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
      </button><br></br>
     <p className="paragraph">this data is coming from host {hostCakeData}</p>
    </div>
  );
};

export default Cake;
