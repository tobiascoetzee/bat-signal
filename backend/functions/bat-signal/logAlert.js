const AWS = require('aws-sdk');
var sns = new AWS.SNS({apiVersion: '2010-03-31'});
const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: process.region,
    apiVersion: '2012-08-10'
});

exports.handler = async (event) => {
    const message = event.Records[0].Sns.Message;
    const alert = JSON.parse(message);
    
    const dynamodbParams = {
        TableName: process.env.BAT_SIGNAL_DYNAMODB_TABLE,
        Item: { ...alert}
    };
    
    return new Promise((resolve, reject) => { 
        dynamodb.put(dynamodbParams, function (err, data) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(data);
                
                var snsParams = {
                  Message: message,
                  TopicArn: process.env.snsArn
                };
            
                const snsPromise = sns.publish(snsParams).promise();
                resolve(snsPromise);
            }
        });
    });
};
