import React from 'react'

const Explorer = (props) => {
    const handleFolderClick = (folder) => {
        props.exploreFolder(folder)
    }
    return (
        <div>
            {Object.entries(props.directories).map((name, value) => {
                return <button draggable onClick={() => { handleFolderClick(name[0]) }} key={name}>{name[0]}</button>
            })}
        </div>
    )
}

export default Explorer;
