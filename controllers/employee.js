var Employee = require('../models/employee');

exports.postEmployee = function(req, res) {
        
        var employee = new Employee();      // create a new instance of the Employee model
        employee.name = req.body.name;  // set the employee name (comes from the request)
        employee.surname = req.body.surname; 
        console.log('Employee name:' + req.body.name + ' ' +req.body.surname);

        // save the employee and check for errors
        employee.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Employee created!' });
        })
     };

exports.getEmployees = function(req, res) {
        Employee.find(function(err, employees) {
            if (err)
                res.send(err);

            res.json(employees);
        });
        
    };

exports.getEmployee = function(req, res) {
        Employee.findById(req.params.employee_id, function(err, employee) {
            if (err)
                res.send(err);
            res.json(employee);
        });
    };

exports.updateEmployee = function(req, res) {

        // use our employee model to find the employee we want
        Employee.findById(req.params.employee_id, function(err, employee) {

            if (err)
                res.send(err);

            employee.name = req.body.name;
            employee.surname = req.body.surname;


            // save the employee
            employee.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Employee updated!' });
            });
            });
       };

exports.deleteEmployee = function(req, res) {
        Employee.remove({
            _id: req.params.employee_id
        }, function(err, employee) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    };