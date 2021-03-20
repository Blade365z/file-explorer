import React, { Component, useEffect, useState } from 'react'
import FavouriteList from './FavouriteList'

import './App.css';
import IcloudList from './IcloudList';
import { initalizeDirectoryStructure } from './helper';
import { Nav } from './Nav';

const App = () => {
    //Keep Track of the directory
    const [DirectoryStack, setDirectoryStack] = useState({ Amitabh: [] })

    useEffect(() => {
        let directoryTree = initalizeDirectoryStructure();
        console.log(directoryTree)
    });

    return (
        <div >
            <div className="ui left vertical menu sidebar animating visible" style={{ backgroundColor: '#424146' }}>
                <FavouriteList />
                <IcloudList />
            </div>
            <div className="pusher">
                        <Nav/>
            </div>
        </div>
    )
}
export default App;
