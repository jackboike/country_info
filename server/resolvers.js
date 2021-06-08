import {Continents, Countries, Languages} from "./dbConnectors"
import _ from "lodash";
// Resolver map



export const resolvers = {
    Query: {
        getCountry: (root, { name }) => {
            return new Promise(( resolve, object) => {
                Countries.findOne({name: name}, function (err, country) {
                    if (err) _.reject(err)
                    else resolve(country)
                });
            })
        },
        getContinent: (root, { code }) => {
            return new Promise(( resolve, object) => {
                Continents.findOne({code: code}, function (err, continent) {
                    if (err) _.reject(err)
                    else resolve(continent)
                });
            })
        },
        getLanguage: (root, { code }) => {
            return new Promise(( resolve, object) => {
                Languages.findOne({code: code}, function (err, language) {
                    if (err) _.reject(err)
                    else resolve(language)
                });
            })
        },
        getCountries: () => Countries.find(),
        getContinents: () => Continents.find(),
        getLanguages: () => Languages.find()

    },
    Mutation: {
        addContinent: (_, {input}) => {
            return new Promise(( resolve, object) => {
                Continents.create({code: input.code, name: input.name}, function (err, obj) {
                    if (err) _.reject(err)
                    else return resolve(object)
                });
            })
        },
        addCountry: (_, {input}) => {
            return new Promise(( resolve, object) => {
                Countries.create({code: input.code, name: input.name, native: input.native, phone: input.phone, capital: input.capital, currency: input.currency, languages: input.languages, emoji: input.emoji, continent: input.continent}, function (err, obj) {
                    if (err) _.reject(err)
                    else return resolve(obj)
                });
            })
        },
        addLanguage: (_, {input}) => {
            return new Promise(( resolve, object) => {
                Languages.create({code: input.code, name: input.name, native: input.native}, function (err, obj) {
                    if (err) _.reject(err)
                    else return resolve(obj)
                });
            })
        },
    }
};



export default resolvers;