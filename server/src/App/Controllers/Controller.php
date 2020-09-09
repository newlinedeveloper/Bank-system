<?php

namespace App\Controllers;


class Controller
{
    protected  $container;

    public function  __construct($container)
    {
        $this->container = $container;
    }

    public function __get($name)
    {
        if($this->container->{$name}){
            return $this->container->{$name};
        }
    }

    public function checkAllDataFields($data, $fields){
        foreach($fields as $f){
                if (strlen($data[$f])==0){
                return false;
            }

        }
        return true;
    }
}