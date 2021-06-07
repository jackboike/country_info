import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import CountryList from "./components/CountryList";


function App() {
  return (
    <CountryList/>
  );
}





export default App;
