import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Button from './components/Button';
import JourneysContainer from './components/JourneysContainer';
import StationDropdown from './components/StationDropdown';

interface IApiUrlMaker {
    originStation: string;
    destinationStation: string;
    outboundDateTime: string;
    numberOfChildren: string;
    numberOfAdults: string;
    journeyType?: 'single' | 'return' | 'open_return';
}

export interface JourneyEntry {
    arrivalTime: string;
    departureTime: string;
    destinationStation: {'crs': string; 'displayName': string};
    isFastestJourney: boolean;
    journeyDurationInMinutes: number;
    originStation: {'crs': string; 'displayName': string};
    stationMessages: null[];
}

interface OutboundJourneysContainerResponseData {
    outboundJourneys: JourneyEntry[];
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
    const [trainData, setTrainData] = React.useState<null | JourneyEntry[]>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const displayTrainData = () => {
        if (trainData?.length) {
            return <JourneysContainer
                journeyEntries = { trainData }
            />;
        }
    };

    const displayMessage = () => {
        if (isLoading) {
            return <div className = 'fetch-message'>Loading...</div>;
        } else if (!trainData) {
            return <></>;
        } else if (!trainData.length) {
            return <div className = 'fetch-message'>No results found.</div>;
        }
    };

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

        try {
            setIsLoading(true);
            const response = await fetch(...requestOptions);
            const jsonData: OutboundJourneysContainerResponseData = await response.json();
            setIsLoading(false);
            setTrainData(jsonData.outboundJourneys);
        } catch (error) {
            return;
        }

    };

    React.useEffect(() => {
        setDisableSubmit(
            !originStationName
            || !destinationStationName
            || originStationName===destinationStationName,
        );
    }, [originStationName, destinationStationName]);

    const onSubmit = () => {
        originStationName
        && destinationStationName
        && fetchTrainData();
    };

    const ifDisabledGetMessage = () => {
        if (disableSubmit) {
            return <div className = "disable-message" >
                {
                    (!originStationName || !destinationStationName)
            && <>Select two stations.</>
            || <>Departure station cannot be the same as arrival station.</>
                }
            </div>;
        }

    };

    return <BrowserRouter>
        <div className = "App">
            <div className = "user-entry-container">
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

                <div className = "button_container">
                    {ifDisabledGetMessage()}
                    <Button
                        text = 'Select Station'
                        onClick = { onSubmit }
                        disabled = { disableSubmit }
                    />
                    {displayMessage()}
                </div>
            </div>

            <div className = "train-board">
                {displayTrainData()}
            </div>
        </div>

    </BrowserRouter>;
};

export default App;
