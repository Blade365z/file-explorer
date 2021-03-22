import React, { useState } from 'react'

const NewFolder = (props) => {
    const [DirName, setDirName] = useState(null)
    const handleCancelBtn = (e) => {
        e.preventDefault();
        props.cancelCreate()
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.createFolder(DirName);
    }
    return (
        <div className={props.openModal === true ? "modal modal-show" : "modal modal-hide"}>
            <div className="modal-content">
                <form onSubmit={(e)=>{handleSubmit(e)}}>
                    <div style={{ display: 'flex', backgroundColor: '#424146', padding: '10px' }}>
                        <div style={{ marginRight: 'auto' }}><button onClick={(e) => {handleCancelBtn(e)}} className="ui small button">Cancel</button></div>
                        <div><h4 style={{ margin: '0px', marginTop: '5px' }}>Create New Folder</h4></div>
                        <div style={{ marginLeft: 'auto' }}><button className="ui small button">Confirm</button></div>
                    </div>
                    <div style={{ padding: '10px', backgroundColor: '#fefefe' }}>
                        <h5 style={{ color: 'black', marginBottom: '2px' }}>Folder name</h5>
                        <div className="ui input" style={{ width: '80%' }}>
                            <input type="text" placeholder="Search..." onChange={(e)=>setDirName(e.target.value.trim())}  required/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default NewFolder;
