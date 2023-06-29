import React from 'react';
import JourneyBlock, { JourneyEntry } from './JourneyBlock';

interface OutboundJourneysContainerProps {
    outboundJourneyData: JourneyEntry[];
}

const OutboundJourneysContainer = ({ outboundJourneyData }: OutboundJourneysContainerProps) => {
    return (
        <div className = 'mt-5'>
            {outboundJourneyData.map((j, i) => (
                <div className = "outbound-container container p-5" key = { i }>
                    <JourneyBlock journeyData = { j } />
                </div>
            ))}
        </div>
    );
};

export default OutboundJourneysContainer;