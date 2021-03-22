import React,{useState,useEffect} from 'react'
import PathBox from './PathBox';

export const Nav = (props) => {
    const [searchBarShow, setsearchBarShow] = useState(false)
    useEffect(() => {
        setsearchBarShow(false)
    },[props.currentPath])
    const handleNavigationClick = (type) => {
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
                    <div className={props.navigationButtonsEnabled.back ? "ui nav-icon" : "ui nav-icon disabled"} title="Go Back" onClick={() => { handleNavigationClick('back') }}><i className="angle left icon "></i></div>
                    <div className={props.navigationButtonsEnabled.forward ? "ui nav-icon" : "ui nav-icon disabled"}   title="Go Forward" onClick={() => { handleNavigationClick('forward') }}><i className="angle right icon "></i></div>

                </div>
            </div>
            <div className="item">
                <PathBox currentPath={props.currentPath} />
            </div>
            <div className="item" style={{ marginLeft: 'auto' }}>
               {searchBarShow && <div className="ui  input" id="nav-search">
                    <input type="text" placeholder="Search Directories" onChange={(e)=>props.handleSearch(e.target.value.trim())} />
                </div>}
                <div className="searchBtn-nav nav-tool-icon"  onClick={()=>setsearchBarShow(!searchBarShow)}>
                    <i className="search icon"></i>
                </div>
                <div className="ui nav-tool-icon " onClick={() => { props.changeView() }}>
                    {props.gridMode === true ? <i className="list icon" title="List view"></i> : <i className="th icon" title="Grid view"></i>}
                </div>
                <div className="ui nav-tool-icon " onClick={() => { props.openModal() }}>
                     <i className="folder icon" title="Create new folder" ></i> 
                </div>
            </div>

        </div>
    )
}
