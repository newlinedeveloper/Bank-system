import axios from 'axios';
import myfunction from '../utils/myFunctions'
import ReactDOM from 'react-dom'
import React from 'react';
import WelcomePage from '../user_space/welcomePage'


class AuthService {

    login(email, password) {
        // We call the server to log the user in.
        return axios({
            method: 'post',
            url: require("./../../config").baseURL+'/v1/authenticate',
            data: {
                email: email,
                pass: password
                    },

        }).then(function (response) {
            localStorage.setItem("jwt",response.headers.authorization);
            myfunction.sweetSuccess("Welcome !", response.data.position);
            ReactDOM.unmountComponentAtNode(document.getElementById('root'));
            ReactDOM.render(<WelcomePage userType={response.data.position}/>, document.getElementById('root'));
        })
            .catch(function (error) {
                console.log(error);
                myfunction.sweetError('Oops...',error.response.data.error);
            });
    }


}

export default new AuthService()