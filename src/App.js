import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Button, Row, Col } from 'react-bootstrap';


function App() {   
  const [state, setState] = useState([]);

  useEffect(() => {
    const responseCards = async () => {
      const request = await fetch('https://rickandmortyapi.com/api/character')
      const response = await request.json();
      setState(response.results);
    }
    
    responseCards()
  })
  console.log(state);
  return (
    <div className="App">
      <div className='container'> 
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
                <Button variant="primary" href={item.origin.url}>{item.origin.name}</Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      }
        </Row>
      </div>
    </div>
  );
}

export default App;
