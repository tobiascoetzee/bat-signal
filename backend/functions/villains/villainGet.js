const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({
    region: process.region,
    apiVersion: '2012-08-10'
});

exports.handler = (event) => {
    const params = {
        TableName: process.env.VILLAINS_DYNAMODB_TABLE,
        Key: {
                "name": {
                    S: event.name
                }
            },
    };

    return new Promise((resolve, reject) => {
        dynamodb.getItem(params, function (err, data) {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                const items = [{
                            name: data.Item.name.S,
                            realName: data.Item.realName.S,
                            characterType: data.Item.characterType.S,
                            gender: data.Item.gender.S,
                            description: data.Item.description.S,
                            imageUrl: data.Item.imageUrl.S,
                            powers: data.Item.powers.L.map((power)=>{return power.S})
                        }]
                
                return resolve(items);
            }
        });
    });
};
