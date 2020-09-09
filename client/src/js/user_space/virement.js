import React from 'react';
import axios from 'axios';
import myfunction from '../utils/myFunctions'
export default class Virement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            amount: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    send(e){
        e.preventDefault();
        axios({
            method: 'post',
            url: require("./../../config").baseURL+'/v1/transfer',
            headers: {'Authorization': localStorage.getItem("jwt")},
            data: {
                email: this.state.email,
                amount:this.state.amount
            },

        }).then(function (response) {
            localStorage.setItem("jwt",response.headers.authorization);
            myfunction.sweetSuccess("Success !", "");
        })
            .catch(function (error) {
                console.log(error);
                myfunction.sweetError('Oops...',error.response.data.error);
            });
    }


    handleChange(event) {
        if(event.target.name === "email")this.setState({email: event.target.value});
        if(event.target.name === "amount")this.setState({amount: event.target.value});


    }

    handleSubmit(event) {
        this.send(event);
        event.preventDefault();
    }

    render() {
        return (
                <div className="col-sm-offset-4 col-sm-4 grey" >
                    <form onSubmit={this.handleSubmit}>
                        <div className="text-center">
                            <i style={{"fontSize":"150px"}} className="fa fa-exchange" aria-hidden="true"></i>
                        </div>
                        <label>Email:</label>
                        <input type="email" placeholder="Email Id" name="email" value={this.state.email} onChange={this.handleChange} required="required" className="form-control" autoComplete="new-password"/><br/>
                        <label>Amount:</label>
                        <input type="number" placeholder="Amount" name="amount" value={this.state.amount} onChange={this.handleChange} required="required" className="form-control" autoComplete="new-password"/><br/><br/>
                        <button className="btn-block btn-default" type="submit">Transfer</button>
                    </form>
                </div>
        );
    }
}
