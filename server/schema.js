import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from './resolvers';

const typeDefs = `
    type Country {
        code: String
        name: String
        native: String
        phone: String
        continent: String
        capital: String
        currency: String
        languages: [String]
        emoji: String
    }
    
    type Continent {
        code: String!
        name: String!
    }
    
    type Language {
        code: String
        name: String
        native: String
    }
    
    input ContinentInput {
        code: String!
        name: String!
    }
    
    input CountryInput {
        code: String
        name: String
        native: String
        phone: String
        continent: String
        capital: String
        currency: String
        languages: [String]
        emoji: String
    }
    
    input LanguageInput {
        code: String
        name: String
        native: String
    }
    
    type Query {
        getCountry(name: String): Country
        getCountries: [Country]
        getContinents: [Continent]
        getContinent(code: String): Continent
        getLanguages: [Language]
        getLanguage(code: String): Language
    }
    
    type Mutation {
        addContinent(input: ContinentInput): Continent
        addCountry(input: CountryInput): Country
        addLanguage(input: LanguageInput): Language
    }
`;


const schema = makeExecutableSchema({ typeDefs, resolvers});

export default schema;
