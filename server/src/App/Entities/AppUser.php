<?php

namespace App\Entities;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection as ArrayCollection;
use \App\Entity as Entity;

/**
 * @ORM\Entity
 * @ORM\Table(name="appUser")
 */
class AppUser extends Entity
{
    /**
     * @ORM\Column(type="string", length=255)
     *
     * @var string
     */
    protected $email;

       /**
     * @ORM\Column(type="string", length=255,options={"default" : "name"})
     *
     * @var string
     */
    protected $name;
    /**
     * @ORM\Column(type="string", length=120)
     * @var string
     */
    protected $password;

    /**
     * @var integer
     ** @ORM\Column(name="is_superuser", type="integer", options={"default":0})
     */
    protected $is_superuser;

    /**
     * @ORM\OneToMany(targetEntity="Operations", mappedBy="client")
     */
    protected $operations;

    public function __construct() {
        parent::__construct();
        $this->operations = new ArrayCollection();
    }



// les fonctions

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = htmlspecialchars(strtolower($email));
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = sha1($password);
    }

    public function getIs_superuser(){
        return $this->is_superuser;
    }
        public function getName(){
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function setIs_superuser($is_superuser){
        $this->is_superuser = $is_superuser;
    }

    /**
     * @return mixed
     */
    public function getOperations()
    {
        return $this->operations;
    }

    public function addOperation($op){
        $this->getOperations()->add($op);
    }

    /**
     * @param mixed $operations
     */
    public function setOperations($operations)
    {
        $this->operations = $operations;
    }



    public function toArray(){
        return array_merge(parent::toArray(),[
            "name"=>$this->getName(),
            "email"=>$this->getEmail(),
            "is_superuser"=>$this->getIs_superuser(),
            "operations"=>$this->getOperations()
        ]);
    }
    public function toPatchArray(){
        return array_merge(parent::toArray(),[
            "name"=>$this->getName(),
            "email"=>$this->getEmail(),
            "pass"=>$this->getPassword()
        ]);

    }
}