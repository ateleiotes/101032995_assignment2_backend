const express = require('express');

const emodel = require('../models/EmployeeModel');

const app = express();
var cors = require('cors')
app.use(cors())

// Get employees

app.get('/api/v1/employees', async (req, res) => {
    const employee = await emodel.find({});
    console.log(JSON.stringify(employee))
    if(JSON.stringify(employee) == JSON.stringify([])){
        res.status(400).send({
            message: "No employees in database."
        })
        return
    }
    try{
        res.status(200).send({
            employee,
            message: "All Employee entry are fetched."
        })
    }catch(err){
        res.status(500).send(err);
    }
})

//POST Employee
app.post('/api/v1/employees', async (req, res) => {
    const employee = new emodel(req.body);

    try{
        await employee.save();
        res.status(201).send({
            employee,
            message: "A new Employee entry is created."
        })
    }catch(err){
        res.status(500).send(err);
    }
});

//GET Employee
app.get('/api/v1/employees/:Id', async (req, res) => {
    try{
        const employee = await emodel.findById(req.params.Id);

        if(!employee){
            res.status(404).send({
                message: "Employee entry not found."
            })
        }

        res.status(200).send({
            employee,
            message: "Employee entry is fetched."
        })
    }catch(err){
        res.status(500).send(err);
    }
});

//PUT Employee
app.put('/api/v1/employees/:Id', async (req, res) => {
    if(JSON.stringify(req.body) == JSON.stringify({})) {
        res.status(400).send({
            message: "Employee content can not be empty"
        });
    }
    try{
        const employee = await emodel.findByIdAndUpdate(req.params.Id, req.body);
        
        await employee.save();

        const updatedEmployee = await emodel.findById(req.params.Id);
        res.status(200).send({
            updatedEmployee,
            message: "Employee entry is updated."
        });
    }catch(err){
        res.status(500).send(err);
    }
});

//DELETE employee
app.delete('/api/v1/employees/:Id', async (req, res) => {
    try{
        const employee = await emodel.findById(req.params.Id);

        if(!employee){
            res.status(404).send({
                message: "Employee entry not found."
            })
        }
        await emodel.findByIdAndDelete(req.params.Id);

        res.status(204).send({
            message: "Employee entry is deleted."
        })
    }catch(err){
        res.status(500).send(err);
    }
});

module.exports = app;