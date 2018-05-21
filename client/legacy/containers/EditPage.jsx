import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Noteit from '../components/Noteit.jsx'


import {
    editNote
  } from "../modules/App";
  


const mapActionCreators = {
    editNote
};

const mapStateToProps = state => ({
   
});

class EditPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id = 'iframe'>
                <Noteit editNote = {props.editNote}/>
            </div>

        )
    }
}

export default EditPage;

