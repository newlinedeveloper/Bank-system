import React from 'react';
import axios from 'axios';
import myfunction from '../utils/myFunctions'

export default class AddUser extends React.Component{

    constructor(props) {
        super(props);
        this.state = {email:"",pass:"", nom:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    add(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: require("./../../config").baseURL+'/v1/users',
            headers: {'Authorization': localStorage.getItem("jwt")},
            data: {
                username: this.state.nom,
                email: this.state.email,
                is_superuser: 0,
                password:this.state.pass
            },

        }).then(function (response) {
            localStorage.setItem("jwt",response.headers.authorization);
            myfunction.sweetSuccess("Success !", "");
        })
            .catch(function (error) {
                console.log(error);
                //myfunction.sweetError('Oops...',error);
            });
    }

    handleChange(event) {
        if(event.target.name === "nom")this.setState({nom: event.target.value});
        if(event.target.name === "email")this.setState({email: event.target.value});
        if(event.target.name === "pass")this.setState({pass: event.target.value});
    }


    handleSubmit(event) {
        this.add(event);
        event.preventDefault();
    }

    render(){

        return(
            <form onSubmit={this.handleSubmit}>
                <div className="col-sm-offset-4 col-sm-4">
                    <div className="text-center">
                        <i style={{"fontSize":"150px"}} className="fa fa-user-o" aria-hidden="true"></i>
                    </div>
                    <br/>
                    <label>Name:</label>
                    <input className="form-control" name="nom" value={this.state.nom} onChange={this.handleChange} /><br/>
                    <label>Email Id:</label>
                    <input type="email" name="email"  value={this.state.email} onChange={this.handleChange} className="form-control"  required="required" autoComplete="new-password"/><br/>
                    <label>Password:</label>
                    <input type="password" name="pass" value={this.state.pass} onChange={this.handleChange} className="form-control"  required="required" pattern=".{4,}" title="4 characters minimum" autoComplete="new-password"/><br/>
                    <button className="btn-block btn-default" type="submit">Add user</button>
                </div>
            </form>);
    }
}