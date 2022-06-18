import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Button, Row, Col } from 'react-bootstrap';
import {API} from '../src/constants/index'
import ReactPaginate from 'react-paginate';


function App() {   
  const [state, setState] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [errorSearch, setErrorSearch] = useState('');
  const [pages, setPages] = useState(42);

  //pagination
  let pageChange = (data) => {
    setCurrentPage(data.selected + 1)
  }

  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  const services = `${API}/?page=${currentPage}&name=${search}`;
  useEffect(() => {
    const responseCards = async () => {
      const request = await fetch(services)
      if (request.status === 200) {
        const response = await request.json();
   
        setState(response.results);
        setPages(response.info.pages)
        setErrorSearch('')
      } else if (request.status === 404) {
        setState([])
        setErrorSearch('Personaje no encontrado :/')
      }
    }
    responseCards()
  }, [services])

    //render pagination
    useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }, []);
  

  return (
    <div className="App">
      <div className='container'> 
      <input
          type="text"
          placeholder="search"
          onChange={(event) => {
            setCurrentPage(1);
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
                <Button variant="primary">{item.origin.name}</Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      }
      
        </Row>
        <ReactPaginate
              className="pagination"
              nextLabel="Next"
              forcePage={currentPage === 1 ? 0 : currentPage - 1}
              previousLabel="Prev"
              previousClassName="prev-button"
              nextClassName="prev-button"
              activeClassName="active"
              marginPagesDisplayed={width < 576 ? 1 : 2}
              pageRangeDisplayed={width < 576 ? 1 : 2}
              pageCount={pages}
              onPageChange={pageChange}
              pageClassName="page-item"
              pageLinkClassName="page-link"
            />
      </div>
      <div className="errorMesages">{errorSearch}</div>
    </div>
  );
}

export default App;
