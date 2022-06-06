import React from 'react'
import Notes from './Notes';
// import { useContext } from 'react'
// import notecontext from '../context/notes/noteContext'

const About = (props) => {
  const{showAlert}=props;
  return (
    <>
    <Notes showAlert={showAlert}/>
    
    </>
  )
}

export default About