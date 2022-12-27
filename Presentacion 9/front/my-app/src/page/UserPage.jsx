import React, { Component } from 'react';
import axios from 'axios';
import Tweet from '../component/tweet';
import FormGroup from 'react-bootstrap/FormGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';


class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      form: {
        tweet: ''
      }
    }
    this.handleChangeForm = this.handleChangeForm.bind(this)
  }

  handleChangeForm = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }
  saveForm = async () => {
    await axios.post(`http://35.224.245.251:8080/saveTweet`, {
      tweet: this.state.form.tweet
    })
      .then(() => {
        alert("Comentario almacenado")
      })
      .catch(error => {
        alert(error);
      })

  }
  componentDidMount = async () => {
    this.load();
  }
  load = async () => {
    await axios.get(`http://35.224.245.251:8080/getTweets`)
    .then(response => {
        this.setState({ 
            tweets: response.data
        });
    })
    .catch(error => {
        alert(error);
    })
  }

  render = () => {
    return (
      <> 
      <Card>
      <Card.Header>Tweet</Card.Header>
      <Card.Body>
      <Container>
        <Row>
          <Col >
            <Card>
              <Card.Header as="h5">Create Tweet</Card.Header>
              <Card.Body>
                <Form>
                  <FormGroup className="mb-3">
                    <Form.Label>Tweet</Form.Label>
                    <Form.Control
                      type="text"
                      name="tweet"
                      value={this.state.form.tweet}
                      onChange={this.handleChangeForm}
                    />
                  </FormGroup>
                  
                  <FormGroup className="mb-3" align="right">
                    <Button variant="outline-secondary" onClick={() => this.saveForm()} size="sm">
                      {' '}
                      Guardar
                    </Button>
                  </FormGroup>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          <Table striped bordered hover>
              <thead>
                <tr>
                  <th>_id</th>
                  <th>Comentario</th>
                </tr>
              </thead>
              <tbody>
              {this.state.tweets.map(p => (
        <Tweet  key={p._id} {...p} />
      ))}
                
              </tbody>
            </Table>
          
          </Col>
        </Row>
        </Container>
        </Card.Body>
      </Card>

      </>
      
    )
  }
}
export default UserPage;