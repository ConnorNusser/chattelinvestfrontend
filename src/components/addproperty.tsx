import { Button, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getProperty } from '@/pages/api/properties';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AddPropertyForm from './addpropertyForm';
export interface propertyData {
    key?: number
    image: string
    owner: string
    address: string
    zipcode: number
    type: number

}
const AddProperty = () => {
    async function getMappedProperties(userName: any){
        const propertyData = await getProperty({name: userName})
        if(propertyData.length > 0){
            var localProperties: propertyData[] = []
            for (let result of propertyData){
                if(result.owner && result.address && result.zipcode){
                    var localPropertyObj: propertyData = {
                        key: result.property_id,
                        image: result.url_link,
                        owner: result.owner,
                        address: result.address,
                        zipcode: result.zipcode,
                        type: result.commerical_type,
                    }
                    localProperties.push(localPropertyObj);
                }
            }
            return localProperties;
        }else{
            return []
        }

    }
    const { data: session} = useSession();
    var [properties, setProperties] = useState<propertyData[] | []>([])
    useEffect(() => {
            const fetchData = async () => {
                const data = await getMappedProperties(session?.user?.name);
                setProperties(data);
              }
            
              // call the function
              fetchData()
    }, [session]);
  return (
    <>
    <AddNewPropertyCard/>
    <hr/>
    <Container>
    <Row xs={1} md={2} lg = {4} className="justify-content-md-center">
        {properties.map((object, i) => <Propertycard key={object.key} image={object.image} owner={object.owner} address={object.address} zipcode={object.zipcode} type={object.type} />)}
    </Row>
    </Container>
    </>
  );
}
const Propertycard = (propInfo: propertyData) => {
    return (
        <Col>
        <Card style = {{ width: '18rem', alignContent:'center'}}>
          <Card.Img variant="top" src={propInfo.image} />
          <Card.Body>
            <Card.Title>{propInfo.address}</Card.Title>
            <Card.Subtitle>Property Owner: {propInfo.owner}</Card.Subtitle>
            <Card.Text>
                ZipCode: {propInfo.zipcode}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )

}
enum propertyTypeEnum{
  Commerical = 0,
  Residental = 1

}
const AddNewPropertyCard = () => {
    function propertyStateChange(type: number){
        setPropertyType(type);
        setShow(true);
    }
    const { data: session} = useSession();
    const [show, setShow] = useState(false);
    const [propertyType, setPropertyType] = useState(propertyTypeEnum.Commerical);
    const [username, setUserName] = useState<String | null>();

    useEffect(() => {
      setUserName(session?.user?.name)
},[session])
    return (
        <div style={{justifyContent:'center', display: 'flex', textAlign:'center'}}>
        <>
        {show? <AddPropertyForm userName={username} type = {propertyType}/> : null}
        </>
        <Card style={{ width: '36rem', paddingInline:'20px'}}>
        <Card.Body>
          <Card.Title>Portfolio Management</Card.Title>
            <Button size='sm' onClick={() => propertyStateChange(propertyTypeEnum.Commerical)
            }>Add Property: Commerical</Button>
            <Button size='sm' onClick={() => propertyStateChange(propertyTypeEnum.Residental)
            }>Add Property: Residental</Button>
        </Card.Body>
      </Card>
      </div>
    )
}
export default AddProperty;