import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './UnGen.css'

function UnGen(props) {
const [diseases, setD] = useState([])


useEffect(() => {
    props.info.diseases.map((diseas, i) => {
        axios
        .get(diseas)
        .then(r => addD(r.data.name))
    })
}, [])
function addD(name) {
    diseases.push(name)
    
}
function showDiseases(name) {
    alert(diseases)
}

function showVariants() {
    axios
    .get(`http://127.0.0.1:8000/variantsOfGen/${props.info.symbol}`)
    .then(r => guardarVariants(r.data))
}

function guardarVariants(listaVariantes) {
    let variants = []
    listaVariantes.map((aVariant, i) => variants.push(aVariant.id_variant))
    alert(variants)
}

function deleteGen() {
    axios
    .delete(`http://127.0.0.1:8000/genes/${props.info.id}`)
    .then(r =>  window.location.reload(false))
    .catch(e => console.log(e))
}


    return(
        <div className="gen_container">
            <div>Symbol: {props.info.symbol}</div>
            <div>Initial Position: {props.info.chromosome_initial_position}</div>
            <div>Last position: {props.info.chromosome_last_position}</div>
            <div>Chromosome number: {props.info.chromosome_number}</div>
    <div><button onClick={showDiseases} className="input-button">RELETEAD DISEASES OF GEN</button></div>
    <div><button onClick={showVariants} className="input-button">VARIANTS OF GEN</button></div>
    <div><button onClick={deleteGen} className="input-button">DELETE</button></div>

        </div>
    )


}

export default UnGen