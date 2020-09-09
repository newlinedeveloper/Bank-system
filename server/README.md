## php-slim-rest-bank-account-app
This is a simple REST App built with Php and Slim, it's the back-end part of a bank personal web space.
This app uses JWT Token for authentication, Cross Origin Resource Sharing.

1. This web service is [hosted on Heroku](https://php-slim-rest-bank-account.herokuapp.com/)
2. This is an [implementation](https://github.com/Meshredded/react-rest-client-bank-account) of a React Client that uses this web Service.
 
## API:
| Resource      | HTTP Verb    | Params             |Path |Needs Token ?| 
| ------------- |--------------| -------------------|-------|--------|
| JWT           | POST         |  String: email, pass | /v1/authenticate | no|
|Users List     |GET           |                |/v1/users/|yes, superuser|
|One user's details| GET||/v1/users/{id}|yes, superuser|
|Add a user|POST|String: email, password, username / int: is_superuser (0 or 1)|/v1/users|yes, superuser |
|Edit one user| PATCH |[HOW TO PATCH](http://williamdurand.fr/2014/02/14/please-do-not-patch-like-an-idiot/) |/v1/users/{id}|yes, superuser|
|Delete one user| DELETE||/v1/users/{id}|yes, superuser
|Get The details of the connected user| GET | | /v1/myinfo|yes, user|
|Set the credentials of the connected user| POST| String: email, password| /v1/myinfo | yes, user|
|Get The operations of the connected user|GET| | /v1/operations|yes, user|
|Set an operation, purchase or a deposit| POST | String: type / int: amount| /v1/operation| yes, user
|Do a bank transfer| POST | String: email / int: amount | /v1/virement| yes, user
