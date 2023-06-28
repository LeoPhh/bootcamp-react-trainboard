import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Button from './components/Button';
import Dropdown from './components/Dropdown';
import Station from './components/Station';
import Stations from './components/Stations';

const selectableStations = ['Kings Cross', 'Glasgow', 'Edinburgh', 'Birmingham', 'Victoria'];

const App = () => {
    const [departureStation, setDepartureStation] = React.useState('');

    return <BrowserRouter>
        <div className = "App">
            <div className = "dropdown-menus-container">
                <div className = "dropdown">
                    <Dropdown valueUpdateFunction = { setDepartureStation } placeHolder = "Select Station" label = 'Departure:' selectableStations = { selectableStations } id = 'departure-station-selection'/>
                </div>
                <div className = "dropdown">
                    <Dropdown placeHolder = "Select Station" label = 'Arrival:' selectableStations = { selectableStations.filter((s) => s!==departureStation) } id = 'arrival-station-selection'/>
                </div>
            </div>
            
            <Button text = 'Select Station' onClick = { ()=>{return null;} } classes = 'is-primary'></Button>
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
    </BrowserRouter>;
};

export default App;
