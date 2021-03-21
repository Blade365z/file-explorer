import React from 'react'

const NewFolder = () => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div style={{ display: 'flex', backgroundColor: '#424146', padding: '10px' }}>
                    <div style={{ marginRight: 'auto' }}><button className="ui small button">Cancel</button></div>
                    <div><h4 style={{ margin: '0px', marginTop: '5px' }}>Create New Folder</h4></div>
                    <div style={{ marginLeft: 'auto' }}><button className="ui small button">Confirm</button></div>
                </div>
                <div style={{padding:'10px',backgroundColor: '#fefefe'}}>
                    <h5 style={{color:'black',marginBottom:'2px'}}>Folder name</h5>
                    <div className="ui input" style={{width:'80%'}}>
                        <input type="text" placeholder="Search..."/>
                            </div>
                    </div>
                </div>
            </div>
    )
}
export default NewFolder;
