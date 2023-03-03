const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const app = express()
const port = process.env.PORT || 4000


// mongodb+srv://gabrielsmijoler:<password>@graphqlcluster.pxte4z4.mongodb.net/?retryWrites=true&w=majority

const schema = require('./schema/schema')
const testschema = require('./schema/types_schema')
const mongoose = require("mongoose")
const cors = require("cors")

app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
      graphiql: true,
      schema: schema
    }),
  );
  
mongoose.connect(`mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@graphqlcluster.pxte4z4.mongodb.net/${process.env.mongoDataBase}?retryWrites=true&w=majority`
).then(() => {
  app.listen(port,  ()=>{
      console.log('listening for requests' + port)
  })
}).catch((e) => console.log("Error::" + e))