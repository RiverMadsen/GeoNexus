import React from 'react';
import { useSettings } from './store/SettingsContext';

interface GeekZoneProps {
    // Define your props here, for example:
    // theme: 'light' | 'dark';
}

const GeekZone: React.FC<GeekZoneProps> = () => {
    
    const { state } = useSettings();
    return (
        <div>
            <h1>Geek Zone</h1>
            <br></br>
            {state.units === 'metric' ? 'You are using the metric system' : 'You are using the imperial system'}
        </div>
    );
}

export default GeekZone;