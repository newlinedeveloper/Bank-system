<?php
namespace App\Controllers;


use gamringer\JSONPatch\Operation\Exception;
use Slim\Http\Request as Request;
use Slim\Http\Response as Response;
use \App\Controllers\JWTController as JWTController;
use \App\Entities\AppUser as AppUser;
use \Doctrine\ORM\EntityManager as em ;
use Doctrine\ORM\Query;
use \gamringer\JSONPatch\Patch as Patch;


class SuperUserController extends Controller{

    function getAllUsers(Request $request, Response $response){
        $responseArray = [];

        /** @var em $em */
        $em = $this->container->em;
        $user = JWTController::getUserFromRequest($request, $em);
        if($user->getIs_superUser() != 1)return $response->withJson(array("connection"=>"fail", "error"=>"You are not a superUser"),403);
        $responseArray["connected_user"]=array("id"=>$user->getId(), "email"=>$user->getEmail());

        $usersRepository = $em->getRepository("App\Entities\AppUser");
        $allUsers = $usersRepository->findAll();
        $allUsersArray = [];

        foreach ($allUsers as $key => $parameter) {
            $allUsersArray["user_".$parameter->getId()]=$parameter->toArray();
        }

        $responseArray["all_users"]= $allUsersArray;
        return $response->withJson($responseArray);

    }

    function getUser(Request $request, Response $response, $args){
        $responseArray = [];
        /** @var em $em */
        $em = $this->container->em;
        $user = JWTController::getUserFromRequest($request, $em);
        if($user->getIs_superUser() != 1)return $response->withJson(array("connection"=>"fail", "error"=>"You are not a superUser"),403);
        $responseArray["connected_user"]=array("id"=>$user->getId(), "email"=>$user->getEmail());
        $usersRepository = $em->getRepository("App\Entities\AppUser");
        $user= $usersRepository->find($args["id"]);
        if($user == null)return $response->withJson(array("connection"=>"fail", "error"=>"The user with the id ".$args["id"]." does not exist"),403);
        $responseArray["fetched_user"]= $user->toArray();
        return $response->withJson($responseArray);

    }

    function addUser(Request $request, Response $response){
        //echo("toto");
        //die;
        $responseArray = [];
        /** @var em $em */
        $em = $this->container->em;
        $user = JWTController::getUserFromRequest($request, $em);
        if($user->getIs_superUser() != 1)return $response->withJson(array("connection"=>"fail", "error"=>"You are not a superUser"),403);
        $responseArray["connected_user"]=array("id"=>$user->getId(), "email"=>$user->getEmail());

        $fields = ['email','password', 'is_superuser','username'];
        $data = $request->getParsedBody();
        if(! $this->checkAllDataFields($data,$fields))return $response->withJson(["error"=>["message"=>"Missing data"]],400);// just to check that all required data has been posted

        $checkEmailExists = $em->getRepository('App\Entities\AppUser')
            ->findOneBy(array('email' => $data["email"]));
        if($checkEmailExists != null)return $response->withJson(array("connection"=>"fail", "error"=>"The email already exists"),500);

        $userToAdd = new \App\Entities\AppUser();

        $userToAdd->setName($data["username"]);
        $userToAdd->setEmail($data["email"]);
        $userToAdd->setPassword($data["password"]);
        $userToAdd->setIs_superuser($data["is_superuser"]);

        $em->persist($userToAdd);
        $em->flush();

        $responseArray["added_user"]= $userToAdd->toArray();
        return $response->withJson($responseArray);

    }


    function deleteUser(Request $request, Response $response, $args){
        $responseArray = [];
        /** @var em $em */
        $em = $this->container->em;
        $user = JWTController::getUserFromRequest($request, $em);
        if($user->getIs_superUser() != 1)return $response->withJson(array("connection"=>"fail", "error"=>"You are not a superUser"),403);
        $responseArray["connected_user"]=array("id"=>$user->getId(), "email"=>$user->getEmail());
        $usersRepository = $em->getRepository("App\Entities\AppUser");
        $userToDelete= $usersRepository->find($args["id"]);
        if($userToDelete == null)return $response->withJson(array("connection"=>"fail", "error"=>"The user with the id ".$args["id"]." does not exist"),403);
        if($userToDelete->getId() == $user->getId())return $response->withJson(array("connection"=>"fail", "error"=>"You can not delete your own account"),403);
        $responseArray["toDelete_user"]= $userToDelete->toArray();
        $em->remove($userToDelete);
        $em->flush();
        return $response->withJson($responseArray);

    }

    function modifyUser(Request $request, Response $response, $args){

        $responseArray = [];
        /** @var em $em */
        $em = $this->container->em;
        $connected_user = JWTController::getUserFromRequest($request, $em);
        if($connected_user->getIs_superUser() != 1)return $response->withJson(array("connection"=>"fail", "error"=>"You are not a superUser"),403);
        $responseArray["connected_user"]=array("id"=>$connected_user->getId(), "email"=>$connected_user->getEmail());

        $usersRepository = $em->getRepository("App\Entities\AppUser");

        /** @var AppUser $userToPatch */
        $userToPatch = $usersRepository->find($args["id"]);
        if($userToPatch == null)return $response->withJson(array("connection"=>"fail", "error"=>"The user with the id ".$args["id"]." does not exist"),403);
        $userToPatchArray = $userToPatch->toPatchArray();
        try{
            $patch = Patch::fromJSON($request->getBody());
            $patch->apply($userToPatchArray);
        }catch (Exception $e){
            return $response->withJson(array("connection"=>"fail", "error"=> $e->getMessage()),500);
        }


        $userToPatch->setEmail($userToPatchArray["email"]);
        $userToPatch->setUpdated(new \DateTime());
        $userToPatch->setName($userToPatchArray["name"]);
        $userToPatch->setPassword($userToPatchArray["pass"]);

        $em->persist($userToPatch);
        $em->flush();
        $responseArray["user_modified"]= $userToPatch->toArray();

        return $response->withJson($responseArray);

    }




}