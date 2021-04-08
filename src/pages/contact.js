import { useEffect, useState, Fragment } from 'react';
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
  const [dataContact, setDataContact] = useState([]);
  const [idContact, setIdContact] = useState();
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState(false);

  const FetchData = async () => {
    const response = await axios.get(
      'https://simple-contact-crud.herokuapp.com/contact'
    );
    setDataContact(response.data.data);
  };

  useEffect(() => {
    FetchData();
  }, []);

  const toggle = () => setModal(!modal);

  const hapus = (id) => {
    toggle();
    setIdContact(id);
  };

  const hapusData = () => {
    axios
      .delete(`https://simple-contact-crud.herokuapp.com/contact/${idContact}`)
      .then((response) => {
        toggle();
        setMessage(response.data.message);
        FetchData();
        setTimeout(() => {
          setMessage('');
        }, 1000);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <Fragment>
      {message && (
        <Alert color="success">This is a success alert — check it out!</Alert>
      )}

      <div style={{ marginBottom: '30px' }}>
        <Link to="/tambah" className="btn btn-primary">
          Tambah
        </Link>
      </div>

      <Table className="text-center">
        <thead>
          <tr>
            <th>No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>

        {dataContact.map((contact, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.age}</td>
                <td>
                  <img src={contact.photo} alt="img" width="100px" />
                </td>
                <td>
                  <Link to={`/edit/${contact.id}`} className="btn btn-warning">
                    Edit
                  </Link>{' '}
                  <button
                    onClick={() => hapus(contact.id)}
                    className="btn btn-danger"
                  >
                    Hapus
                  </button>{' '}
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Hapus Data</ModalHeader>
        <ModalBody>Apakah anda ingin menghapus data ini ?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Tidak
          </Button>{' '}
          <Button color="secondary" onClick={hapusData}>
            Ya
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default Contact;
