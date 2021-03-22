import React, { useState, useEffect } from 'react'

//Path Boxs UI
const PathBox = (props) => {
    const [path, setPath] = useState([]);
    useEffect(() => {
        let pathSliced = props.currentPath;
        //Crop if path > 6 to not overload box
        if (pathSliced.length > 6) {
            pathSliced = pathSliced.slice(pathSliced.length - Math.round(pathSliced.length / 3), pathSliced.length)
            setPath(pathSliced);
        } else {
            setPath(pathSliced);
        }
    }, [props.currentPath])

    return (
        <div style={{ display: 'inline-block' }}>
            { path.length < 4 && <div key={'Home'} className="path-tag" ><i className="home icon"> </i>Home</div>}
            {path.map(dir => {
                return <div key={dir} className="path-tag">{dir}</div>
            })}

        </div>
    )
}

export default PathBox;