import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { propertyData } from './addproperty';
import { createProperty} from '@/pages/api/properties';
export default function AddPropertyForm({userName, type}: {userName: any, type: string}) {
  const [show, setShow] = useState(true);
  const [address, setAddress] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');

  const handleClose = () => setShow(false);
  const saveData = () => {
    // image: string
    // owner: string
    // address: string
    // zipcode: string
    // type
    const propertyCreateData: propertyData = {
        owner: userName,
        image: '',
        zipcode: zipCode,
        address: address,
        type: type,

      }
    createProperty(propertyCreateData);
    handleClose();
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Provide some property info down below</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="LocationControl">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="string"
                placeholder="Ex: 123 Main Street"
                value={address}
                onChange={(e) => setAddress(e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="password control"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
              placeholder="Ex: 78704"
              type="string"
              value={zipCode}
              onChange={(e) => setZipCode(e.currentTarget.value)}/>
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