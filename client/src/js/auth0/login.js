import React from 'react';
import Auth from './AuthService'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
    };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    login(e) {
        e.preventDefault();
        Auth.login(this.state.email, this.state.password);
    }
    handleChange(event) {
        if(event.target.name === "email")this.setState({email: event.target.value});
        if(event.target.name === "password")this.setState({password: event.target.value});

    }

    handleSubmit(event) {
        this.login(event);
        event.preventDefault();
    }

    render() {
        return (
            <div style={{"marginTop":"100px"}}>
                <div className="col-sm-offset-4 col-sm-4 well grey" >
                    <form onSubmit={this.handleSubmit}>
                        <div className="text-center">
                            <i style={{"fontSize":"150px"}} className="fa fa-user-circle" aria-hidden="true"></i>
                        </div>
                        <label>Email:</label>
                        <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} required="required" className="form-control"/><br/>
                        <label>Password:</label>
                        <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required="required" className="form-control"/><br/><br/>
                        <button className="btn-block btn-default" type="submit"  style={{"fontSize":"30px"}}>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}
