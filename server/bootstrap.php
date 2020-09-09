<?php
// bootstrap.php
require_once "vendor/autoload.php";

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

$paths = array(__DIR__."/src/App/Entities");
$isDevMode = true;
$settings = require __DIR__ . '/src/settings.php';

// the connection configuration
$dbParams = array(
    'user'      => $settings['settings']['doctrine']['connection']['user'],
    'password'  => $settings['settings']['doctrine']['connection']['password'],
    'host'      => $settings['settings']['doctrine']['connection']['host'],
    'port'      => $settings['settings']['doctrine']['connection']['port'],
    'dbname'    => $settings['settings']['doctrine']['connection']['dbname'],
    'charset'   => $settings['settings']['doctrine']['connection']['charset'],
    'driver'    => $settings['settings']['doctrine']['connection']['driver']
);

$config = Setup::createAnnotationMetadataConfiguration($paths, $isDevMode, null, null, false);
$entityManager = EntityManager::create($dbParams, $config);

function GetEntityManager()  {
    global $entityManager;
    return  $entityManager;
}