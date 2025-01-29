import React, { useEffect ,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../redux/cartSlice";

import { pubSub } from "../utils/pubSub";
import '../style/IceCream.css'

const IceCream = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.icecream);
   const [hostIceCreamData,setHostIceCreamData] = useState()

  useEffect(() => {
    pubSub.publish("iceCreamStateChange", { count: data });
    pubSub.subscribe('hostIcrCreamCounter',handleHostIceCreamCounter)
    
  }, [data]);
  function handleHostIceCreamCounter(data){
    setHostIceCreamData(data.count)
  }
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
      <p className="paragraph">this data is coming from host {hostIceCreamData}</p>
    </div>
  );
};

export default IceCream;
