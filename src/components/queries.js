import client from "./apollo.client";
import {gql} from "@apollo/client";


export const getCountryData = async (name, parameters) =>  {
    let params = "";
    for (let i = 0; i < parameters.length; i++) {
        params += parameters[i] + '\n';
    }

    const GET_COUNTRY = gql`
        query {
            getCountry(name: "${name}") {
                name
                emoji
                code
                ${params}
            }
        }
    `;

    return client
      .query({
          query: GET_COUNTRY
      })
      .then((result) => {
          console.log(result.data.getCountry.name);
          return result.data['getCountry'];
      })
      .catch((error) => {
          console.log(error);
      });
}


export const getLanguageData = async (code) =>  {

    const GET_LANGUAGE = gql`
        query {
            getLanguage(code: "${code}") {
                name
                native
            }
        }
    `;

    return client
        .query({
            query: GET_LANGUAGE
        })
      .then((result) => {
          console.log(result)
          return result.data['getLanguage'];
      })
      .catch((error) => {
          console.log(error);
      });
}

export const getContinentData = async (code) =>  {

    const GET_CONTINENT = gql`
        query {
            getContinent(code: "${code}") {
                name
            }
        }
    `;

    console.log(code)

    return client
      .query({
          query: GET_CONTINENT
      })
      .then((result) => {
          console.log(result)
          return result.data['getContinent'];
      })
      .catch((error) => {
          console.log(error);
      });
}
