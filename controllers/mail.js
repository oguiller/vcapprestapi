var jade = require('jade')
	, nodemailer = require('nodemailer')
    , fs = require('fs');

var	transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'regual.amsterdam@gmail.com',
        pass: 'regual2015'
    }
});

var sendEmail = function(template, data) {
		var mailOptions = {
			from: 'Dmissi Electro <info@dmissielectro.nl>',
			to: 'Rachid Aouragh <insgrf00@gmail.com>',
			subject: 'Test VCA',
			attachments: data.attachments,
			html: template
		};

		transporter.sendMail(mailOptions, function(error){
	    	if(error){
	        	res.send(error);
	   		} else {
	        	console.log('Message sent: ');
	    	}
		});
};

var loopAttachments = function (attachments) {

	var data = []
	for(var i = 0; i < attachments.length; i++) {
		data.push(i.src);
	}
	return data;

};

exports.send = function(req, res) {
	console.log("MailController -> Send");
	
	var data = req.body;
	console.log(req.body);	
	
	var pictures = loopAttachments(data.attachments);
	var template = process.cwd() + '/templates/index.jade';

	fs.readFile(template, 'utf8', function(error, file) {

		if(error) {
			console.log('ERROR ' + error);
		} else {
			var compiledTemp = jade.compile(file);
			var htmlTemplate = compiledTemp(data);
			sendEmail(htmlTemplate, data);
			res.send(true);
			console.log('Emails sent!!!');
		}
	 });
};