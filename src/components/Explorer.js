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
            name: input,
            key: rightClickedFor.key
        })
        setNewName(input)
    }
    const submitRenameForm = (e) => {
        e.preventDefault();
        setShowRenameMenu(false);
        setNewName(null);
        props.renameDirectory(newName, rightClickedFor.key)
    }

    var count = 0;
    return (
        <div className={props.gridMode ? "explorer" : "list-explorer"}>

            { Object.entries(DirList).length > 0 ? Object.entries(DirList).map((name, value) => {
                if (props.searchKeyword) {
                    if (!DirList[name[0]]['name'].toLowerCase().includes(props.searchKeyword.toLowerCase()))
                        return;
                }
                count += 1;
                return <div key={name[0]}>    <div className={props.selectedDirecrtory === name[0] ? "folder-large active" : "folder-large"}
                    draggable
                    onClick={() => { props.handleSelectDirectory(name[0]) }}
                    onDoubleClick={() => { handleFolderClick(name[0]) }}
                    onDragStart={(e) => { props.dragStartHandler(e, name[0]) }}
                    onDragOver={(e) => { props.dragOverHandler(e, name[0]) }}
                    onDrop={(e) => { props.dragOnHandler(e, name[0]) }}
                    onDragEnd={(e) => { props.dragEndHandler(e, name[0]) }}
                    onDragLeave={(e) => { props.dragLeaveHandle(e, name[0]) }}>

                    <i onContextMenu={(e) => { openContextMenu(e, name[0], DirList[name[0]]['name']) }} style={{ marginTop: '12px' }} className={name[0] === props.DraggedOverIcon ? "folder open icon" : "folder icon"}></i>
                    <span className="folder-name">
                        {DirList[name[0]]['name']}
                    </span>

                </div>

                </div>
            }) : <div style={{ textAlign: "center" }}><h3>Folder is Empty.</h3></div>

            }
            {props.searchKeyword && Object.entries(DirList).length > 0 && count===0 && <div style={{ textAlign: "center" }}><h3>Not Found.</h3></div>}
            {showMenu && <div className="menu" style={{ top: MenuY + 5, left: MenuX, position: 'absolute', backgroundColor: '#FFFF', color: 'black' }}>
                <ul className="context-menu" >
                    <li className="item" onClick={() => { setShowRenameMenu(true) }}>
                        Rename...
                            </li>
                    <li className="item" onClick={() => { props.deleteDirectory(rightClickedFor.key) }}>
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
