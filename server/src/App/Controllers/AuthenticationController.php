<?php

namespace App\Controllers;
use \App\Entities\AppUser as AppUser;
use \Doctrine\ORM\EntityManager as em ;
use \Slim\HTTP\Request as Request;
use \Slim\HTTP\Response as Response;
use \App\Controllers\JWTController as JWTController;

class AuthenticationController extends Controller
{


    public function checkUser(Request $request, Response $response){

        $fields = ['email','pass'];
        $data = $request->getParsedBody();
        $this->checkAllDataFields($data, $response,$fields); // just to check that all required data has been posted

        $email = strtolower($data["email"]);
        $pass = sha1($data["pass"]);

        /** @var em $em */
        $em = $this->container->em;
        $usersEntity = $em->getRepository("App\Entities\AppUser");
        /** @var AppUser $user */
        $user = $usersEntity->findOneBy(array("email"=>$email, "password"=>$pass));
        if($user == null)return $response->withJson(array("connection"=>"fail", "error"=>"wrong email or password"),403);
        $token = JWTController::createToken($user);
        $responseArray = array("connection"=>"success");
        if ($user->getIs_superuser() == 0){ // it's not a superuser

            $responseArray["position"] = "user";
            return $response->withJson($responseArray)->withHeader("Authorization",$token);

        }
        if($user->getIs_superuser() == 1){ //it s a superuser
            $responseArray["position"] = "superuser";
            return $response->withJson($responseArray)->withHeader("Authorization",$token);
        }

    }
}