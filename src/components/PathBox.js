import React, { useState, useEffect } from 'react'

const PathBox = (props) => {
  
    return (
        <div style={{display:'inline-block'}}>
             <button key={'Home'} className="ui small inverted grey basic button"><i className="home icon"> </i>Home</button> 
            {props.currentPath.map(dir=>{
                return <button key={dir} className="ui small inverted grey basic button">{dir}</button> 
            })}
            {/* */}


        </div>
    )
}

export default PathBox;