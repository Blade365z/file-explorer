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
    const [DirectoryPointerOffset, setDirectoryPointerOffset] = useState(0);
    const [DirectoryPointerRow, setDirectoryPointerRow] = useState(0);


    const [selected, setselected] = useState('Amitabh')


    useEffect(() => {
        let temp = traceDirectories(DirectoryStack[0]);
        setCurrentDirectoryList(temp)
    }, [DirectoryStack]);

    const sideBarSelect = (tab) => {
        setselected(tab); //Selected SideBarTab
        exploreFolder(tab)
    }
    const exploreFolder = (dir) => {
        if (directoryTree['home'][dir]) {
            //Means it is a home directory
            //Append the DirectoryStack
            let row = DirectoryPointerRow;
            let dirStackTemp = DirectoryStack;
            if (row !== dirStackTemp.length - 1) {
                row = dirStackTemp.length - 1;
                setDirectoryPointerRow(row);
                setDirectoryPointerOffset(0);
            }
            if (DirectoryStack[row][0] === dir) {
                dirStackTemp[row] = [dir];
                setDirectoryStack(dirStackTemp);
            } else {
                row += 1;
                setDirectoryPointerOffset(0);
                setDirectoryPointerRow(row);
                dirStackTemp.push([dir]);
                setDirectoryStack(dirStackTemp);
            }
            //Trace Directory Items
            let temp = traceDirectories(dirStackTemp[row]);
            setCurrentDirectoryList(temp)
        } else {
            let offset = DirectoryPointerOffset;
            let row = DirectoryPointerRow;
            let dirStackTemp = DirectoryStack;
            if (offset !== dirStackTemp[row].length - 1) {
                dirStackTemp[row] = dirStackTemp[row].slice(0, offset + 1);
                offset = dirStackTemp[row].length - 1;
                setDirectoryPointerOffset(offset);
            }
            dirStackTemp[row].push(dir);
            offset += 1;
            setDirectoryPointerOffset(offset);
            setDirectoryStack(dirStackTemp);

            //Trace Directory Items
            let temp = traceDirectories(dirStackTemp[row]);
            setCurrentDirectoryList(temp)
        }
    }
    const traceDirectories = (traceArr) => {
        let temp = [];
        console.log(traceArr)
        for (let i = 0; i < traceArr.length; i++) {
            if (i === 0) {
                temp = directoryTree['home'][traceArr[i]]['child'];
            } else {
                if (temp[traceArr[i]])
                    temp = temp[traceArr[i]]['child'];
            }
        }
        return temp;
    }
    const handleGoBack = () => {
        let row = DirectoryPointerRow;
        let offset = DirectoryPointerOffset;
        let dirStackTemp = DirectoryStack.map(e => e);
        if (offset === 0 && row === 0) {
            //TODO::DISABLE BACK BUTTON
        } else {
            if (row!==0 && offset === 0) {
                row -= 1;
                setDirectoryPointerRow(row);
                offset = dirStackTemp[row].length - 1;
                setDirectoryPointerOffset(offset);
                let temp = traceDirectories(dirStackTemp[row]);
                setCurrentDirectoryList(temp)
            } else {
                let path = dirStackTemp[row].slice(0, offset);
                offset = offset - 1;
                setDirectoryPointerOffset(offset);
                let temp = traceDirectories(path);
                setCurrentDirectoryList(temp)
            }
        }
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
