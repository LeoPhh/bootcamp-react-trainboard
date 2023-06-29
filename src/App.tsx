import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Button from './components/Button';
import Station from './components/Station';
import StationDropdown from './components/StationDropdown';
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
    return `https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/${
        stationMap.get(stationOne)}/${stationMap.get(stationTwo)}/`;
};

const App = () => {

    const [departureStation, setDepartureStation] = React.useState('');
    const [arrivalStation, setArrivalStation] = React.useState('');
    const [disableSubmit, setDisableSubmit] = React.useState(true);

    React.useEffect(() => {
        setDisableSubmit(
            !departureStation || !arrivalStation || departureStation===arrivalStation,
        );
    }, [departureStation, arrivalStation]);

    const onSubmit = () => {
        departureStation
        && arrivalStation
        && window.open(urlMaker(departureStation, arrivalStation));
    };

    const getDisabledMessage = () => {
        return <div className = "disable-message has-text-danger" >
            {
                (!departureStation || !arrivalStation)
            && <>Select two stations.</>
            || <>Departure station cannot be the same as arrival station.</>
            }
        </div>;
    };

    return <BrowserRouter>
        <div className = "App">
            <div className = "dropdown-menus-container">
                <StationDropdown
                    valueUpdateFunction = { setDepartureStation }
                    label = 'Departure:'
                    selectableStations = { stationNames }
                    id = 'departure-station-selection'
                />
                <StationDropdown
                    valueUpdateFunction = { setArrivalStation }
                    label = 'Arrival:'
                    selectableStations = { stationNames }
                    id = 'arrival-station-selection'
                />
            </div>

            {
                disableSubmit && getDisabledMessage()
            }

            <Button
                text = 'Select Station'
                onClick = { onSubmit }
                classes = 'is-danger'
                disabled = { disableSubmit }
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
