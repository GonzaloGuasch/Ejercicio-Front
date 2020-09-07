import React from 'react'
import axios from 'axios'
import './adiseas.css'
function Adisease(props) {

function deleteDisease() {
    axios
    .delete(props.info.url)
    .then(res => refreshW())
}
function refreshW() {
    window.location.reload(false)
}
    return(
    <div className="diseas-container">
        <div>{props.info.name}</div>
        <button onClick={deleteDisease} >DELETE</button>
    </div>
    )
}


export default Adisease