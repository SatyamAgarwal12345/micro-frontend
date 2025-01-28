import React, { useState, useEffect } from "react";
import { pubSub } from "iceCreamMf/utils/pubSub"
import "../style/icecream.css"

const IcecreamCart = () => {
  const [iceCreamCount, setIceCreamCount] = useState();

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
  }, [iceCreamCount]);
  console.log(pubSub);
  function hostPublishHandler(){
      pubSub.publish('hostIceCreamState',{count:iceCreamCount})
  }
  return (
    <div className="cart-container-ice">
      <h2 className="cart-title-ice">Cart</h2>
      <p className="cart-item-ice">🍦 IceCream Count: <span className="item-count">{iceCreamCount}</span></p>
      {/* <button>buy</button><br></br>
      <button>restore</button> */}
    </div>

  );
};

export default IcecreamCart;
