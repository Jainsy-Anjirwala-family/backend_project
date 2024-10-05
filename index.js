import express from 'express';
const app = express();
import allquery from "./src/allquery.js";
import msg from './src/msgcode.js';
  
app.use(express.json());

app.get('/all', async (req, res) => {
    try {
        const result = await allquery.findAll(req.body);
        res.status(201).send(result)
    } catch (err) {
        res.status(500).send({ code: msg.msgCode.record_save_fail_500,  message: msg.responseMsg.record_save_fail_500});
    }
})

app.post('/save', async (req, res) => {
    try {
        const result = await allquery.create(req.body);
        res.status(201).send(result)
    } catch (err) {
        res.status(500).send({ code: msg.msgCode.record_save_fail_500,  message: msg.responseMsg.record_save_fail_500});
    }
});

app.post('/update', async (req, res) => {
    try {
        const result = await allquery.updateOne(req.body);
        res.status(201).send(result)
    } catch (err) {
        res.status(500).send({ code: msg.msgCode.record_save_fail_500,  message: msg.responseMsg.record_save_fail_500});
    }
});
  
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})