import React, { useState, useEffect } from 'react'

const PathBox = (props) => {
    const [Path, setPath] = useState([]);
    useEffect(() => {

    })


    return (
        <div>
            <button className="ui small inverted grey basic button">Home</button>
            <button className="ui small inverted grey basic button">Music</button>
        </div>
    )
}

export default PathBox;