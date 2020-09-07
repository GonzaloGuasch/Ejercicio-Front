import React, {useEffect, useState} from 'react';
import axios from 'axios';
import UnGen from './UnGen'


function Genes(props) {

const [genes, setGenes] = useState([]);
const [chromosomenumber, setchromosomenumber] = useState('')
const [chromosomeinitialposition, setchromosomeinitialposition] = useState('')
const [chromosomelastposition, setchromosomelastposition] = useState('')
const [symbol, setsymbol] = useState('')
const [diseasesoneGen, setdiseasesone] = useState('')
const [diseasestwoGen, setdiseasestwo] = useState('')
const [diseasesthreeGen, setdiseasesthree] = useState('')
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

function updatediseaUne(e) {
    setdiseasesone(e.target.value)
}
function updatediseaTwo(e) {
    setdiseasestwo(e.target.value)
}
function updatediseaThree(e) {
    setdiseasesthree(e.target.value)
}
async function  getD(nameOfDiseas){
    let d
    await  axios
   .get(`http://localhost:8000/diseaseByName/${nameOfDiseas}`)
   .then(res => d = res.data.url)
   .catch(e => d = '')
   return d
}
async function addGen(){
    let diseas_one = await getD(diseasesoneGen)
    let diseas_two = await getD(diseasestwoGen)
    let diseas_three = await getD(diseasesthreeGen)
     if(diseas_two === '' && diseas_three === '') {
        axios({
        method: 'post',
        url: `http://127.0.0.1:8000/genes/`,
        data: {
            chromosome_number: chromosomenumber,
            chromosome_initial_position: chromosomeinitialposition,
            chromosome_last_position: chromosomelastposition,
            symbol: symbol,
            diseases: [`${diseas_one}`],
            }}).then(res => refreshW())
                .catch(e  => console.log(e))
    }else if(diseas_three === ''){
        axios({
            method: 'post',
            url: `http://127.0.0.1:8000/genes/`,
            data: {
                chromosome_number: chromosomenumber,
                chromosome_initial_position: chromosomeinitialposition,
                chromosome_last_position: chromosomelastposition,
                symbol: symbol,
                diseases: [`${diseas_one}`, `${diseas_two}`],
                }}).then(res => refreshW())
                    .catch(e  => console.log(e))
    }else{
        axios({
            method: 'post',
            url: `http://127.0.0.1:8000/genes/`,
            data: {
                chromosome_number: chromosomenumber,
                chromosome_initial_position: chromosomeinitialposition,
                chromosome_last_position: chromosomelastposition,
                symbol: symbol,
                diseases: [`${diseas_one}`, `${diseas_two}`, diseas_three],
                }}).then(res => refreshW())
                    .catch(e  => console.log(e))
    }
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
                    value={diseasesoneGen}
                    placeholder="related diseas 1"
                    onChange={updatediseaUne}></input></div>
        <div><input type="text" 
                    value={diseasestwoGen}
                    placeholder="related diseas 2"
                    onChange={updatediseaTwo}></input></div>
        <div><input type="text" 
                    value={diseasesthreeGen}
                    placeholder="related diseas 3"
                    onChange={updatediseaThree}></input></div>
        <div>
            <button onClick={addGen} className="input-button">ADD GEN</button>
        </div>
    </div>
        </div>
    )
}


export default Genes;