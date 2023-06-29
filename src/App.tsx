import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Button from './components/Button';
import Dropdown from './components/Dropdown';
import Station from './components/Station';
import Stations from './components/Stations';

const stationMap = new Map<string, string>([
    ['Kings Cross', 'KGX'],
    ['Edinburgh', 'EDB'],
    ['Victoria', 'VIC'],
    ['Birmingham', 'BHI'],
    ['Glasgow', 'GLC'],
]);

const stationNames = Array.from(stationMap.keys());

const urlMaker = (stationOne: string, stationTwo: string) => {
    return `https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/${stationMap.get(stationOne)}/${stationMap.get(stationTwo)}/`;
};

const App = () => {

    const [departureStation, setDepartureStation] = React.useState('');
    const [arrivalStation, setArrivalStation] = React.useState('');

    const onSubmit = () => {
        departureStation
        && arrivalStation
        && window.open(urlMaker(departureStation, arrivalStation));
    };

    return <BrowserRouter>
        <div className = "App">
            <div className = "dropdown-menus-container">
                <Dropdown
                    valueUpdateFunction = { setDepartureStation }
                    label = 'Departure:'
                    selectableStations = { stationNames }
                    id = 'departure-station-selection'
                />
                <Dropdown
                    valueUpdateFunction = { setArrivalStation }
                    label = 'Arrival:'
                    selectableStations = { stationNames.filter((s) => s!==departureStation) }
                    id = 'arrival-station-selection'
                />
            </div>

            <Button
                text = 'Select Station'
                onClick = { onSubmit }
                classes = 'is-danger'
                disabled = { !departureStation || !arrivalStation }
            />

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
