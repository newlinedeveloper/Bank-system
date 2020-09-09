import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import axios from 'axios';
import myfunction from '../utils/myFunctions'

export default class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state  = {user :props.user,showModal:true,pass:"",name:props.user.name,email:props.user.email}
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: true,
            user:nextProps.user,pass:"",
            name:nextProps.user.name,
            email:nextProps.user.email

        });
    }
    handleChange(event){
        if(event.target.name === "email")this.setState({email: event.target.value});
        if(event.target.name === "pass")this.setState({pass: event.target.value});
        if(event.target.name === "nom")this.setState({name: event.target.value});
    }


    close() {
        this.setState({ showModal: false });
    };

    open() {
        this.setState({ showModal: true });
    };

    edit(){
        axios({
            method: 'PATCH',
            url: require("./../../config").baseURL+'/v1/users/'+this.state.user.id,
            data:[
                { op: "replace", path: "/pass", value: this.state.pass },
                { op: "replace", path: "/email", value: this.state.email },
                { op: "replace", path: "/name", value: this.state.name }

            ],
            headers: {'Authorization': localStorage.getItem("jwt")},
        }).then((response)=> {
            localStorage.setItem("jwt",response.headers.authorization);
            myfunction.sweetSuccess("Success","modified Successfully!")
        })
            .catch( (error)=> {
                console.log(error);
            });
    }

    handleSubmit(event) {
        console.log("toto");
        this.edit(event);
        this.setState({ showModal: false });
        event.preventDefault();
    }

    render() {

        return (

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>User :  {this.state.user.name}</Modal.Title>
                    </Modal.Header>
                    <form  onSubmit={this.handleSubmit}>
                        <Modal.Body>

                                <FormGroup>
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl type="text" name="nom" required="required" value={this.state.name} onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Email Id</ControlLabel>
                                    <FormControl type="email" name="email" required="required" value={this.state.email} onChange={this.handleChange} autoComplete="new-password" />
                                </FormGroup>
                            <FormGroup>
                                <ControlLabel>Password</ControlLabel>
                                <FormControl type="password" name="pass" required="required" value={this.state.pass} onChange={this.handleChange} autoComplete="new-password" />
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="info" type="submit">Update</Button>
                            <Button onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal>

        );
    }
}