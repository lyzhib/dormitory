import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dormitories = () => {
  const [dormitories, setDormitories] = useState([]);

  useEffect(() => {
    const fetchAllDormitories = async () => {
      try {
        const res = await axios.get("http://localhost:8800/dormitories");
        setDormitories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllDormitories();
  }, []);

  console.log(dormitories);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/dormitories/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container">
        <button className="addHome">
          <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
            Add new dormitory
          </Link>
        </button>
        <div className="links">
          <Link className="link" to="/dormitories">
            <h6>Dormitories</h6>
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/settlements">
            <h6>Settlements</h6>
          </Link>
        </div>
      </div>
       <table className="dormitories">
        <thead>
         <tr>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
         </tr>
        </thead>
        <tbody>
        
        </tbody>
       </table>
    </div>
  );
};

export default Dormitories;