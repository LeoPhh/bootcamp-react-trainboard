import React from 'react';
import type { JourneyEntry } from '../App';
import JourneyBlock from './JourneyBlock';

interface OutboundJourneysContainerProps {
    journeyEntries: JourneyEntry[];
}

const JourneysContainer = ({ journeyEntries }: OutboundJourneysContainerProps) => {
    return (
        <div className = "outbound-container">
            {journeyEntries.map((j, i) => (
                <div key = { i }>
                    <JourneyBlock journeyData = { j } />
                </div>
            ))}
        </div>
    );
};

export default JourneysContainer;