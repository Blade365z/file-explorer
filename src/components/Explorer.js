import React, { useEffect, useRef, useState } from 'react'

import Menu from './Menu';

const Explorer = (props) => {

    const outerRef = useRef(null);

    const [DirList, setDirList] = useState([])
    const handleFolderClick = (folder) => {
        props.exploreFolder(folder)
    }
    const [MenuX, setMenuX] = useState('0px');
    const [MenuY, setMenuY] = useState('0px');
    const [showMenu, setShowMenu] = useState(false);

    const openContextMenu = (e) => {
        e.preventDefault();
        setMenuX(e.pageX)
        setMenuY(e.pageY)
        setShowMenu(true);
    }
    useEffect(() => {
        setDirList(props.directories);
    }, [props.directories])
    return (
        <div className="explorer">
            { DirList && Object.entries(DirList).map((name, value) => {
                return <div key={name}>    <div  className="folder-large"
                    draggable
                    onClick={() => { handleFolderClick(name[0]) }}
                    onDragStart={(e) => { props.dragStartHandler(e, name[0]) }}
                    onDragOver={(e) => { props.dragOverHandler(e, name[0]) }}
                    onDrop={(e) => { props.dragOnHandler(e, name[0]) }}
                    onDragEnd={(e) => { props.dragEndHandler(e, name[0]) }}
                    onDragLeave={(e) => { props.dragLeaveHandle(e, name[0]) }}>

                    <i onContextMenu={(e) => { openContextMenu(e)}}  ref={outerRef} style={{ marginTop: '10px' }} className={name[0] === props.DraggedOverIcon ? "folder open icon" : "folder icon"}></i>
                    <div className="folder-name">
                        {DirList[name[0]]['name']}
                    </div>

                </div>
                  <div className="menu" style={{top:MenuY+5,left:MenuX,position:'absolute',backgroundColor:'#FFFF',color:'black'}}>
                        <ul className="context-menu">
                            <li className="item">
                                Rename
                            </li>
                            <li className="item">
                                Delete
                            </li>
                            <li className="item">
                                Create New
                            </li>
                        </ul>
                  </div>
                </div>
            })}

        </div>
    )
}

export default Explorer;
