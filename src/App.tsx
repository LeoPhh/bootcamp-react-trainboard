import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Button from './components/Button';
import { JourneyEntry } from './components/JourneyBlock';
import OutboundJourneysContainer from './components/JourneysContainer';
import StationDropdown from './components/StationDropdown';

interface IApiUrlMaker {
    originStation: string;
    destinationStation: string;
    outboundDateTime: string;
    numberOfChildren: string;
    numberOfAdults: string;
    journeyType?: 'single' | 'return' | 'open_return';
}

const stationMap = new Map<string, string>([
    ['Kings Cross', 'KGX'],
    ['Edinburgh', 'EDB'],
    ['Victoria', 'VIC'],
    ['Birmingham', 'BHI'],
    ['Glasgow', 'GLC'],
]);

const stationNames = Array.from(stationMap.keys());

const apiUrlMaker = (parameters: IApiUrlMaker) => {
    const extractedParameters = Array.from(Object.entries(parameters));
    return 'https://mobile-api-softwire2.lner.co.uk/v1/fares?'
        + extractedParameters.map(([k, v]) => `${k}=${v}`).join('&');
};

const App = () => {

    const [originStationName, setOriginStationName] = React.useState('');
    const [destinationStationName, setDestinationStationName] = React.useState('');
    const [disableSubmit, setDisableSubmit] = React.useState(true);
    const [trainData, setTrainData] = React.useState(
        null as null | {'outboundJourneys': JourneyEntry[]},
    );
    const [isLoading, setIsLoading] = React.useState(false);

    const displayData = (trainData: {'outboundJourneys': JourneyEntry[]}) => (
        <OutboundJourneysContainer outboundJourneyData = { trainData.outboundJourneys }/>
    );

    const getTrainRequestOptionsOrNull = (): [string, RequestInit] | null => {
        const originStation = stationMap.get(originStationName);
        const destinationStation = stationMap.get(destinationStationName);

        if (!originStation || !destinationStation) {
            return null;
        }

        return [
            apiUrlMaker({
                originStation,
                destinationStation,
                outboundDateTime: new Date(Date.now() + 10000).toISOString(),
                numberOfChildren: '0',
                numberOfAdults: '1',
            }),
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
                },
            },
        ];
    };

    const fetchTrainData = async () => {
        const requestOptions = getTrainRequestOptionsOrNull();

        if (!requestOptions) {
            return;
        }

        setIsLoading(true);
        const response = await fetch(...requestOptions);
        const json = await response.json();
        setIsLoading(false);
        setTrainData(json);
    };

    React.useEffect(() => {
        setDisableSubmit(
            !originStationName
            || !destinationStationName
            || originStationName===destinationStationName,
        );
    }, [originStationName, destinationStationName]);

    React.useEffect(() => {
        console.log(trainData);
    }, [trainData]);

    const onSubmit = () => {
        originStationName
        && destinationStationName
        && fetchTrainData();
    };

    const getDisabledMessage = () => {
        return <div className = "disable-message has-text-danger" >
            {
                (!originStationName || !destinationStationName)
            && <>Select two stations.</>
            || <>Departure station cannot be the same as arrival station.</>
            }
        </div>;
    };

    return <BrowserRouter>
        <div className = "App">
            <div className = "dropdown-menus-container">
                <StationDropdown
                    valueUpdateFunction = { setOriginStationName }
                    label = 'Departure:'
                    selectableStations = { stationNames }
                    id = 'departure-station-selection'
                />
                <StationDropdown
                    valueUpdateFunction = { setDestinationStationName }
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

            {
                isLoading && <div className = "is-large is-warning">Loading...</div>
                || trainData && (
                    trainData.outboundJourneys.length > 0 && displayData(trainData)
                || <div className = "is-large is-danger">No results found.</div>
                )
            }

            {/* <Routes>
                <Route path = "/stations">
                    <Route path = ":id" element = { <Station/> }/>
                    <Route index element = { <Stations/> }/>
                </Route>
            </Routes>
            <footer>
                <Link to = "/stations">Stations</Link>
            </footer> */}
        </div>
    </BrowserRouter>;
};

export default App;
