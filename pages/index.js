import Head from 'next/head'
import {useState} from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Home() {
    const version = "0.1b";
    const [error, setError] = useState('');
    const [secret, setSecret] = useState('');
    const [payload, setPayload] = useState(null);
    const [token, setToken] = useState('');

  function decodePaseto(e) {
      e.preventDefault();
      if (secret === '')
      {
          alert('You must provide a secret');
          return;
      }
      console.log(token);
      if (token === '' || token === undefined)
      {
          alert('You must provide a token');
          return;
      }
      axios.post('/api/decodePaseto', {
          secret: secret,
          token: token
      }).then(function (response) {
          setPayload(response.data)
      }).catch(function (error) {
          setError(error.response.data.error);
      });
  }

  return (
      <Container className={"text-center"}>
          <Head>
              <title>Paseto Debugger</title>
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <header>
              <Row>
                  <Col>
                      <div className="py-5">
                          <h1 className="display-4 mb-3">
                              Paseto Debugger
                          </h1>
                          <p className={"lead"}>
                              An online debugger to decode Paseto tokens
                          </p>
                      </div>
                      <Alert variant="warning" className={"mx-auto"}>
                          The secret you enter here is sent to a backend server to decode your Paseto token, but it is never saved.
                          You can check the <a href={"https://github.com/mehdibo/paseto-debugger/"} className={"alert-link"}>source code here</a>
                      </Alert>
                  </Col>
              </Row>
          </header>
          <main className={"flex-shrink-0"}>
              <Row>
                  <Col className={"mx-auto"}>
                      {error && (<Alert variant={"danger"}>{error}</Alert>)}
                      <Form onSubmit={decodePaseto}>
                          <Form.Group controlId="secretKey">
                              <Form.Control size="lg" type="text" placeholder="Secret in HEX format" onChange={(e) => setSecret(e.target.value)} />
                              <Form.Text className="text-muted">
                                  The secret is sent to a backend API, but it is not saved
                              </Form.Text>
                          </Form.Group>

                          <Form.Group controlId="pasetoToken">
                              <Form.Control size="lg" type="text" placeholder="Paseto token" onChange={(e) => setToken(e.target.value)} />
                          </Form.Group>
                          <Button variant="dark" block size="lg" type="submit">
                              Decode
                          </Button>
                      </Form>
                      {payload && <Card className={"mt-4 text-left"}>
                          <Card.Body>
                              <pre>{JSON.stringify(payload, null, 2)}</pre>
                          </Card.Body>
                      </Card>}
                  </Col>
              </Row>
          </main>
          <footer className={"fixed-bottom"} style={{
              padding: "12px"
          }}>
              <Row>
                  <Col>
                      Contribute on <a href={"https://github.com/mehdibo/paseto-debugger"}>
                        <img height={"20px"} src={"https://raw.githubusercontent.com/rdimascio/icons/master/icons/github.svg"}/>
                      </a> | V{version}
                  </Col>
              </Row>
          </footer>
          <style jsx global>{`
              html, body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
                                Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                color: #24292e;
                background: #f6f8fa;
              }
              * {
                box-sizing: border-box;
              }
      `}</style>
      </Container>
  )
}
