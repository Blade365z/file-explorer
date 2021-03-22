import React, { useEffect, useRef, useState } from 'react'


const Explorer = (props) => {

    const outerRef = useRef(null);

    const [DirList, setDirList] = useState([])
    const handleFolderClick = (folder) => {
        props.exploreFolder(folder)
    }
    const [MenuX, setMenuX] = useState('0px');
    const [MenuY, setMenuY] = useState('0px');
    const [showMenu, setShowMenu] = useState(false);
    const [showRenameMenu, setShowRenameMenu] = useState(false)
    const [rightClickedFor, setRightClickedFor] = useState({
        name: null,
        key: null
    });

    const [newName, setNewName] = useState(null)

    const openContextMenu = (e, key, name) => {
        e.preventDefault();
        setMenuX(e.pageX)
        setMenuY(e.pageY)
        setShowMenu(true);
        setRightClickedFor({
            name: name,
            key: key
        });
    }
    useEffect(() => {
        setDirList(props.directories);

    }, [props.directories])
    useEffect(() => {
        document.addEventListener('click', function () {
            setShowMenu(false);
        });
    })
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
        function handleClick(e) {
            if (outerRef && outerRef.current) {
                const ref = outerRef.current
                if (!ref.contains(e.target)) {
                    setShowRenameMenu(false);
                    setNewName(null);
                }
            }
        }
    }, [])
    const handleRenameInputChange = (input) => {
        setRightClickedFor({
            name:input,
            key:rightClickedFor.key
        })
        setNewName(input)
    }
    const submitRenameForm = (e) => {
        e.preventDefault();
        props.renameDirectory(newName, rightClickedFor.key)
    }


    return (
        <div className="explorer">
            { DirList && Object.entries(DirList).map((name, value) => {
                return <div key={name}>    <div className="folder-large"
                    draggable
                    onDoubleClick={() => { handleFolderClick(name[0]) }}
                    onDragStart={(e) => { props.dragStartHandler(e, name[0]) }}
                    onDragOver={(e) => { props.dragOverHandler(e, name[0]) }}
                    onDrop={(e) => { props.dragOnHandler(e, name[0]) }}
                    onDragEnd={(e) => { props.dragEndHandler(e, name[0]) }}
                    onDragLeave={(e) => { props.dragLeaveHandle(e, name[0]) }}>

                    <i onContextMenu={(e) => { openContextMenu(e, name[0], DirList[name[0]]['name']) }} style={{ marginTop: '10px' }} className={name[0] === props.DraggedOverIcon ? "folder open icon" : "folder icon"}></i>
                    <div className="folder-name">
                        {DirList[name[0]]['name']}
                    </div>

                </div>

                </div>
            }
            )}
            {showMenu && <div className="menu" style={{ top: MenuY + 5, left: MenuX, position: 'absolute', backgroundColor: '#FFFF', color: 'black' }}>
                <ul className="context-menu" >
                    <li className="item" onClick={() => { setShowRenameMenu(true) }}>
                        Rename...
                            </li>
                    <li className="item">
                        Delete
                            </li>
                    <li className="item" onClick={() => { props.openModal() }}>
                        Create New
                            </li>
                </ul>
            </div>}
            {   showRenameMenu && <div className="menu" ref={outerRef} style={{ top: MenuY + 15, left: MenuX, position: 'absolute', backgroundColor: '#FFFF', color: 'black' }}>
                <div style={{ padding: '5px' }}>
                    <form onSubmit={(e) => submitRenameForm(e)}>
                        <div><h4 style={{ margin: '0px', marginTop: '5px' }}>Rename</h4></div>
                        <div className="ui action input">
                            <input type="text" placeholder="" value={rightClickedFor.name} onChange={(e) => handleRenameInputChange(e.target.value)} />
                            <button className="ui positive button">Rename</button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    )
}

export default Explorer;
