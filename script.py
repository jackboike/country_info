import json
from graphqlclient import GraphQLClient


with open('countries.json') as f:
    data = json.load(f)
for k, v in data.items():
    query = """
    mutation ($input:CountryInput){
        addCountry(input: $input){
            name
            native
            code
        }
    }
    """
    v['code'] = k
    v.pop('emojiU')
    variables = {'input': v}

    print(v, flush=True)
    client = GraphQLClient('http://localhost:8000/graphql')
    client.execute(query, variables)
