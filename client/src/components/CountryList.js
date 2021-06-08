import { useQuery, gql } from '@apollo/client';
import client from "./apollo.client";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardDeck, Modal} from "react-bootstrap";
import {getContinentData, getCountryData, getLanguageData} from './queries.js';
const FEED_QUERY = gql`
    query {
        getCountries {
            name
            emoji
            continent
        }
    }
`;

const CountryList = () => {
    const [show, setShow] = useState(false);
    const [country, setCountry] = useState({name: ""});
    const [data, setData] = useState([{}]);
    const [arr, setArr] = useState([1, 1, 1, 1, 1, 1]);
    const [params, setParams] = useState([
        "languages",
        "currency",
        "capital",
        "native",
        "phone",
        "continent"
    ])
    let country2 = "";
    const handleClose = () => setShow(false);
    const handleShow = async (item) => {
        const rawData = await getCountryData(item.name, params);
        let countryData = Object.assign({}, rawData);
        if (params.includes("languages")) {
            countryData.language = await getLanguageData(countryData.languages[0]);
        }
        if (params.includes("continent")) {
            countryData.continent = await getContinentData(countryData.continent);
        }
        setCountry(countryData);
        setShow(true);
    }


    let blueHex = "#1982FC";
    client
      .query({
          query: FEED_QUERY
      })
      .then((result) => {
          setData(result.data.getCountries);
          console.log(result);
      })
      .catch((error) => {
          console.log(error);
      });

    let toggledCard = {
        boxShadow: "1px 3px 1px #9E9E9E",
        textAlign: "center",
        backgroundColor: "#1982FC",
        cursor: "pointer",
        userSelect: "none",
        width: 200,
    }

    let nonToggledCard = {
        boxShadow: "1px 3px 1px #9E9E9E",
        textAlign: "center",
        backgroundColor: "#FFFFFF",
        cursor: "pointer",
        userSelect: "none",
        width: 200,
    }

    const changeParameters = (param, index) => {
        if (params.includes(param)) {
            let i = params.indexOf(param)
            params.splice(i, 1);
        } else {
            params.push(param);
        }
        let toggles = arr;
        if (toggles[index] === 0) {
            toggles[index] = 1
        } else {
            toggles[index] = 0
        }
        setArr([...toggles]);
        console.log(params)
    }

    return (
      <div style={{marginLeft: 15}}>
          <CardDeck style={{margin: 20, marginBottom: 30}}>
              <Card
                style={arr[0] === 1 ? toggledCard : nonToggledCard}
                onClick={() => {changeParameters("languages", 0); console.log(arr)}}
              >
                  <Card.Body>
                      Languages
                  </Card.Body>
              </Card>
              <Card
                style={arr[1] === 1 ? toggledCard : nonToggledCard}
                onClick={() => changeParameters("currency", 1)}
              >
                  <Card.Body>
                      Currency
                  </Card.Body>
              </Card>
              <Card
                style={arr[2] === 1 ? toggledCard : nonToggledCard}
                onClick={() => changeParameters("capital", 2)}
              >
                  <Card.Body>
                      Capital
                  </Card.Body>
              </Card>
              <Card
                style={arr[3] === 1 ? toggledCard : nonToggledCard}
                onClick={() => changeParameters("native", 3)}
              >
                  <Card.Body>
                      Native Name
                  </Card.Body>
              </Card>
              <Card
                style={arr[4] === 1 ? toggledCard : nonToggledCard}
                onClick={() => changeParameters("phone", 4)}
              >
                  <Card.Body>
                      Phone
                  </Card.Body>
              </Card>
              <Card
                style={arr[5] === 1 ? toggledCard : nonToggledCard}
                onClick={() => changeParameters("continent", 5)}
              >
                  <Card.Body>
                      Continent
                  </Card.Body>
              </Card>
          </CardDeck>
          {data.map(function(d, idx){
              return (
                <Card style={{width: 300, margin: 15, boxShadow: "1px 3px 1px #9E9E9E", cursor: "pointer"}} onClick={() => handleShow(d)}>
                    <Card.Header style={{fontSize: 40, padding: 5}}>
                        {d.emoji}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title style={{fontSize: 25}}>
                            {d.name}
                        </Card.Title>
                    </Card.Body>
                </Card>
              )
          })}
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>
                      {country.name + ' ' + country.emoji}
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  {country.native ? <>{"Native name: " + country.native}</> : <></>}
                  {country.capital ? <><br/>{"Capital: " + country.capital}</> : <></>}
                  {country.currency ? <><br/>{"Currency: " + country.currency}</> : <></>}
                  {country.language ? <><br/>{"Language(s): " + country.language.name}</> : <></>}
                  {country.continent ? <><br/>{"Continent: " + country.continent.name}</> : <></>}
                  {country.phone ? <><br/>{"Phone prefix: " + country.phone} </> : <></>}
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                      Close
                  </Button>
              </Modal.Footer>
          </Modal>
      </div>
    );
};

export default CountryList;
