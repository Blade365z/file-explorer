import React,{useEffect, useState} from 'react'

const FavouriteList = (props) => {
    const [currentlySelected, setcurrentlySelected] = useState(null);
    useEffect(()=>{
       setcurrentlySelected(props.defaultSelected);
    },[props.defaultSelected])
    const handleSideBarClick = (selected) => {
            props.onSelect(selected);
    }
    const favourites  = [
        {
            name:'Air_Drop',
            key:'17772213',
            icon: 'cloud download icon'                     
        },
        {
            name:'Recents',
            key:'177sda21372',
            icon: 'clock outline icon'
        },
        {
            name:'Applications',
            key:'17711172',
            icon: 'desktop icon'
        },
        {
            name:'Downloads',
            key:'177232322',
            icon: 'download icon'
        },
        {
            name:'Amitabh',
             key:'17772',
            icon: 'home icon'
        },
        {
            name:'Music',
            key:'18882',
            icon: 'music icon'
        },
        {
            name:'Movies',
            key:'18883',
            icon: 'video icon'
        },{
            name:'Creative_Cloud_Files',
            key:'177732',
            icon: 'folder  icon'
        },

]
    return (
        <div>
         
            <ul className="list">
            <div style={{fontWeight:'bold',color:'#adadad'}}>Favourites</div>
            {
                favourites.map(favourite=>{
                    return <li   key={favourite.name} className={favourite.key===currentlySelected? 'list-items active' : 'list-items'}>
                        <div style={{display:'flex'}} onClick={()=>{handleSideBarClick(favourite.key)}}>
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