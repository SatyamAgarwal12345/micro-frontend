import React, { useState, useEffect } from "react";
import { pubSub } from "cakeMf/utils/pubSub"
import "../style/cake.css"

const CakeCart = () => {
  const [cakeCount, setCakeCount] = useState();
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
  }, [cakeCount]);

  function hostPublishHandler(){
    pubSub.publish('hostCakeState',{count:cakeCount})
  }
  console.log(pubSub);
  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      <p className="cart-item">🎂 Cake Count: <span className="item-count">{cakeCount}</span></p>
      {/* <button onClick={hostPublishHandler}>buy</button><br></br>
      <button>restore</button> */}
    </div>

  );
};

export default CakeCart;
