import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import axios from 'axios';

const Edit = (props) => {
  const id = props.match.params.id;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios
      .get(`https://simple-contact-crud.herokuapp.com/contact/${id}`)
      .then((response) => {
        setFirstName(response.data.data.firstName);
        setLastName(response.data.data.lastName);
        setAge(response.data.data.age);
        setPhoto(response.data.data.photo);
      });
  }, [id]);

  useEffect(() => {
    if (firstName === '' || lastName === '' || age === '' || photo === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [firstName, lastName, age, photo]);

  const changeFirstName = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };

  const changeLastName = (e) => {
    const value = e.target.value;
    setLastName(value);
  };

  const changeAge = (e) => {
    const value = e.target.value;
    setAge(value);
  };

  const changePhoto = (e) => {
    const value = e.target.value;
    setPhoto(value);
  };

  const toggle = () => setModal(!modal);

  const submit = () => {
    const payload = {
      firstName,
      lastName,
      age,
      photo,
    };
    axios
      .put(`https://simple-contact-crud.herokuapp.com/contact/${id}`, payload)
      .then((response) => {
        toggle();
        setMessage(response.data.message);
      });
  };

  return (
    <Fragment>
      <FormGroup>
        <Label>First Name</Label>
        <Input
          type="text"
          value={firstName}
          onChange={changeFirstName}
          placeholder="first name"
        />
      </FormGroup>

      <FormGroup>
        <Label>Last Name</Label>
        <Input
          type="text"
          value={lastName}
          onChange={changeLastName}
          placeholder="last name"
        />
      </FormGroup>

      <FormGroup>
        <Label>Age</Label>
        <Input
          type="number"
          value={age}
          onChange={changeAge}
          placeholder="age"
        />
      </FormGroup>

      <FormGroup>
        <Label>Photo URL</Label>
        <Input
          type="text"
          value={photo}
          onChange={changePhoto}
          placeholder="photo url"
        />
      </FormGroup>

      <FormGroup>
        <Row>
          <Col md="auto">
            <Link to="/" className="btn btn-warning">
              Back
            </Link>
          </Col>
          <Col md="auto">
            <Button color="primary" disabled={disabled} onClick={submit}>
              Simpan
            </Button>
          </Col>
        </Row>
      </FormGroup>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Berhasil</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Tutup
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default Edit;
