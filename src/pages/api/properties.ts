export interface ICreateProperty{
    userName: any;
    type: string;
}
export const getProperty = async({name}: {name:string}) => {
    const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8000/property/get',
                'Access-Control-Allow-Credentials': 'true' },
    body: JSON.stringify({ "userName": name})
    };
    let feedResponse = await fetch('http://localhost:8000/property/get', requestOptions)
    .then(response => {
    return response.json();
    });
    return feedResponse;
}

export const createProperty = async(props: ICreateProperty) => {
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8000/property/create',
                'Access-Control-Allow-Credentials': 'true' },
    body: JSON.stringify({ "userName": props.userName})
    };
    let feedResponse = await fetch('http://localhost:8000/property/create', requestOptions)
    .then(response => {
    return response.json();
    });
    return feedResponse;

}