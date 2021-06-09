import express from 'express';

import { graphqlHTTP } from 'express-graphql';
import schema from './server/schema';
import * as path from "path";
import * as bodyParser from "body-parser";
const cors = require('cors')
const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use('/graphql/', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))

app.use(express.static(path.join(__dirname + '/build')));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

// Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log('Running on server post localhost:8080/graphql'));


