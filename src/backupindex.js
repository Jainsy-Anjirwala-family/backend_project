const express = require('express')
const { Pool } = require('pg');
const app = express();
const port = 8080

const selectQuery = `SELECT * FROM persons;`;
const insertQuery = `INSERT INTO persons (pid, pname) VALUES ($1, $2) RETURNING cid;`;
const updateQuery = `UPDATE persons SET pid = $2, pname = $3 WHERE cid = $1 RETURNING *;`;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'newdb',
    password: 'jenu123',
    port: 5432,
  });
  
  app.use(express.json());

app.get('/all', async (req, res) => {
  try {
    const result = await pool.query(selectQuery);
    res.status(201).send({ message: 'New Album created', data: result.rows});
  } catch (err) {
    console.error(err);
    res.status(500).send('some error has occured');
  }
})

app.post('/albums', async (req, res) => {
    try {
      if(req.body && req.body.pid && req.body.pname){
        const result = await pool.query(insertQuery, [req.body.pid,req.body.pname]);
        if(result && result.rows && result.rows.length > 0){
          const datas = await pool.query(selectQuery);
          res.status(201).send({code:'RECORD_ADD_200', message: 'Record Add Successfully', data: datas.rows});
        }
      }
      else {
        res.status(400).send({code:'RECORD_FAIL_400', message: 'Fail to Add Record'});
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({code:'RECORD_FAIL_500', message: 'Fail to Add Record'});
    }
});

app.post('/albums/update', async (req, res) => {
    try {
      if(req.body && req.body.pid && req.body.pname && req.body.cid){
        const result = await pool.query(updateQuery, [+req.body.cid,req.body.pid,req.body.pname]);
        if(result && result.rows && result.rows.length > 0){
          const datas = await pool.query(selectQuery);
          res.status(201).send({code:'RECORD_ADD_200', message: 'Record update Successfully', data: datas.rows});
        }
      }
      else {
        res.status(400).send({code:'RECORD_FAIL_400', message: 'Fail to update Record'});
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({code:'RECORD_FAIL_500', message: 'Fail to update Record'});
    }
});
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})