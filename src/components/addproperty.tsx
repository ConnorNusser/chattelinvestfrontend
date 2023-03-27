import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getProperty, createProperty } from '@/pages/api/properties';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
interface propertyData {
    image: string
    owner: string
    address: string
    zipcode: string

}
const AddProperty = () => {
    async function getMappedProperties(userName: any){
        const propertyData = await getProperty({name: userName})
        if(propertyData.length > 0){
            var localProperties: propertyData[] = []
            for (let result of propertyData){
                if(result.image && result.owner && result.address && result.zipcode){
                    var localPropertyObj: propertyData = {
                        image: result.image,
                        owner: result.owner,
                        address: result.address,
                        zipcode: result.zipcode
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
    <Row xs={1} md={2} className="g-4">
        {properties.map((object, i) => <Propertycard image={object.image} owner={object.owner} address={object.address} zipcode={object.zipcode} />)}
    </Row>
    </>
  );
}
const Propertycard = (propInfo: propertyData) => {
    return (
        <Col>
        <Card>
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
const AddNewPropertyCard = () => {
    const { data: session} = useSession();
    return (
        <div style={{justifyContent:'center', display: 'flex', textAlign:'center'}}>
        <Card style={{ width: '36rem', paddingInline:'20px'}}>
        <Card.Body>
          <Card.Title>Portfolio Management</Card.Title>
            <Button size='sm' onClick={() => createProperty({
                userName: session?.user?.name,
                type: 'commerical'
            })}>Add Property: Commerical</Button>
            <Button size='sm' onClick={() => createProperty({
                userName: session?.user?.name,
                type: 'residental'
            })}>Add Property: Residental</Button>
        </Card.Body>
      </Card>
      </div>
    )
}
export default AddProperty;