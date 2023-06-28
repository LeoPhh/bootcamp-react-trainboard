import React from 'react';

interface DropdownProps {
    placeHolder: string;
    label: string;
    selectableStations: string[];
}

const Dropdown = ({ placeHolder, label, selectableStations }: DropdownProps) => {
    return (
        <>
            <label htmlFor = { placeHolder }>{label}</label>
            <select name = "stations" id = { `station-${label}` }>
                {selectableStations.map((station, i) => {
                    return <option value = { station } key = { i }>{station}</option>;
                })}
            </select>
        </>
    );
};

export default Dropdown;

