const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: process.region,
    apiVersion: '2012-08-10'
});

exports.handler = async (event) => {
    console.log(event.powers);
    
    const params = {
        TableName: process.env.VILLAINS_DYNAMODB_TABLE,
        Item: { ...event}
    };
    
    console.log(params);

    return new Promise((resolve, reject) => { 
        dynamodb.put(params, function (err, data) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(data);
                resolve(data);
            }
        });
    });
};
