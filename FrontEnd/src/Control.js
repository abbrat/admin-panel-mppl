import React, { useState, Component } from 'react';
import {connect} from 'react-redux';
import { Verifytokens,getData } from "./actions/adminActions";

import AppComponent from './App';
import LoginComponent from './containers/Login/login';


class Control extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suc: false,
            log:false
        }
    }


    componentDidMount() {
        let tokens = (localStorage.getItem('x-auth-token') || sessionStorage.getItem('x-auth-token'))
        if (tokens) {
            Verifytokens(tokens).then((res) => {
                console.log("control verify tokens")
                if (res.msg) {
                    
                    this.props.dispatch({type:'SETTOKENS',payload:{token:tokens}});
                }
                return tokens;
                
            }).then((t)=>{
                getData(tokens).then((res)=>{
                    this.props.dispatch({type:'SETROLE',payload:{role:res.role}});
 
                    this.props.dispatch({type:'LOGIN'});
                        
                })
            })
            .catch(() => {
                console.log("try logging in again");
            })
        }

    }




    render() {
        return (
            <div className="App">
                {(this.props.state.loggedin) ? <AppComponent /> : <LoginComponent/>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state:state
    };
  };


export default connect(mapStateToProps) (Control);


