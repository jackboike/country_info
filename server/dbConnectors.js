import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const mongo_password = process.env.MONGO_PASSWORD

mongoose.connect(`mongodb+srv://jackboike:${mongo_password}@cluster0.kij4v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const countrySchema = new mongoose.Schema({
    name: {
        type: String
    },
    native: {
        type: String
    },
    phone: {
        type: String
    },
    continent: {
        type: String
    },
    capital: {
        type: String
    },
    currency: {
        type: String
    },
    languages: [{
        type: String
    }],
    code: {
        type: String
    },
    emoji: {
        type: String
    }
});

const continentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    code: {
        type: String,
    },
    native: {
        type: String,
    }
});

// Mongo DB
const Countries = mongoose.model('countries', countrySchema);
const Continents = mongoose.model('continents', continentSchema);
const Languages = mongoose.model('languages', languageSchema);

export { Countries };
export { Continents };
export { Languages };
