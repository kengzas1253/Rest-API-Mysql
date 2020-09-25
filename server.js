const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mydb123456;",
    database: "employee"
  });


app.get("/users", (req, res) => {
  con.connect((err)=> {
    con.query("SELECT * FROM user", (err, result, fields)=> {
      if (err) throw err;
      res.json(result);
    });
  });
});
app.get('/users/:id', (req, res) => {
  let id=req.params.id;
  con.connect((err)=> {
    con.query(`SELECT * FROM user WHERE ID = ${id}`, (err, result)=> {
      if (err) throw err;
      res.json(result);
    });
  });
})
app.post('/users', (req, res)=> {
  let sql = `INSERT INTO user(ID, Name,Lastname,Tel) VALUES (?)`;
  let values = [
    req.body.ID,
    req.body.Name,
    req.body.Lastname,
    req.body.Tel
  ];
  con.query(sql, [values], (err, data, fields)=> {
    if (err) throw err;
    res.json({message: "New user added successfully"})
  })
});
app.put('/users/:id',(req,res)=>{
  let id=req.params.id;
  let Name=req.body.Name;
  let Lastname=req.body.Lastname;
  let Tel=req.body.Tel;
  let sql = 
  `UPDATE user SET Name = '${Name}', 
  Lastname ='${Lastname}', Tel =${Tel} 
  WHERE ID = ${id}`;
  con.query(sql, (err, data, fields)=> {
    if (err) throw err;
    res.json({message: "Update user successfully"})
  })
});
app.delete('/users/:id',(req,res)=>{
  let id=req.params.id;
  let sql =  `DELETE FROM user WHERE id = ${id}`;
  con.query(sql, (err, data, fields)=> {
    if (err) throw err;
    res.json({message: "Delete user successfully"})
  })
});
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}.`);
});