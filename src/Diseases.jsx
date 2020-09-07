import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Adisease from './aDiseases'

function Diseases(props) {
    const [diseases, setDiseas] = useState([]);
    const [name, setName] = useState('')
    useEffect(() => {
        axios
        .get('http://127.0.0.1:8000/disease')
        .then(response => setDiseas(response.data))
    },[])


function generarLista() {
    let enfermedadesLista = []
    diseases.forEach((aDiseas, i) => enfermedadesLista.push(<div><Adisease info={aDiseas}></Adisease></div>))

    return enfermedadesLista
}
function goHome() {
    props.history.push("/")
}
function generatedDiseas(){
    axios({
        method: 'post',
        url: `http://127.0.0.1:8000/disease/`,
        data: {
          name: name
        }
      })
      .then(res => refreshW())
}
function refreshW() {
    window.location.reload(false)
}
function updateName(e) {
    setName(e.target.value)
}
    return(
        <div>
           {generarLista()}
           <button onClick={goHome} className="go-back-button"> Go back </button>
           <div className="add-new-diseas">
            <div>
               <input   type="text" 
                        placeholder="name of new diseas" 
                        value={name}
                        onChange={updateName}></input>
            </div>
           <button onClick={generatedDiseas} className="input-button">ADD NEW DISEAS</button>
           </div>
        </div>
    )
}



export default Diseases