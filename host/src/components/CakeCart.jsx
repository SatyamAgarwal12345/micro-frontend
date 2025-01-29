import React, { useState, useEffect } from "react";
import { pubSub } from "cakeMf/utils/pubSub"
import "../style/cake.css"

const CakeCart = () => {
  const [cakeCount, setCakeCount] = useState();
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const handleCakeStateChange = (data) => {
      console.log("Cart received Cake data:", data);
      setCakeCount(data.count);
    };
    pubSub.subscribe("cakeStateChange", handleCakeStateChange);
    hostPublishHandler()
    return () => {
      pubSub.unsubscribe("cakeStateChange", handleCakeStateChange);
    };
  }, [cakeCount,counter]);

  function hostPublishHandler(){
    pubSub.publish('hostCakeCounter',{count:counter})
  }
  console.log(pubSub);
  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      <p className="cart-item">🎂 Cake Count: <span className="item-count">{cakeCount}</span></p>
      <button  onClick={()=>setCounter((prevCount)=>prevCount+1)}>Inc</button><br></br>
      <button onClick={()=>setCounter((prevCount)=>prevCount-1)}>Dec</button>
    </div>

  );
};

export default CakeCart;
