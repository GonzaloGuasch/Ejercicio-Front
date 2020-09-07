import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Variant from './Variant'
import './variant.css'

function Variants(props) {
    const [variants, setVariants] = useState([]);
    const [chromosomeNumber, setchromosomeNumber] = useState('')
    const [position, setposition] = useState('')
    const [idVariant, setidVariant] = useState('')
    const [reference, setreference] = useState('')
    const [alternative, setalternative] = useState('')
    const [genSymbol, setgenSymbol] = useState('')
    useEffect(() => {
        axios
        .get('http://127.0.0.1:8000/variant')
        .then(response => setVariants(response.data))
    },[])


function generarLista() {
    let variantesLista = []
    variants.forEach((aVariant, i) => variantesLista.push(<div><Variant info={aVariant}></Variant></div>))

    return variantesLista
}
function goHome() {
    props.history.push("/")
}

function addVariant(){
    axios
    .get(`http://localhost:8000/genBySymbol/${genSymbol}`)
    .then(res => axios({
                    method: 'post',
                    url: `http://127.0.0.1:8000/variant/`,
                    data: {
                        chromosome_number: chromosomeNumber,
                        position: position,
                        id_variant: idVariant,
                        reference: reference,
                        alternative: alternative,
                        gen_symbol: `http://localhost:8000/genes/${res.data.id}/`
                    }
                }).then(res => refresW()))
                  .catch(e => console.log(e))
}

function refresW(){
    window.location.reload(false)
}
function updatechromosomeNumber(e) {
    setchromosomeNumber(e.target.value)
}

function updateposition(e) {
    setposition(e.target.value)
}

function updateidVariant(e) {
    setidVariant(e.target.value)
}

function updatereference(e) {
    setreference(e.target.value)
}

function updatealternative(e) {
    setalternative(e.target.value)
}

function updategensymbol(e) {
    setgenSymbol(e.target.value)
}
    return(
        <div>
            {generarLista()}
            <div><button onClick={goHome} className="go-back-button"> Go back </button></div>
            <div className="variant_input">
                <div><input type="text" 
                            value={chromosomeNumber}
                            placeholder="chromosome number"
                            onChange={updatechromosomeNumber}></input></div>
                <div><input type="text" 
                            value={position}
                            placeholder="position"
                            onChange={updateposition}
                            ></input></div>
                <div><input type="text" 
                            value={idVariant}
                            placeholder="idVariant"
                            onChange={updateidVariant}
                            ></input></div>
                <div><input type="text"
                            value={reference}
                            placeholder="reference"
                            onChange={updatereference}
                            ></input></div>
                <div><input type="text"
                            value={alternative}
                            placeholder="alternative"
                            onChange={updatealternative}
                            ></input></div>
                <div><input type="text"
                            value={genSymbol}
                            placeholder="gen symbol"
                            onChange={updategensymbol}
                            ></input></div>
                        <div><button onClick={addVariant} className="input-button">ADD VARIANT</button></div>
            </div>
        </div>
    )
}



export default Variants