const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'}); // Has to be in us-east-1 to send sms
var sns = new AWS.SNS({apiVersion: '2010-03-31'});

exports.handler = async (event) => {
    const message = JSON.parse(event.Records[0].Sns.Message);

    var params = {
      Message: 'Batman, ' + message.villain + ' is, ' + message.description,
      PhoneNumber: process.env.batmanPhoneNumber
    };

    console.log(params);

    const snsPromise = await sns.publish(params).promise().catch((err) => { 
      console.error(err, err.stack);
      return err; 
    });
    
    console.log('SNS MessageId For SMS -> ' + snsPromise.MessageId);

    return;
};