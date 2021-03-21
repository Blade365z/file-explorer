import React, { useEffect, useState } from 'react'

const Explorer = (props) => {
    const [DirList, setDirList] = useState([])
    const handleFolderClick = (folder) => {
        props.exploreFolder(folder)
    }
    useEffect(() => {
        setDirList(props.directories);
    })
    return (
        <div className="explorer">
            { DirList && Object.entries(DirList).map((name, value) => {
                return <div className="folder-large" key={name}
                    draggable
                    onClick={() => { handleFolderClick(name[0]) }}
                    onDragStart={(e) => { props.dragStartHandler(e, name[0]) }}
                    onDragOver={(e) => { props.dragOverHandler(e, name[0]) }}
                    onDrop={(e) => { props.dragOnHandler(e, name[0]) }}
                    onDragEnd={(e) => { props.dragEndHandler(e, name[0]) }}
                    onDragLeave={(e)=>{props.dragLeaveHandle(e,name[0])}}>
             
                    <i className={name[0]===props.DraggedOverIcon ?"folder open icon": "folder icon"}></i>
                    <div className="folder-name">
                        {DirList[name[0]]['name']}
                    </div>
                </div>
            })}
        </div>
    )
}

export default Explorer;
