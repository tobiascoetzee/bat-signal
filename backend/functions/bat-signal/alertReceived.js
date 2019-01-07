const uuidv1 = require('uuid/v1');
const AWS = require('aws-sdk');
var sns = new AWS.SNS({apiVersion: '2010-03-31'});

exports.handler = async (event) => {
    event.referenceId = uuidv1();
  
    const message = JSON.stringify(event);
  
    var params = {
      Message: message,
      TopicArn: process.env.snsArn
    };

    const snsPromise = await sns.publish(params).promise().catch((err) => { 
      console.error(err, err.stack);
      return err; 
    });
    
    console.log('SNS MessageId For Request -> ' + snsPromise.MessageId);
    
    return {"referenceId": event.referenceId};
};