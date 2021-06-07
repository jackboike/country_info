import express from 'express';

import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
const cors = require('cors')
const app = express();

app.get('/', (req, res) => {
    res.send("Graphql is amazing");
})

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))

app.listen(8000, () => console.log('Running on server post localhost:8080/graphql'));


