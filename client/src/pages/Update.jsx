import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [dormitory, setDormitory] = useState({
    namelat: "",
    namekir: "",
    studytype: "",
    country: "",
    sex: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const dormitoryId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setDormitory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/dormitories/${dormitoryId}`, dormitory);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Dormitory</h1>
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
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all dormitories</Link>
    </div>
  );
};

export default Update;