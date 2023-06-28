import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Button from './components/Button';
import Dropdown from './components/Dropdown';
import Station from './components/Station';
import Stations from './components/Stations';

const selectableStations = ['Kings Cross', 'Glasgow', 'Edinburgh', 'Birmingham', 'Victoria'];

const App = () => (
    <BrowserRouter>
        <div className = "App">
            <Dropdown placeHolder = "Select Station" label = 'Choose a departure station:' selectableStations = { selectableStations }/>
            <Button text = 'Select Station' onClick = { ()=>{return null;} }></Button>
            <Routes>
                <Route path = "/stations">
                    <Route path = ":id" element = { <Station/> }/>
       
                    <Route index element = { <Stations/> }/>
                </Route>
            </Routes>
            <footer>
                <Link to = "/stations">Stations</Link>
            </footer>
        </div>
    </BrowserRouter>
);

export default App;
