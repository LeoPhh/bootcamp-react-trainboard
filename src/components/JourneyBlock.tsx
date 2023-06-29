import React from 'react';

export interface JourneyEntry {
    arrivalTime: string;
    departureTime: string;
    destinationStation: {'crs': string; 'displayName': string};
    isFastestJourney: boolean;
    journeyDurationInMinutes: number;
    legs: any[];
    originStation: {'crs': string; 'displayName': string};
    stationMessages: any[];
    tickets: any[];
}

interface JourneyBlockProps {
    journeyData: JourneyEntry;
}

const JourneyBlock = ({ journeyData }: JourneyBlockProps) => {
    const { journeyDurationInMinutes: minutes, originStation, destinationStation } = journeyData;
    const travelTime = `${Math.floor(minutes / 60)}hrs ${minutes % 60}mins`;

    return (
        <div className = "level is-size-5 box box-radius-large">
            <div className = "level-left">
                <div className = "level-item">{
                    `${originStation.displayName} (${originStation.crs})`
                }</div>
            </div>
            <div className = "level-center">
                {travelTime}
            </div>
            <div className = "level-right">
                <div className = "level-item">{
                    `${destinationStation.displayName} (${destinationStation.crs})`
                }</div>
            </div>
        </div>
    );
};

export default JourneyBlock;