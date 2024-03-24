import React from 'react';
import ToggleSwitch from './ToggleSwitch';

interface SettingsProps {
    // Define your props here, for example:
    // theme: 'light' | 'dark';
}

const Settings: React.FC<SettingsProps> = () => {

    return (
        <div>
            <h1>Settings</h1>
            <hr></hr>
            <br></br>
            <h2>UNITS</h2>
            <label style={{marginRight:"15px"}}>Use Imperial Units (feet, miles)</label>
             <ToggleSwitch ></ToggleSwitch>
        </div>
    );
}

export default Settings;