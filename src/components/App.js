import React, { useEffect, useState, useRef } from 'react'
import FavouriteList from './FavouriteList'

import './App.css';
import IcloudList from './IcloudList';
import { initalizeDirectoryStructure, updateDirectoryTree } from './helper';
import { Nav } from './Nav';
import Explorer from './Explorer';
import NewFolder from './NewFolder';
import { WindowButtons } from './WindowButtons';
var directoryTree = initalizeDirectoryStructure();

const App = () => {
    //Keep Track of the directory
    const [DirectoryStack, setDirectoryStack] = useState(Array(['17772']));
    const [CurrentDirectoryList, setCurrentDirectoryList] = useState([]);
    const [Path, setPath] = useState([])
    const [DirectoryPointerOffset, setDirectoryPointerOffset] = useState(0);
    const [DirectoryPointerRow, setDirectoryPointerRow] = useState(0);


    const [selectedSideBarTab, setselectedSideBarTab] = useState('17772')
    const [selectedDirecrtory, setselectedDirecrtory] = useState(null)
    const [DraggedDirs, setDraggedDirs] = useState({
        grabbed: null,
        target: null
    });
    const [SearchKeyword, setSearchKeyword] = useState('')

    const [CreateNewFolder, setCreateNewFolder] = useState(false);
    const [GridMode, setGridMode] = useState(true);


    const [navigationButtonsEnabled, setnavigationButtonsEnabled] = useState({
        back: false,
        forward: false,
    })


    useEffect(() => {
        let temp = traceDirectories(DirectoryStack[0]);
        setCurrentDirectoryList(temp);
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        })
    }, []);

    useEffect(() => {
        getDirectoryNames(DirectoryStack[DirectoryPointerRow])
        setSearchKeyword('')
    }, [CurrentDirectoryList])

    //On Icon Select 
    const selectDirectory = (key) => {
        setselectedDirecrtory(key);
    }

    //on SideBar Select
    const sideBarSelect = (key) => {
        setselectedSideBarTab(key); //Selected SideBarTab
        exploreFolder(key)
    }


    //Explore directory using key
    const exploreFolder = (dir) => {
        setnavigationButtonsEnabled({
            back: true,
            forward: navigationButtonsEnabled.forward
        });
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
    //Trace Directory Hierarchy
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


    //On Go Back Click
    const handleGoBack = () => {
        let row = DirectoryPointerRow;
        let offset = DirectoryPointerOffset;
        let dirStackTemp = DirectoryStack.map(e => e);
        if (offset === 0 && row === 0) {
            setnavigationButtonsEnabled({
                back: false,
                forward: true
            });
            //TODO::DISABLE BACK BUTTON
        } else {
            setnavigationButtonsEnabled({
                back: navigationButtonsEnabled.back,
                forward: true
            });
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
    //On go Forward Click
    const handleGoForward = () => {
        let row = DirectoryPointerRow;
        let offset = DirectoryPointerOffset;
        let dirStackTemp = DirectoryStack.map(e => e);
        if (row === dirStackTemp.length - 1 && offset === dirStackTemp[row].length - 1) {
            setnavigationButtonsEnabled({
                back: true,
                forward: false
            });
            //TODO::DISABLE FORWARD BUTTON
        } else {
            setnavigationButtonsEnabled({
                back: true,
                forward: navigationButtonsEnabled.forward
            });
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
            processDirectoryTree(dirGrabbed, grabbedDirectories[dirGrabbed], dir, true, true);
        }
    }


    //Main heart of proccessing directories 
    //INSERT,DELETE,RENAME,MOVE
    const processDirectoryTree = (dir = null, baseDir, targetDir, insertFlag = false, filterDuplicatesFLag = false, renameFlag = false, deleteOnlyFlag) => {
        // directly mutate in directoryTree and set DirectoryStack
        if (insertFlag && !dir) {
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
                    } else if (deleteOnlyFlag) {
                        delete directoryTreeArr[k];
                    }
                }
                //remove original
                if (k === dir && filterDuplicatesFLag === true) {
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
        updateDirectoryTree(directoryTree)
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



    //Grab all underlying directories based on a path, path = array elements    
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

    //Delete directory Logic
    const deleteDirectory = (target) => {
        processDirectoryTree(null, null, target, false, false, false, true);
    }
    //To change View
    const changeView = () => {
        setGridMode(!GridMode)
    }

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword)
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
                    <WindowButtons />
                    <FavouriteList defaultSelected={selectedSideBarTab} onSelect={sideBarSelect} />
                    <IcloudList />
                </div>
                <div className="pusher" style={{ width: '100%' }}>
                    <Nav
                    navigationButtonsEnabled={navigationButtonsEnabled}
                        onGoBack={handleGoBack}
                        onGoForward={handleGoForward}
                        currentPath={Path}
                        gridMode={GridMode}
                        changeView={changeView}
                        openModal={handleOpenNewFolderModal}
                        handleSearch={handleSearch}
                    />
                    <Explorer
                        selectedDirecrtory={selectedDirecrtory}
                        handleSelectDirectory={selectDirectory}
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
                        deleteDirectory={deleteDirectory}
                        gridMode={GridMode}
                        searchKeyword={SearchKeyword}
                    />
                </div>
            </div>
        </div>
    )
}
export default App;
