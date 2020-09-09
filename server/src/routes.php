<?php
// Routes
use Slim\Http\Request as Request;
use Slim\Http\Response as Response;



//Authentication
$app->post('/v1/authenticate', 'AuthenticationController:checkUser')->setName('authenticate');



// SuperUser operations
$app->get('/v1/users', 'SuperUserController:getAllUsers')->setName('getAllUsers');

$app->get('/v1/users/{id:\d+}', 'SuperUserController:getUser')->setName('getUser');

$app->post('/v1/users', 'SuperUserController:addUser')->setName('addUser');

$app->patch('/v1/users/{id:\d+}', 'SuperUserController:modifyUser')->setName('modifyUser');

$app->delete('/v1/users/{id:\d+}', 'SuperUserController:deleteUser')->setName('deleteUser');



//user operations

$app->get('/v1/myinfo', 'UserController:getMyDetails')->setName('getMyInfo');

$app->post('/v1/myinfo', 'UserController:setMyDetails')->setName('setMyIinfo');

$app->get('/v1/operations', 'UserController:getOperations')->setName('getOperations');

$app->post('/v1/operation', 'UserController:setOperation')->setName('setOperation');

$app->post('/v1/transfer', 'UserController:transfer')->setName('transfer');


