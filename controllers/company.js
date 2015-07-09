var Company = require('../models/company');

exports.postCompany = function(req, res) {
        
        var company = new Company();      
        company.name = req.body.name;
        company.email = req.body.email; 
        console.log('Posting Company -> name:' + req.body.name + ' email: ' +req.body.email);

        company.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Company created!' });
        })
     };

exports.getCompanies = function(req, res) {
        console.log('Getting companies!!!');
        Company.find(function(err, companies) {
            if (err)
                res.send(err);

            res.json(companies);
        });
        
    };

exports.getCompany = function(req, res) {
        console.log('Get company: ' + req.params.company_id);
        Company.findById(req.params.company_id, function(err, company) {
            if (err)
                res.send(err);
            res.json(company);
        });
    };

exports.updateCompany = function(req, res) {
        console.log('Update company: ' + req.params.company_id);
        Company.findById(req.params.company_id, function(err, company) {

            if (err)
                res.send(err);
            console.log('Company:' + company.name)
            company.name = req.body.name;
            company.email = req.body.email;

            company.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Company updated!' });
            });
            });
       };
       
exports.deleteCompany = function(req, res) {
        console.log('Delete company: ' + req.params.company_id);
        Company.remove({
            _id: req.params.company_id
        }, function(err, company) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    };