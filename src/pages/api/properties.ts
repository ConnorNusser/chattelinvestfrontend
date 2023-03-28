import { propertyData } from "@/components/addproperty";

export const getProperty = async({name}: {name:string}) => {
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8000/property/getProperty',
                'Access-Control-Allow-Credentials': 'true' },
    body: JSON.stringify({ "owner": name})
    };
    let feedResponse = await fetch('http://localhost:8000/property/getProperty', requestOptions)
    .then(response => {
    return response.json();
    });
    return feedResponse;
}

export const createProperty = async(props: propertyData) => {
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8000/property/createProperty',
                'Access-Control-Allow-Credentials': 'true' },
    body: JSON.stringify({ "owner": props.owner, "address": props.address,"zipcode": props.zipcode, "type":props.type})
    };
    let feedResponse = await fetch('http://localhost:8000/property/createProperty', requestOptions)
    .then(response => {
    return response.json();
    });
    return feedResponse;

}