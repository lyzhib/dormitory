import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"test"
});

// If there is a auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.json("hello this is the backend");
})

app.get("/students", (req, res) => {
    const q = "SELECT * FROM students";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

app.get("/settlements", (req, res) => {
    const q = "SELECT * FROM settlements";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

app.post("/students", (req,res)=>{
    const q = "INSERT INTO students (`namelat`,`namekir`,`studytype`,`country`,`sex`) VALUES (?)"
    const values = [
        req.body.namelat,
        req.body.namekir,
        req.body.studytype,
        req.body.country,
        req.body.sex,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.post("/settlements", (req,res)=>{
  const q = "INSERT INTO settlements (`building`,`address`) VALUES (?)"
  const values = [
      req.body.building,
      req.body.address,
  ];

  db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
  });
});

app.delete("/students/:id", (req, res) => {
    const studentId = req.params.id;
    const q = " DELETE FROM students WHERE id = ? ";
  
    db.query(q, [studentId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.delete("/settlements/:id", (req, res) => {
    const settlementId = req.params.id;
    const q = " DELETE FROM settlements WHERE id = ? ";
  
    db.query(q, [settlementId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.put("/students/:id", (req, res) => {
    const studentId = req.params.id;
    const q = "UPDATE students SET `namelat`= ?, `namekir`= ?, `studytype`= ?, `country`= ?, `sex`=? WHERE id = ?";
  
    const values = [
      req.body.namelat,
      req.body.namekir,
      req.body.studytype,
      req.body.country,
      req.body.sex,
    ];
  
    db.query(q, [...values,studentId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
});

app.put("/settlements/:id", (req, res) => {
  const settlementId = req.params.id;
  const q = "UPDATE settlements SET `building`= ?, `address`= ? WHERE id = ?";

  const values = [
    req.body.building,
    req.body.address,
  ];

  db.query(q, [...values,settlementId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})