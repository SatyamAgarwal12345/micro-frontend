import React, { useState, useEffect } from "react";
import { pubSub } from "iceCreamMf/utils/pubSub"
import "../style/icecream.css"

const IcecreamCart = () => {
  const [iceCreamCount, setIceCreamCount] = useState();
    const [counter, setCounter] = useState(0);
  

  useEffect(() => {
    const handleIceCreamStateChange = (data) => {
      console.log("Cart received IceCream data:", data);
      setIceCreamCount(data.count);
    };
    pubSub.subscribe("iceCreamStateChange", handleIceCreamStateChange);
    hostPublishHandler()
    return () => {
      pubSub.unsubscribe("iceCreamStateChange", handleIceCreamStateChange);
    };
  }, [iceCreamCount,counter]);
  console.log(pubSub);
  function hostPublishHandler(){
      pubSub.publish('hostIcrCreamCounter',{count:counter})
  }
  return (
    <div className="cart-container-ice">
      <h2 className="cart-title-ice">Cart</h2>
      <p className="cart-item-ice">🍦 IceCream Count: <span className="item-count">{iceCreamCount}</span></p>
      <button onClick={()=>setCounter((prevCount)=>prevCount+1)}>Inc</button><br></br>
      <button onClick={()=>setCounter((prevCount)=>prevCount-1)}>Dec</button>
    </div>

  );
};

export default IcecreamCart;
