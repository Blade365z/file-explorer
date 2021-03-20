import React,{useEffect, useState} from 'react'

const FavouriteList = (props) => {
    const [currentlySelected, setcurrentlySelected] = useState(null);
    useEffect(()=>{
       setcurrentlySelected(props.defaultSelected);
    })
    const handleSideBarClick = (selected) => {
            props.onSelect(selected);
    }
    const favourites  = [
        {
            name:'Air_Drop',
            icon: 'cloud download icon'                     
        },
        {
            name:'Recents',
            icon: 'clock outline icon'
        },
        {
            name:'Applications',
            icon: 'desktop icon'
        },
        {
            name:'Downloads',
            icon: 'download icon'
        },
        {
            name:'Amitabh',
            icon: 'home icon'
        },
        {
            name:'Music',
            icon: 'music icon'
        },
        {
            name:'Movies',
            icon: 'video icon'
        },{
            name:'Creative_Cloud_Files',
            icon: 'folder  icon'
        },

]
    return (
        <div>
         
            <ul className="list">
            <div style={{fontWeight:'bold',color:'#adadad'}}>Favourites</div>
            {
                favourites.map(favourite=>{
                    return <li   key={favourite.name} className={favourite.name===currentlySelected? 'list-items active' : 'list-items'}>
                        <div style={{display:'flex'}} onClick={()=>{handleSideBarClick(favourite.name)}}>
                                <i className={favourite.icon} style={{marginRight:'10px', color:'rgb(0, 162, 255)'}}></i>
                                <span className="content" style={{color:'white'}}>
                              {favourite.name.replace('_',' ')}
                                </span>
                             </div>
                    </li>
                })
            }
            </ul>
        </div>
    )
}

export default FavouriteList;