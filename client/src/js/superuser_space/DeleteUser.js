import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import EditUser from './EditUser';
// eslint-disable-next-line
import myfunction from '../utils/myFunctions'

export default class DeleteUser extends React.Component{

    constructor(props) {
        super(props);
        this.state = {users:""};
        this.getAllUsers = this.getAllUsers.bind(this);
    }


    componentDidMount(){

        setInterval(()=>{ this.getAllUsers();this.forceUpdate(); }, 1000);

    }

    getAllUsers(){
        axios({
            method: 'get',
            url: require("./../../config").baseURL+'/v1/users',
            headers: {'Authorization': localStorage.getItem("jwt")},
        }).then((response)=> {
            localStorage.setItem("jwt",response.headers.authorization);
            var arr = Object.keys(response.data.all_users).map(function(k) { return response.data.all_users[k] });
            this.setState({users:arr}) ;
        })
            .catch( (error)=> {
                console.log(error);
            });
    }

    delete(user_id){
        axios({
            method: 'DELETE',
            url: require("./../../config").baseURL+'/v1/users/'+user_id,
            headers: {'Authorization': localStorage.getItem("jwt")},
        }).then((response)=> {
            localStorage.setItem("jwt",response.headers.authorization);
            this.getAllUsers();
        })
            .catch( (error)=> {
                console.log(error);
            });
    }

    editUser(user){
        ReactDOM.render(<EditUser user={user} />, document.getElementById('modal-container'));
    }

    render(){
        var users = Array.from(this.state.users);
        //console.log(users);
        return(<div className="row">
                <div id="modal-container"></div>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Date of création</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user,i)=>{
                        return  (<tr key={i}>
                                    <td>{user.email}</td>
                                    <td>{user.creation_time}</td>
                                    <td><button className="btn btn-warning" onClick={()=>{this.editUser(user)}}>Edit</button></td>
                                    <td><button className="btn btn-danger" onClick={()=>{this.delete(user.id)}} >Delete</button></td>
                                </tr>);
                    })}
                    </tbody>

                </table>

                </div>);
    }
}