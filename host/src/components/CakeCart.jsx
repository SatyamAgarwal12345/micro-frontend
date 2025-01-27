import React, { useState, useEffect } from "react";
import { pubSub } from "cakeMf/utils/pubSub"
import "../style/cake.css"

const CakeCart = () => {
  const [cakeCount, setCakeCount] = useState(10);

  useEffect(() => {
    const handleCakeStateChange = (data) => {
      console.log("Cart received Cake data:", data);
      setCakeCount(data.count);
    };
    pubSub.subscribe("cakeStateChange", handleCakeStateChange);
    return () => {
      pubSub.unsubscribe("cakeStateChange", handleCakeStateChange);
    };
  }, []);
  console.log(pubSub);
  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      <p className="cart-item">🎂 Cake Count: <span className="item-count">{cakeCount}</span></p>
      {/* <button>buy</button><br></br>
      <button>restore</button> */}
    </div>

  );
};

export default CakeCart;
