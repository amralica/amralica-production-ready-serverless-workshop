//requiring only the client we need
const DocumentClient = require('aws-sdk/clients/dynamodb').DocumentClient
const dynamodb = new DocumentClient()

// defaultResults [optional] : how many restaurants to return
const defaultResults = process.env.defaultResults || 8
// restaurants_table [required] : name of the restaurants DynamoDB table
const tableName = process.env.restaurants_table

const getRestaurants = async (count) => {
  console.log(`fetching ${count} restaurants from ${tableName}...`)
  const req = {
    TableName: tableName,
    Limit: count
  }

  const resp = await dynamodb.scan(req).promise()
  console.log(`found ${resp.Items.length} restaurants`)
  return resp.Items
}

module.exports.handler = async (event, context) => {  
  const restaurants = await getRestaurants(defaultResults)
  const response = {
    statusCode: 200,
    body: JSON.stringify(restaurants)
  }

  return response
}