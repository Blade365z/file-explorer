import React from 'react'

export const Nav = (props) => {
    const handleClick = (type) => {
        switch (type) {
            case 'back':
                props.onGoBack();
                break;
            case 'forward':
                props.onGoForward();
                break;
            default:
                return null;
                break;
        }
    }
    return (
        <div className="ui menu">
            <div className="item">
                <div style={{ display: 'flex', fontSize: '2em' }}>
                    <div className="ui nav-icon" title="Go Back" onClick={() => { handleClick('back') }}><i className="angle left icon "></i></div>
                    <div className="ui nav-icon" title="Go Forward"  onClick={() => { handleClick('forward') }}><i className="angle right icon "></i></div>

                </div>
            </div>
        </div>
    )
}
