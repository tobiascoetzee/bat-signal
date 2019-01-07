const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({
    region: process.region,
    apiVersion: '2012-08-10'
});

const params = {
    TableName: process.env.VILLAINS_DYNAMODB_TABLE
};

exports.handler = (event) => {
    return new Promise((resolve, reject) => {
        dynamodb.scan(params, function (err, data) {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                const items = data.Items.map(
                    (dataField) => {
                        return {
                            name: dataField.name.S,
                            realName: dataField.realName.S,
                            characterType: dataField.characterType.S,
                            gender: dataField.gender.S,
                            description: dataField.description.S,
                            imageUrl: dataField.imageUrl.S,
                            powers: dataField.powers.L.map((power) => {
                                return power.S
                            })
                        };
                    }
                );
                return resolve(items);
            }
        });
    })
};