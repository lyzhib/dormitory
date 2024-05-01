import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add2 = () => {
  const [dormitory, setDormitory] = useState({
    dormitory: "",
    room: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setDormitory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/dormitories", dormitory);
      navigate("/dormitories");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New Dormitory</h1>
      <input
        type="text"
        placeholder="dormitory"
        name="dormitory"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="room"
        name="room"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/dormitories">See all dormitories</Link>
    </div>
  );
};

export default Add2;