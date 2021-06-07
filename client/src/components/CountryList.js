import { useQuery, gql } from '@apollo/client';
import client from "./apollo.client";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardDeck} from "react-bootstrap";
const FEED_QUERY = gql`
        query {
            getCountries {
                name
                emoji
            }
        }
`;

const CountryList = () => {
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
        backgroundColor: "#1982FC"
    }

    let nonToggledCard = {
        boxShadow: "1px 3px 1px #9E9E9E",
        textAlign: "center",
        backgroundColor: "#FFFFFF"
    }

    const changeParameters = (param, index) => {
        if (params.includes(param)) {
            let i = params.indexOf(param)
            params.splice(i, 1);
        } else {
            params.push(param);
        }
        // setToggles(arr => [...arr, toggles[index] === 0 ? 1 : 0)
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
            <CardDeck style={{margin: 20}}>
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
                        Native
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
                    <Card style={{width: 300, margin: 15, boxShadow: "1px 3px 1px #9E9E9E"}}>
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
        </div>
    );
};


export default CountryList;
