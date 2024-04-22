import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Settlements = () => {
  const [settlements, setSettlements] = useState([]);

  useEffect(() => {
    const fetchAllSettlements = async () => {
      try {
        const res = await axios.get("http://localhost:8800/settlements");
        setSettlements(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSettlements();
  }, []);

  console.log(settlements);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/settlements/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container">
        <button className="addHome">
          <Link to="/add1" style={{ color: "inherit", textDecoration: "none" }}>
            Add new settlement
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
       <table className="settlements">
        <thead>
         <tr>
          <th scope="col">id</th>
          <th scope="col">building</th>
          <th scope="col">address</th>
         </tr>
        </thead>
        <tbody>
        {settlements && settlements.map((settlement) => (
          <tr key={settlement.id} className="settlement">
            <th scope="row">{settlement.id}</th>
            <td>{settlement.building}</td>
            <td>{settlement.address}</td>
            <button className="delete" onClick={() => handleDelete(settlement.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update1/${settlement.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </tr>
          ))}
        </tbody>
       </table>
    </div>
  );
};

export default Settlements;