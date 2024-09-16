import React from 'react';
import type { JourneyEntry } from '../App';

interface JourneyBlockProps {
    journeyData: JourneyEntry;
}

const JourneyBlock = ({ journeyData }: JourneyBlockProps) => {

    const { journeyDurationInMinutes:
        minutes, originStation, destinationStation, departureTime } = journeyData;

    const departureTimeDisplay = new Date(departureTime);
    const travelTime = `${Math.floor(minutes / 60)}hrs ${minutes % 60}mins`;

    return (
        <div className = "journey-row">
            <div className = "journey-col">
                <div className = "journey-item">{
                    `${originStation.displayName} (${originStation.crs})`}
                </div>

                <div className = "journey-item">{
                    `${destinationStation.displayName} (${destinationStation.crs})`}
                </div>
            </div>

            <div className = "journey-col">
                <div className = "journey-item">{
                    `Departure: ${departureTimeDisplay.toLocaleTimeString([],
                        { hour: '2-digit', minute:'2-digit' })}`}
                </div>
                {travelTime}
            </div>
        </div>
    );
};

export default JourneyBlock;