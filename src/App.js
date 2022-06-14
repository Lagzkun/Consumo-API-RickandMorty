import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Button, Row, Col } from 'react-bootstrap';
import {API} from '../src/constants/index'


function App() {   
  const [state, setState] = useState([]);
  const [search, setSearch] = useState('');
  const [errorSearch, setErrorSearch] = useState('');
  const dead = 'Dead'

  const handleSudmit = () => {
    console.log('presionado')
  }
  const services = `${API}/?name=${search}`
  console.log(services)
  useEffect(() => {
    const responseCards = async () => {
      const request = await fetch(services)
      if (request.status === 200) {
        const response = await request.json();
        setState(response.results);
        setErrorSearch('')
      } else if (request.status === 404) {
        setState([])
        setErrorSearch('Personaje no encontrado :/')
      }
    }
    responseCards()
  }, [services])

  return (
    <div className="App">
      <div className='container'> 
      <input
          type="text"
          placeholder="search"
          onChange={(event) => {
            setSearch(event.target.value)
          }}
        ></input>
        <Row className="g-4">
      {
        state.map((item) => ( 
          <Col Col xs={6} md={3} className='card-sector' key={item.id}>
            <Card>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <p>{item.status}</p>
                  <p>{item.gender}</p>
                  <p>{item.species}</p>
                </Card.Text>
                <Button onClick={handleSudmit} variant="primary">{item.origin.name}</Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      }
        </Row>
      </div>
      <div className="errorMesages">{errorSearch}</div>
    </div>
  );
}

export default App;
