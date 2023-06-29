import React from 'react';

interface DropdownProps {
    label: string;
    selectableStations: string[];
    id: string;
    valueUpdateFunction?: (newValue: string) => void;
}

const Dropdown = ({ label, selectableStations, id, valueUpdateFunction }: DropdownProps) => {
    const [showPlaceholder, setShowPlaceholder] = React.useState(true);
    const placeHolder = 'Select station';

    const onChangeAndRemovePlaceholder: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setShowPlaceholder(false);
        valueUpdateFunction && valueUpdateFunction(event.target.value);
    };
    
    return (
        <div className = "dropdown">
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
        </div>
    );
};

export default Dropdown;

