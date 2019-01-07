const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({
    region: process.region,
    apiVersion: '2012-08-10'
});

exports.handler = async (event) => {
    const params = {
        TableName: process.env.VILLAINS_DYNAMODB_TABLE,
        Key: {
                "name": {
                    S: event.name
                }
            },
    };
    
    return new Promise((resolve, reject) => {
        dynamodb.deleteItem(params, function (err, data) {
            if(err) {
                console.error(err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
