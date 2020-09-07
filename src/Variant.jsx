import React from 'react'
import axios from 'axios'
import './variant.css'


function Variant(props) {
function seeGenes() {
    axios
    .get(`http://127.0.0.1:8000/genOfVarian/${props.info.reference}`)
    .then(r => showG(r.data))
}

function showG(gen) {
   alert(`Gen symbol: ${gen.symbol}`)
}

function deleteVariant() {
    axios
    .delete(`http://localhost:8000/variant/${props.info.id}/`)
    .then(res => refreshW())
}
function refreshW() {
    window.location.reload(false)
}
    return(
    <div className="variant_container">
        <div>chromosome_number: {props.info.chromosome_number}</div>
        <div>position: {props.info.position}</div>
        <div>id_variant: {props.info.id_variant}</div>
        <div>reference: {props.info.reference}</div>
        <div>alternative: {props.info.alternative}</div>
        
    <div><button onClick={seeGenes} className="input-button">See gen of variant</button></div>
    <button className="input-button" onClick={deleteVariant}>DELETE</button>
    </div>
    )
}

export default Variant