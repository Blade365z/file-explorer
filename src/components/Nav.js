import React from 'react'

export const Nav = (props) => {
    const handleClick = (type) => {
        props.onGoBack(type);
    }
    return (
        <div className="ui menu">
            <div className="item">
                <div style={{ display: 'flex', fontSize: '2em' }}>
                    <div className="ui nav-icon" title="Go Back" onClick={() => { handleClick('back') }}><i className="angle left icon "></i></div>
                    <div className="ui nav-icon" title="Go Forward"><i className="angle right icon "></i></div>

                </div>
            </div>
        </div>
    )
}
