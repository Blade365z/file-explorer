import React, { useEffect, useState } from 'react'
import FavouriteList from './FavouriteList'

import './App.css';
import IcloudList from './IcloudList';
import { initalizeDirectoryStructure } from './helper';
import { Nav } from './Nav';
import Explorer from './Explorer';

const App = () => {
    var directoryTree = [];
    //Keep Track of the directory
    const [DirectoryStack, setDirectoryStack] = useState([['Amitabh']]);
    const [CurrentDirectoryList,setCurrentDirectoryList] = useState([]);
    var directoryPointer = 0 ;

    const [selected, setselected] = useState('Amitabh')
    useEffect(() => {
        directoryTree = initalizeDirectoryStructure();
        directoryPointer = DirectoryStack.length;
    });
    const sideBarSelect = (tab) => {
        setselected(tab);
        if (directoryTree['home'][DirectoryStack[DirectoryStack.length - 1][0]]) {
            if (DirectoryStack[DirectoryStack.length - 1][0] === tab) {
            }
            else{
                setDirectoryStack([...DirectoryStack, [tab]])
            }
        }
        setCurrentDirectoryList(directoryTree['home'][tab])
    }
    const exploreFolder = (dir) => {
            let currentTrack = DirectoryStack[directoryPointer-1];
            
    }
    return (
        <div >
            <div className="ui left vertical menu sidebar animating visible" style={{ backgroundColor: '#424146' }}>
                <FavouriteList defaultSelected={selected} onSelect={sideBarSelect} />
                <IcloudList />
            </div>
            <div className="pusher">
                <Nav />
                <Explorer directories={CurrentDirectoryList}  exploreFolder={exploreFolder}/>
            </div>
        </div>
    )
}
export default App;
