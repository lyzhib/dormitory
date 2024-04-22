import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update1 = () => {
  const [settlement, setSettlement] = useState({
    building: "",
    address: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const settlementId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setSettlement((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/settlements/${settlementId}`, settlement);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Settlement</h1>
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
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/settlements">See all settlements</Link>
    </div>
  );
};

export default Update1;