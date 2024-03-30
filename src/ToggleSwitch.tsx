import  { useState } from 'react';
import './ToggleSwitch.css'; // Assume you have some basic styling for the toggle
import { SettingsActionTypes, useSettings } from './store/SettingsContext';

const ToggleSwitch = () => {
    const [isActive, setIsActive] = useState(false);
    const { state, dispatch } = useSettings();

    const handleUnitChange = (newUnit: 'metric' | 'english') => {
        setIsActive(!isActive);
        dispatch({ type: SettingsActionTypes.SET_UNITS, payload: newUnit });
    };

    return (
        <label className="toggle-switch">
            <input type="checkbox" checked={state.units === 'english'} onChange={() => handleUnitChange(isActive ? "metric" : "english")} />
            <span className="slider round"></span> {/* This span can be styled to look like the slider */}
        </label>
    );
};

export default ToggleSwitch;
