import React from 'react'

const IcloudList = () => {
    const icloudList  = [
        {
            name:'iCloud Drive',
            icon: 'cloud download icon'
        },
        {
            name:'Documents',
            icon: 'clock outline icon'
        },
        {
            name:'Desktop',
            icon: 'desktop icon'
        }
             

]
    return (
        <div>
         
            <ul className="list">
            <div style={{fontWeight:'bold',color:'#adadad'}}>iCloud</div>
            {
                icloudList.map(element=>{
                    return <li  key={element.name} className='list-items'>
                        <div style={{display:'flex'}}>
                                <i className={element.icon} style={{marginRight:'10px', color:'rgb(0, 212, 255)'}}></i>
                                <span className="content" style={{color:'white'}}>
                              {element.name}
                                </span>
                             </div>
                    </li>
                })
            }
            </ul>
        </div>
    )
}

export default IcloudList;