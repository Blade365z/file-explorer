import React, { useEffect, useState, useRef } from 'react'
import FavouriteList from './FavouriteList'

import './App.css';
import IcloudList from './IcloudList';
import { initalizeDirectoryStructure } from './helper';
import { Nav } from './Nav';
import Explorer from './Explorer';

const App = () => {
    var directoryTree = initalizeDirectoryStructure();
    //Keep Track of the directory
    const [DirectoryStack, setDirectoryStack] = useState(Array(['17772']));
    const [CurrentDirectoryList, setCurrentDirectoryList] = useState([]);
    const [DirectoryPointer, setDirectoryPointer] = useState([]);


    const [selected, setselected] = useState('Amitabh')


    useEffect(() => {
        setDirectoryPointer(DirectoryStack.length);
        exploreFolder(DirectoryStack[DirectoryStack.length - 1][0])
    }, [DirectoryStack]);

    const sideBarSelect = (tab) => {
        setselected(tab); //Selected SideBarTab
        exploreFolder(tab)
    }
    const exploreFolder = (dir) => {
        if (directoryTree['home'][dir]) {
            if (DirectoryStack[DirectoryStack.length - 1][0] === dir) {
                let dirStackTemp = DirectoryStack;
                dirStackTemp[dirStackTemp.length - 1] = [dir];
                setDirectoryStack(dirStackTemp); // Handling case if Sidebar click and again clicked on same parent directory
            }
            else {
                setDirectoryStack([...DirectoryStack, [dir]])
            }
            // console.log(directoryTree['home'][dir])
            setCurrentDirectoryList(directoryTree['home'][dir]['child']);
        } else {
            let pointer = DirectoryPointer;
            if (DirectoryPointer !== DirectoryStack.length) {
                let dirTemp = DirectoryStack;
                dirTemp = dirTemp.slice(0, DirectoryPointer);
                setDirectoryPointer(DirectoryStack.length);
                pointer = DirectoryStack.length;
            }
            let dirStackTemp = DirectoryStack;
            let currentTrack = dirStackTemp[pointer - 1];
            currentTrack.push(dir);
            dirStackTemp[pointer - 1] = currentTrack;
            setDirectoryStack(dirStackTemp);
            let temp = traceDirectories(currentTrack);
            //Iteratively find the directories of current context.

            if (temp)
                setCurrentDirectoryList(temp)
        }
    }
    const traceDirectories = (traceArr) => {
        console.log(traceArr)
        let temp = [];
        for (let i = 0; i < traceArr.length; i++) {
            if (i === 0) {
                temp = directoryTree['home'][traceArr[i]]['child'];
            }else{
                if(temp[traceArr[i]])
                temp = temp[traceArr[i]]['child'];
            }
        }
        return temp;
    }
    const handleGoBack = () => {
        let dirTemp = DirectoryStack[DirectoryPointer - 1];
        if(DirectoryStack[0].length > 1 || DirectoryStack.length>1){
            dirTemp.pop();
        }
        if (dirTemp.length === 0) {
            if (DirectoryPointer > 0) {
                let temp  = DirectoryStack;
                temp.pop();
                setDirectoryPointer(DirectoryPointer - 1) // Decrement only if Directory  stack's ELEMENT is 0 length
                setDirectoryStack(temp)
            }
        }
        console.log(DirectoryPointer)
        // let temp = dirTemp.length === 0  ?  traceDirectories(DirectoryStack[DirectoryPointer-1]):traceDirectories(dirTemp);
        // if (temp)
        //     setCurrentDirectoryList(temp)
    }
    return (
        <div >
            <div className="ui left vertical menu sidebar animating visible" style={{ backgroundColor: '#424146' }}>
                <FavouriteList defaultSelected={selected} onSelect={sideBarSelect} />
                <IcloudList />
            </div>
            <div className="pusher">
                <Nav onGoBack={handleGoBack} />
          <Explorer directories={CurrentDirectoryList} exploreFolder={exploreFolder} />
            </div>
        </div>
    )
}
export default App;
