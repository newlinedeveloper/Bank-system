/* eslint-disable */
import axios from 'axios';
import myfunction from '../utils/myFunctions'
import Login from '../auth0/login'
import OperationsList from './OperationsList'
import MonCompte from './MonCompte'
import MyInfo from './MyInfo'
import AddUser from '../superuser_space/AddUser'
import EditUser from '../superuser_space/EditUser'
import DeleteUser from '../superuser_space/DeleteUser'
import Virement from './virement'
import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery'

export default class WelcomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state= {user_id:0,name:null,email:null,operations:{},solde:0};
        this.updateState= this.updateState.bind(this);

    }
    componentDidMount() {
        if(this.props.userType==="user"){
            this.timerID = setInterval(     //pour vérifier le solde chaque 3 secondes
                () => this.updateState(),
                3000
            );
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateState(){
        axios({
            method:'GET',
            url:require("./../../config").baseURL+'/v1/operations',
            headers: {'Authorization': localStorage.getItem("jwt")}
        }).then(response => {
            localStorage.setItem("jwt",response.headers.authorization);
            var arr = Object.keys(response.data.operations).map(function(k) { return response.data.operations[k] });
            var solde = 0;
            arr.forEach(op=>{solde = solde + op.amount});
            this.setState({
                user_id:response.data.connected_user.id,
                name:response.data.connected_user.name,
                email:response.data.connected_user.email,
                operations: arr,
                solde: solde});
        })
            .catch(function (error) {
                console.log(error);
                myfunction.sweetError('Oops...',error.response.data.error);
            });
    }

    monCompteView(){
        $('.list-group > a').each(function () { $(this).removeClass("active")});
        $("#mon-compte").addClass("active");
        ReactDOM.unmountComponentAtNode(document.getElementById("content-holder"));
        ReactDOM.render(<MonCompte operations={this.state.operations} solde={this.state.solde} />, document.getElementById('content-holder'));

    }

    operationsView(){
        $('.list-group > a').each(function () { $(this).removeClass("active")});
        $("#operations").addClass("active");
        ReactDOM.unmountComponentAtNode(document.getElementById("content-holder"));
        ReactDOM.render(<OperationsList solde={this.state.solde} operations={this.state.operations}  />, document.getElementById('content-holder'));
    }
    virementView(){
        $('.list-group > a').each(function () { $(this).removeClass("active")});

        $("#virement").addClass("active");
        ReactDOM.unmountComponentAtNode(document.getElementById("content-holder"));
        ReactDOM.render(<Virement name={this.state.name} email={this.state.email}  />, document.getElementById('content-holder'));

    }
    informationsView(){
        $('.list-group > a').each(function () { $(this).removeClass("active")});
        $("#informations").addClass("active");
        ReactDOM.unmountComponentAtNode(document.getElementById("content-holder"));
        ReactDOM.render(<MyInfo name={this.state.name} email={this.state.email}  />, document.getElementById('content-holder'));

    }
    logOut(){
        localStorage.clear();
        ReactDOM.render(<Login />, document.getElementById('root'));

    }
    render(){
        if(this.props.userType === "user")
        return(
        <div className="container   ">
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand black" href="#">
                            <i className="fa fa-university black" aria-hidden="true"> Bank Management</i>
                        </a>
                    </div>
                    <div style={{"textAlign":"right",'marginTop':'10px',"cursor":"pointer"}}><a onClick={() => { this.logOut() }}>Signout <i className="fa fa-sign-out" aria-hidden="true"></i></a></div>

                </div>
            </nav>
            <div className="row" style={{"paddingRight":"15px"}}>
                <div className="col-xs-12 col-md-3">
                    <div className="list-group" style={{"cursor":"pointer"}}>
                        <a onClick={() => { this.operationsView() }} className="list-group-item active" id="operations">
                            <h4 className="list-group-item-heading"><i className="fa fa-money" aria-hidden="true"></i>    Transactions </h4>
                        </a>
                        <a onClick={() => { this.monCompteView() }} className="list-group-item" id="mon-compte">
                            <h4 className="list-group-item-heading"><i className="fa fa-line-chart " aria-hidden="true"></i> Report</h4>
                        </a>
                        <a onClick={() => { this.virementView() }} className="list-group-item" id="virement">
                            <h4 className="list-group-item-heading"><i className="fa fa-exchange" aria-hidden="true"></i>   Money Transfer</h4>
                        </a>
                        <a onClick={() => { this.informationsView() }} className="list-group-item" id="informations">
                            <h4 className="list-group-item-heading"><i className="fa fa-user-o" aria-hidden="true"></i>   Settings</h4>
                        </a>
                    </div>

                    {/* <div  className="thumbnail text-center hidden-xs hidden-sm" style={{"color":"black"}}>
                        <i style={{"fontSize":"100px"}} className="fa fa-laptop" aria-hidden="true"></i><br/>
                        <i style={{"fontSize":"100px"}} className="fa fa-tablet" aria-hidden="true"></i><br/>
                        <i style={{"fontSize":"100px"}} className="fa fa-mobile" aria-hidden="true"></i><br/>
                        <p> Cette application web est optimisée pour tous les écrans</p>
                    </div> */}

                </div>
                <div className="col-xs-12 col-md-9 well"  style={{"color":"#56c9ba","minHeight":"605px"}}>
                    <label className="row"><i className="fa fa-user-o" aria-hidden="true"></i> {this.state.email}</label>
                    <div id="content-holder"><OperationsList operations={this.state.operations} solde={this.state.solde}/></div>
                </div>
            </div>
        </div>);
        if(this.props.userType==="superuser")
            return (<div className="container   ">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand black" href="#">
                                <i className="fa fa-university black" aria-hidden="true"> Bank Management system</i>
                            </a>
                        </div>
                        <div style={{"textAlign":"right",'marginTop':'10px',"cursor":"pointer"}}><a onClick={() => { this.logOut() }}>Signout <i className="fa fa-sign-out" aria-hidden="true"></i></a></div>

                    </div>
                </nav>
                <div className="row" style={{"paddingRight":"15px"}}>
                    <div className="col-xs-12 col-md-3">
                        <div className="list-group" style={{"cursor":"pointer"}}>
                            <a onClick={() => { this.addUserView() }} className="list-group-item active" id="addUser">
                                <h4 className="list-group-item-heading"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add User</h4>
                            </a>
                            <a onClick={() => { this.deleteUserView() }} className="list-group-item" id="deleteUser">
                                <h4 className="list-group-item-heading"><i className="fa fa-times-circle" aria-hidden="true"></i> Manage User</h4>
                            </a>

                        </div>

                        {/* <div  className="thumbnail text-center hidden-xs hidden-sm" style={{"color":"black"}}>
                            <i style={{"fontSize":"100px"}} className="fa fa-laptop" aria-hidden="true"></i><br/>
                            <i style={{"fontSize":"100px"}} className="fa fa-tablet" aria-hidden="true"></i><br/>
                            <i style={{"fontSize":"100px"}} className="fa fa-mobile" aria-hidden="true"></i><br/>
                            <p> Cette application web est optimisée pour tous les écrans</p>
                        </div> */}

                    </div>
                    <div className="col-xs-12 col-md-9 well"  style={{"color":"#56c9ba","minHeight":"605px"}}>
                        <label className="row"><i className="fa fa-user-o" aria-hidden="true"></i> {this.state.email}</label>
                        <div id="content-holder"><AddUser /></div>
                    </div>
                </div>
            </div>);
    }

    addUserView(){
        $('.list-group > a').each(function () { $(this).removeClass("active")});
        $("#addUser").addClass("active");
        ReactDOM.unmountComponentAtNode(document.getElementById("content-holder"));
        ReactDOM.render(<AddUser />, document.getElementById('content-holder'));

    }

    deleteUserView(){
        $('.list-group > a').each(function () { $(this).removeClass("active")});
        $("#deleteUser").addClass("active");
        ReactDOM.unmountComponentAtNode(document.getElementById("content-holder"));
        ReactDOM.render(<DeleteUser />, document.getElementById('content-holder'));

    }
}