import React, {useEffect, useState} from 'react';
import axios from 'axios';
import UnGen from './UnGen'


function Genes(props) {

const [genes, setGenes] = useState([]);
const [chromosomenumber, setchromosomenumber] = useState('')
const [chromosomeinitialposition, setchromosomeinitialposition] = useState('')
const [chromosomelastposition, setchromosomelastposition] = useState('')
const [symbol, setsymbol] = useState('')
const [diseasesnewGen, setdiseases] = useState('')
    useEffect(() => {
        axios
        .get('http://127.0.0.1:8000/genes')
        .then(response => setGenes(response.data))
    },[])


function generarLista() {
    let genesComponenete = []
    genes.forEach((unGen, i) => genesComponenete.push(<div><UnGen info={unGen}></UnGen></div>))

    return genesComponenete
}

function goHome() {
    props.history.push("/")
}
function updatechromosomenumber(e) {
    setchromosomenumber(e.target.value)
}
function updatechromosomeinitialposition(e) {
    setchromosomeinitialposition(e.target.value)
}
function updatechromosomelastposition(e) {
    setchromosomelastposition(e.target.value)
}
function updatesymbol(e) {
    setsymbol(e.target.value)
}

function updatediseas(e) {
    setdiseases(e.target.value)
}
function addGen(){
   axios
   .get(`http://localhost:8000/diseaseByName/${diseasesnewGen}`)
   .then(res => axios({
                    method: 'post',
                    url: `http://127.0.0.1:8000/genes/`,
                    data: {
                        chromosome_number: chromosomenumber,
                        chromosome_initial_position: chromosomeinitialposition,
                        chromosome_last_position: chromosomelastposition,
                        symbol: symbol,
                        diseases: [res.data.url],
                    }
                }).then(res => refreshW()))
                .catch(e => console.log(e))
}

function refreshW() {
    window.location.reload(false)
}
    return(
        <div>
            {generarLista()}
            <button className="go-back-button" onClick={goHome}> Go back </button>
            
    <div className="input-gen-container">
        <div><input type="text" 
                    value={chromosomenumber}
                    placeholder="chromosome number"
                    onChange={updatechromosomenumber}></input></div>
        <div><input type="text" 
                    value={chromosomeinitialposition}
                    placeholder="chromosome inital position"
                    onChange={updatechromosomeinitialposition}></input></div>
        <div><input type="text" 
                    value={chromosomelastposition}
                    placeholder="chromosome last position"
                    onChange={updatechromosomelastposition}></input></div>
        <div><input type="text" 
                    value={symbol}
                    placeholder="symbol"
                    onChange={updatesymbol}></input></div>
        <div><input type="text" 
                    value={diseasesnewGen}
                    placeholder="related diseas"
                    onChange={updatediseas}></input></div>
        <div>
            <button onClick={addGen} className="input-button">ADD GEN</button>
        </div>
    </div>
        </div>
    )
}


export default Genes;