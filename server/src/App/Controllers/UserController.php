<?php

namespace App\Controllers;

use Slim\Http\Request as Request;
use Slim\Http\Response as Response;
use \App\Controllers\JWTController as JWTController;
use \Doctrine\ORM\EntityManager as em ;


class UserController extends Controller{


    public function getOperations(Request $request, Response $response, $args){
        $responseArray = [];
        /** @var em $em */
        $em = $this->container->em;
        $connected_user = JWTController::getUserFromRequest($request, $em);
        if($connected_user->getIs_superUser() == 1)return $response->withJson(array("connection"=>"fail", "error"=>"You are connected as admin."),403);
        $responseArray["connected_user"]=array("id"=>$connected_user->getId(), "name"=>$connected_user->getName(), "email"=>$connected_user->getEmail());

        $operationsRepository = $em->getRepository("\App\Entities\Operations");
        $operations= $operationsRepository->findBy(array("client"=>$connected_user), 
                                                    array('created' => 'DESC'));
        $op=[];
        foreach ($operations as $key=> $value){
            array_push($op,$value->toArray());
        }

        $responseArray['operations']=$op;
        return $response->withJson($responseArray);
    }

    public function setOperation(Request $request, Response $response, $args){
        $responseArray = [];
        /** @var em $em */
        $em = $this->container->em;
        $connected_user = JWTController::getUserFromRequest($request, $em);
        if($connected_user->getIs_superUser() == 1)return $response->withJson(array("connection"=>"fail", "error"=>"You are connected as admin."),403);
        $responseArray["connected_user"]=array("id"=>$connected_user->getId(), "email"=>$connected_user->getEmail());

        $fields = ['type','amount'];
        $data = $request->getParsedBody();
        if(! $this->checkAllDataFields($data,$fields))return $response->withJson(["error"=>["message"=>"Missing data"]],400); // just to check that all required data has been posted

        $operation = new \App\Entities\Operations();
        $operation->setType($data["type"]);
        $operation->setAmount($data["amount"]);
        $operation->setClient($connected_user);

        $em->persist($operation);
        $em->flush();

        return $response->withJson(array("operation_ok"=>$operation->toArray()));
    }

    public function getMyDetails(Request $request, Response $response){

        $responseArray = [];
        /** @var em $em */
        $em = $this->container->em;
        $user = JWTController::getUserFromRequest($request, $em);
        $responseArray["user"]= $user->toArray();
        return $response->withJson($responseArray);
    }

    public function setMyDetails(Request $request, Response $response){

        $responseArray = [];
        /** @var em $em */
        $em = $this->container->em;
        $data = $request->getParsedBody();

        $user = JWTController::getUserFromRequest($request, $em);
        $user = $em->find("\App\Entities\AppUser", $user->getId());
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);
        $em->persist($user);
        $em->flush();
        return $response->withJson($user->toArray());
    }

    public function transfer(Request $request, Response $response){
        /** @var em $em */
        $em = $this->container->em;
        $data = $request->getParsedBody();

        $user = JWTController::getUserFromRequest($request, $em);
        $userSrepo= $em->getRepository("\App\Entities\AppUser");
        $userToCredit = $userSrepo->findBy(array("email"=>$data["email"]))[0];
        if($userToCredit == null)return $response->withJson(array("error"=>"no user found with this email"),503);

        if($user->getEmail() == $data['email'])return $response->withJson(array("error"=>"you can't send money to yourself !"),503);
        $op = new \App\Entities\Operations();
        $op->setAmount(-$data['amount']);
        $op->setType('virement pour '.$data["email"]);
        $op->setClient($user);
        $em->persist($op);
        $em->flush();
        $op = new \App\Entities\Operations();
        $op->setAmount($data['amount']);
        $op->setType('virement de '.$user->getEmail());
        $op->setClient($userToCredit);
        $em->persist($op);
        $em->flush();
        return $response->withJson(array("opreation"=>'ok'));
    }

}