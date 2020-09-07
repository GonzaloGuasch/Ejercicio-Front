import React from 'react';
import './App.css';

function App(props) {

 function goToGene() {
   props.history.push("/genes")
 }
 function goToVariants() {
   props.history.push("/variant")
 }
 function goToDiseases() {
   props.history.push("/disease")
 }
  return (
    <div className="Home">
       <div> <button className="genes" onClick={goToGene}>GENES</button></div>
       <div> <button className="genes" onClick={goToVariants}>VARIANTS</button></div>
        <div><button className="genes" onClick={goToDiseases}>DISEASES</button></div>
      
    </div>
  );
}

export default App;
