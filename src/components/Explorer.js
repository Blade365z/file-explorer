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
                return <div className="folder-large" draggable onClick={() => { handleFolderClick(name[0]) }} key={name}>
                    <i className="folder icon"></i>
                    <div className="folder-name">
                        {DirList[name[0]]['name']}
                    </div>
                </div>
            })}
        </div>
    )
}

export default Explorer;
