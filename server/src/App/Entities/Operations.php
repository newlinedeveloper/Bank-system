<?php

namespace App\Entities;


use \Doctrine\ORM\Mapping as ORM;
use \App\Entity as Entity;

/**
 * @ORM\Entity
 * @ORM\Table(name="operations")
 */
class Operations extends Entity  {
    /**
     * @ORM\Column(type="string", length=255)
     * @var string
     */
    protected $type;

    /**
     * @var integer
     ** @ORM\Column(name="amount", type="integer", options={"default":0})
     */
    protected $amount;

    /**
     * @ORM\ManyToOne(targetEntity="\App\Entities\AppUser")
     * @ORM\JoinColumn(nullable=false)
     */
    private $client;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @return int
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * @param int $amount
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;
    }

    /**
     * @return mixed
     */
    public function getClient()
    {
        return $this->client;
    }

    /**
     * @param mixed $client
     */
    public function setClient($client)
    {
        $this->client = $client;
    }

    public function toArray(){
    return  array("type"=>$this->type,
        "amount"=>$this->amount,
        "date"=>$this->created);
}
}