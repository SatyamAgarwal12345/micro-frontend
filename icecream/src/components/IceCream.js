import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../redux/cartSlice";

import { pubSub } from "../utils/pubSub";
import '../style/IceCream.css'

const IceCream = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.icecream);

  useEffect(() => {
    pubSub.publish("iceCreamStateChange", { count: data });
  }, [data]);

  function handleBuyIceCream() {
    dispatch(decrement());
  }

  function handleRestoreIceCream() {
    dispatch(increment());
  }
  console.log(pubSub);

  return (
    <div style={{ background: "aquamarine", padding: '30px', border: "30px solid blueviolet", borderRadius: "20px" }}>
      This is icecream component from cake micro front end
      <h1>No of icecream -
        {data}
      </h1>
      <button style={{
        background: "purple",
        borderRadius: "10px",
        padding: "6px",
        marginTop: "20px"
      }} onClick={handleBuyIceCream}>Buy IceCream</button><br/>
      <button style={{
        background: "purple",
        borderRadius: "10px",
        padding: "6px",
        marginTop: "20px"
      }} onClick={handleRestoreIceCream}>Restore IceCream</button>
    </div>
  );
};

export default IceCream;
