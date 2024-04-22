import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [student, setStudent] = useState({
    namelat: "",
    namekir: "",
    studytype: "",
    country: "",
    sex: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/students", student);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New Student</h1>
      <input
        type="text"
        placeholder="namelat"
        name="namelat"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="namekir"
        name="namekir"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="studytype"
        name="studytype"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="country"
        name="country"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="sex"
        name="sex"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all students</Link>
    </div>
  );
};

export default Add;