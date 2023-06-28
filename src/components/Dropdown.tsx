import React from 'react';

interface DropdownProps {
    placeHolder: string;
    label: string;
    selectableStations: string[];
    id: string;
    valueUpdateFunction?: (newValue: string) => void;
}

const Dropdown = ({ placeHolder, label, selectableStations, id, valueUpdateFunction }: DropdownProps) => {
    const [showPlaceholder, setShowPlaceholder] = React.useState(true);

    const onChangeAndRemovePlaceholder: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setShowPlaceholder(false);
        valueUpdateFunction && valueUpdateFunction(event.target.value);
    };
    
    return (
        <div className = "field">
            <label className = 'label' htmlFor = { id }>{label}</label>
            <div className = "select">
                <select name = "stations" id = { id } onChange = { onChangeAndRemovePlaceholder }>
                    {
                        showPlaceholder && <option value = "" disabled selected>{placeHolder}</option>
                    }
                    {selectableStations.map((station, i) => {
                        return <option value = { station } key = { i }>{station}</option>;
                    })}
                </select>
            </div>
        </div>
    );
};

export default Dropdown;

