import React, { useEffect, useState, useRef } from 'react'
import FavouriteList from './FavouriteList'

import './App.css';
import IcloudList from './IcloudList';
import { initalizeDirectoryStructure } from './helper';
import { Nav } from './Nav';
import Explorer from './Explorer';
import NewFolder from './NewFolder';
var directoryTree = initalizeDirectoryStructure();

const App = () => {
    //Keep Track of the directory
    const [DirectoryStack, setDirectoryStack] = useState(Array(['17772']));
    const [CurrentDirectoryList, setCurrentDirectoryList] = useState([]);
    const [Path, setPath] = useState([])
    const [DirectoryPointerOffset, setDirectoryPointerOffset] = useState(0);
    const [DirectoryPointerRow, setDirectoryPointerRow] = useState(0);


    const [selected, setselected] = useState('Amitabh')
    const [DraggedDirs, setDraggedDirs] = useState({
        grabbed: null,
        target: null
    });
    const [CreateNewFolder, setCreateNewFolder] = useState(false);



    useEffect(() => {
        let temp = traceDirectories(DirectoryStack[0]);
        setCurrentDirectoryList(temp);
        // document.addEventListener('contextmenu',function(e){
        //     e.preventDefault();
        // })
    }, []);

    useEffect(() => {
        getDirectoryNames(DirectoryStack[DirectoryPointerRow])
    }, [CurrentDirectoryList])

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
            console.log('Back Reached!')
            //TODO::DISABLE BACK BUTTON
        } else {
            if (row !== 0 && offset === 0) {
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
    const handleGoForward = () => {
        let row = DirectoryPointerRow;
        let offset = DirectoryPointerOffset;
        let dirStackTemp = DirectoryStack.map(e => e);
        if (row === dirStackTemp.length - 1 && offset === dirStackTemp[row].length - 1) {
            console.log('Forward Reached!')
            //TODO::DISABLE FORWARD BUTTON
        } else {
            if (row !== dirStackTemp.length - 1 && offset === dirStackTemp[row].length - 1) {
                row += 1;
                setDirectoryPointerRow(row);
                offset = 0;
                setDirectoryPointerOffset(offset);
                let path = dirStackTemp[row].slice(0, offset + 1)
                let temp = traceDirectories(path);
                setCurrentDirectoryList(temp)
            } else {
                offset = offset + 1;
                let path = dirStackTemp[row].slice(0, offset + 1);
                setDirectoryPointerOffset(offset);
                let temp = traceDirectories(path);
                setCurrentDirectoryList(temp)
            }
        }
    }

    //Draggable Logic 
    const dragStartHandler = (e, dir) => {
        setDraggedDirs({
            grabbed: dir,
            target: null
        })
        e.dataTransfer.setData("dir", dir);
    }

    const dragOverHandler = (e, dir) => {
        e.preventDefault();
        if (DraggedDirs.grabbed !== dir) {
            setDraggedDirs({
                grabbed: DraggedDirs.grabbed,
                target: dir
            });
        }
    }
    const dragOnHandler = (e, dir) => {
        let dirGrabbed = e.dataTransfer.getData("dir");
        if (dirGrabbed !== dir) {
            //Logic comes here
            let row = DirectoryPointerRow;
            let offset = DirectoryPointerOffset;
            let dirStackTemp = DirectoryStack.map(e => e);
            let path = dirStackTemp[row].slice(0, offset + 1);
            // path.push(dirGrabbed);
            var grabbedDirectories = traceDirectories(path)
            path.pop();
            processDirectoryTree(dirGrabbed, grabbedDirectories[dirGrabbed], dir, false, true);
        }
    }
    const processDirectoryTree = (dir = null, baseDir, targetDir, insertFlag = false, filterFLag = false, renameFlag = false) => {
        // directly mutate in directoryTree and set DirectoryStack
        if (insertFlag) {
            dir = Math.floor(Date.now() / 1000); // Assigning key to new folder
        }
        //traversing the directory tree.,
        function iter(directoryTreeArr) {
            Object.keys(directoryTreeArr).forEach(function (k) {
                //move the directory to target context
                if (k === targetDir) {
                    if (insertFlag) {
                        directoryTreeArr[k]['child'][dir] = baseDir;
                        return;
                    } else if (renameFlag) {
                        directoryTreeArr[k]['name'] = dir;
                        return;
                    }
                }
                //remove original
                if (k === dir && filterFLag === true) {
                    delete directoryTreeArr[k];
                }
                if (directoryTreeArr[k] !== null && typeof directoryTreeArr[k] === 'object') {
                    //reccursively traversing the directory Tree (Nested Object)
                    iter(directoryTreeArr[k]);
                    return;
                }
            });
            return directoryTreeArr;
        }
        directoryTree = iter(directoryTree)
    }
    const dragEndHandler = (e, dir) => {
        setDraggedDirs({
            grabbed: null,
            target: null
        })
    }

    const dragLeaveHandle = () => {
        setDraggedDirs({
            grabbed: DraggedDirs.grabbed,
            target: null
        })
    }




    const getDirectoryNames = (traceArr) => {
        let tempTrack = [];
        let DirNames = [];
        for (let i = 0; i < traceArr.length; i++) {
            if (i === 0) {
                tempTrack = directoryTree['home'][traceArr[i]]['child'];
                DirNames.push(directoryTree['home'][traceArr[i]]['name'])
            } else {
                if (tempTrack[traceArr[i]]) {
                    let dir = tempTrack[traceArr[i]]['name']
                    tempTrack = tempTrack[traceArr[i]]['child']
                    DirNames.push(dir)
                }
            }
        }
        DirNames = DirNames.slice(0, DirectoryPointerOffset + 1); // To filter directory path  only upto current Offset
        setPath(DirNames);
        return DirNames;
    }



    //Create New Folder
    const handleOpenNewFolderModal = () => {
        setCreateNewFolder(true);
    }
    const handleCloseNewFolderModal = () => {
        setCreateNewFolder(false);
    }
    const createNewFolder = (name) => {
        setCreateNewFolder(false);
        let newObj = {
            name: name,
            child: {}
        }
        let target = DirectoryStack[DirectoryPointerRow][DirectoryPointerOffset]
        processDirectoryTree(null, newObj, target, true, false);
    }


    //Rename directory Logic
    const renameDirectory = (newName, target) => {
        processDirectoryTree(newName, null, target, false, false, true);
    }

    return (
        <div  >
            <NewFolder
                openModal={CreateNewFolder}
                cancelCreate={handleCloseNewFolderModal}
                createFolder={createNewFolder}
            />
            <div className="wrapper">
                <div className="sidebar">

                    <FavouriteList defaultSelected={selected} onSelect={sideBarSelect} />
                    <IcloudList />
                </div>
                <div className="pusher">
                    <Nav onGoBack={handleGoBack} onGoForward={handleGoForward} currentPath={Path} />
                    <Explorer
                        DraggedOverIcon={DraggedDirs.target}
                        directories={CurrentDirectoryList}
                        exploreFolder={exploreFolder}
                        dragStartHandler={dragStartHandler}
                        dragOverHandler={dragOverHandler}
                        dragOnHandler={dragOnHandler}
                        dragEndHandler={dragEndHandler}
                        dragLeaveHandle={dragLeaveHandle}
                        openModal={handleOpenNewFolderModal}
                        renameDirectory={renameDirectory}
                    />
                </div>
            </div>
        </div>
    )
}
export default App;
