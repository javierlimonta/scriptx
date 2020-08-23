import React from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';

const App = () => {
  const [object, setObject] = React.useState({ url: 'warehouse', guid: null, revision: null });
  const [valid, setvalid] = React.useState(false);
  const [doneRegister, setdoneRegister] = React.useState({ show: false, message: "", variant: 'danger' })

  const submitHandler = async () => {
    const result = await axios.post("http://127.0.0.1:41191/api/v1/licensing", {
      guid: object.guid,
      url: object.url,
      revision: object.revision
    });
    if (result) {
      if (result.status === 200)
        setdoneRegister({ show: true, message: `${result.data.company} - ${result.data.companyHomePage}`, variant: 'success' });
    }
  }

  const onChangeHandler = (event) => {
    const rawValue = { ...object };
    rawValue[event.target.id] = event.target.value;
    setObject(rawValue);
    setvalid((rawValue.url && rawValue.guid && rawValue.revision));
  }

  return (
    <div className="App">
      <Container style={{ margin: 20 }}>
        {doneRegister.show && <Alert variant={doneRegister.variant} onClose={() => setdoneRegister({ ...doneRegister, show: false })} dismissible>
          {doneRegister.message}
        </Alert>}
        <Row>
          <Col md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={object.url || ""} onChange={onChangeHandler} id="url" placeholder="URL" aria-label="URL" aria-describedby="basic-addon1" />
            </InputGroup>
          </Col>
          <Col md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon2">GUID</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="guid" value={object.guid || ""} onChange={onChangeHandler} placeholder="GUID" aria-label="GUID" aria-describedby="basic-addon2" />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">Revision</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl type="number" id="revision" value={object.revision || ""} onChange={onChangeHandler} placeholder="URL" aria-label="URL" aria-describedby="basic-addon3" />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Button variant="primary" disabled={!valid} onClick={submitHandler}>Register</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
