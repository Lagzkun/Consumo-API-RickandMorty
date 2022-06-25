import React, { useState, useEffect } from 'react';
import './App.css';
import '../src/styles/main.css';
import { Card, Button } from 'react-bootstrap';
import {API} from '../src/constants/index'
import ReactPaginate from 'react-paginate'
import rickandmorty from './assets/rickandmorty.png'
import ErrorCharacter from './assets/nofound.jpeg'


function App() {   
  const [state, setState] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [errorSearch, setErrorSearch] = useState(false);
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
        setErrorSearch(true)
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
        <div className='main-header'>
          <img src={rickandmorty} alt="imagen de rickandmorty"/> 
        </div>
        <div className='input-sector'>
          <input
              type="text"
              placeholder="search"
              onChange={(event) => {
                setCurrentPage(1);
                setSearch(event.target.value)
              }}
            ></input>
        </div>   
        <div className="errorMesages">
        {errorSearch ? <img src={ErrorCharacter}/> : ""}
        </div>
        <div className="page-card">
      {
        state.map((item) => ( 
            <div className='card-sector' key={item.id}>
              
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <div className='info-card'>
                    <div>{item.status}</div>
                    <div>{item.gender}</div>
                    <div>{item.species}</div>
                  </div>
                  <Button variant="primary">{item.origin.name}</Button>
                </Card.Body>
            
            </div>
        ))
      }
      
        </div>
        <ReactPaginate
              className="pagination"
              nextLabel="Next"
              forcePage={currentPage === 1 ? 0 : currentPage - 1}
              previousLabel="Previous"
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
    </div>
  );
}

export default App;
