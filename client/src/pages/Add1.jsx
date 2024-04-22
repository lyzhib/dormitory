import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add1 = () => {
  const [settlement, setSettlement] = useState({
    building: "",
    address: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSettlement((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/settlements", settlement);
      navigate("/settlements");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New Settlement</h1>
      <input
        type="text"
        placeholder="building"
        name="building"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="address"
        name="address"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/settlements">See all settlements</Link>
    </div>
  );
};

export default Add1;