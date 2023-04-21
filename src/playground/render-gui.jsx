import React from 'react';
import GUI from '../containers/gui.jsx';

const searchParams = new URLSearchParams(location.search);
const cloudHost = searchParams.get('cloud_host') || null;
const saveSB3To = searchParams.get('save_sb3') || null;


const RenderGUI = props => (
    <GUI
        cloudHost={cloudHost}
        canSave={!!saveSB3To}
        basePath={process.env.ROOT}
        canEditTitle
        enableCommunity
        {...props}
    />
);

export default RenderGUI;
