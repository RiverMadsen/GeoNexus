import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { HexColorPicker } from "react-colorful";
import { useSettings,SettingsActionTypes } from './store/SettingsContext';

interface SettingsProps {
    // Define your props here, for example:
    // theme: 'light' | 'dark';
}

const Settings: React.FC<SettingsProps> = () => {
    console.log("**SETTINGS**")
    const {state, dispatch} = useSettings();
    //debugger;
    //const memoizedDispatch = useCallback(dispatch, []);

    const [mapColors, setMapColors] = useState({
        'BACKGROUND': state.background,
        'ACTIVE_ROUTE': state.activeRoute,
        'NON_ACTIVE_ROUTE': state.nonActiveRoute,
        'COMPASS': state.compass,
        'NAVIGATION_VECTOR': state.navigationVector,
    });
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [activeColorPatch, setActiveColorPatch] = useState<SettingsActionTypes> (SettingsActionTypes.ACTIVE_ROUTE);

    const handleColorPatchClick = (patch: SettingsActionTypes) => {
        setDisplayColorPicker(!displayColorPicker);
        setActiveColorPatch(patch);
        console.log("activeColorPatch: " + activeColorPatch);
    }

    const handleChangeColor = (color: string) => {
        console.log("setting " + activeColorPatch + " to " + color);
        setMapColors({ ...mapColors, [activeColorPatch]: color + 'aa' });
        dispatch({type: activeColorPatch, payload: color});
    }

    return (
        <div>
            <h1>Settings</h1>
            <hr></hr>
            <br></br>
            <h2>UNITS</h2>
            <div className='mb-10 flex gap-2 items-center'>
                <label className="" style={{ marginRight: "15px" }}>Use Imperial Units (feet, miles)</label>
                <div className="items-center" ><ToggleSwitch ></ToggleSwitch></div>
            </div>
            <h2>MAP COLORS</h2>

            <div className='flex  gap-2 relative'>
                {!displayColorPicker &&
                    <div className="flex flex-col items-start gap-2">
                        <div className="flex items-center gap-2">
                            <label htmlFor="colorPicker" className="text-sm font-normal text-ent-white">Offline Area Background Color:</label>
                            <button style={{ backgroundColor: mapColors.BACKGROUND }} onClick={() => handleColorPatchClick(SettingsActionTypes.BACKGROUND)} id="colorPicker" className="w-10 h-10 rounded-full border border-white "></button>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <label htmlFor="colorPicker" className="text-sm font-normal text-ent-white">Active Route:</label>
                            <button style={{ backgroundColor: mapColors.ACTIVE_ROUTE }} onClick={() => handleColorPatchClick(SettingsActionTypes.ACTIVE_ROUTE)} id="colorPicker" className="w-10 h-10 rounded-full  border  border-white"></button>
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="colorPicker" className="text-sm font-normal text-ent-white">Non-Active Routes:</label>
                            <button style={{ backgroundColor: mapColors['NON_ACTIVE_ROUTE'] }} onClick={() => handleColorPatchClick(SettingsActionTypes.NON_ACTIVE_ROUTE)} id="colorPicker" className="w-10 h-10 rounded-full border border-white "></button>
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="colorPicker" className="text-sm font-normal text-ent-white">Compass:</label>
                            <button style={{ backgroundColor: mapColors.COMPASS }} onClick={() => handleColorPatchClick(SettingsActionTypes.COMPASS)} id="colorPicker" className="w-10 h-10 rounded-full border  border-white"></button>
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="colorPicker" className="text-sm font-normal text-ent-white">Navigation Vector:</label>
                            <button style={{ backgroundColor: mapColors.NAVIGATION_VECTOR }} onClick={() => handleColorPatchClick(SettingsActionTypes.NAVIGATION_VECTOR)} id="colorPicker" className="w-10 h-10 rounded-full border border-white "></button>
                        </div>
                    </div>}
                <div className='absolute w-full '>
                    {displayColorPicker &&
                        <div >
                            <div className='relative'></div>
                            <HexColorPicker color={mapColors[activeColorPatch as keyof typeof mapColors]} onChange={handleChangeColor} />
                            <div className='absolute  top-[-16px] w-[24px] h-[24px] rounded-md bg-white text-center right-0 text-black text-[16px]' onClick={() => setDisplayColorPicker(false)}>X</div>
                        </div>}
                </div>
            </div>
            <br></br><br></br><br></br>
        </div>
    );
}

export default React.memo(Settings);