import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { propertyData } from './addproperty';
import { createProperty} from '@/pages/api/properties';
export default function AddPropertyForm({userName, type}: {userName: any, type: number}) {
  const [show, setShow] = useState(true);
  const [address, setAddress] = useState<string>('');
  const [zipCode, setZipCode] = useState<number>(0);
  const [imageUrl, setimageUrl] = useState<string>('');

  const handleClose = () => setShow(false);
  const saveData = () => {
    // image: string
    // owner: string
    // address: string
    // zipcode: string
    // type
    const propertyCreateData: propertyData = {
        owner: userName,
        image: imageUrl,
        zipcode: zipCode,
        address: address,
        type: type,

      }
    createProperty(propertyCreateData);
    handleClose();
  }
  const handleZipChange = (e:any) => {
    const value = e.target.value.replace(/\D/g, "");
    setZipCode(value);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Provide some property info down below</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="string"
                placeholder="Ex: 123 Main Street"
                value={address}
                onChange={(e) => setAddress(e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>ZipCode</Form.Label>
              <Form.Control
              placeholder="Ex: 78704"
              value={zipCode}
              type="number"
              onChange={handleZipChange}/>
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Image Url</Form.Label>
              <Form.Control
              placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1245px-Twitter-logo.svg.png"
              value={imageUrl}
              type="string"
              onChange={(e) => setimageUrl(e.currentTarget.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}