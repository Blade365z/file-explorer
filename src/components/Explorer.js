import React, { useEffect, useState } from 'react'
import { Menu, Item, Separator, Submenu, MenuProvider, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';



const Explorer = (props) => {
    const [DirList, setDirList] = useState([])
    const handleFolderClick = (folder) => {
        props.exploreFolder(folder)
    }
    useEffect(() => {
        setDirList(props.directories);
    })
    const { show } = useContextMenu({
        id: 'hello',
    });
    function handleClick(x){
        console.log(x)
    }
    function handleContextMenu(event) {
        event.preventDefault();
        show(event, {
            props: {
                key: 'value'
            }
        })
    }
    return (
        <div className="explorer">
            { DirList && Object.entries(DirList).map((name, value) => {
                return <div><div className="folder-large" key={name}
                    draggable
                    onClick={() => { handleFolderClick(name[0]) }}
                    onDragStart={(e) => { props.dragStartHandler(e, name[0]) }}
                    onDragOver={(e) => { props.dragOverHandler(e, name[0]) }}
                    onDrop={(e) => { props.dragOnHandler(e, name[0]) }}
                    onDragEnd={(e) => { props.dragEndHandler(e, name[0]) }}
                    onDragLeave={(e) => { props.dragLeaveHandle(e, name[0]) }}>

                    <i onContextMenu={handleContextMenu} style={{ marginTop: '10px' }} className={name[0] === props.DraggedOverIcon ? "folder open icon" : "folder icon"}></i>
                    <div className="folder-name">
                        {DirList[name[0]]['name']}
                    </div>
                </div>
                    <Menu id={'hello'}>
                        <Item onClick={()=>handleClick(name[0])}>Rename</Item>
                        <Item>Delete</Item>
                        <Item>Create New</Item>
                    </Menu>
                </div>
            })}

        </div>
    )
}

export default Explorer;
