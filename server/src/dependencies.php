<?php
// DIC configuration

$container = $app->getContainer();


// doctrine EntityManager
$container['em'] = function ($c) {
    $settings = $c->get('settings');
    $config = \Doctrine\ORM\Tools\Setup::createAnnotationMetadataConfiguration(
        $settings['doctrine']['meta']['entity_path'],
        $settings['doctrine']['meta']['auto_generate_proxies'],
        $settings['doctrine']['meta']['proxy_dir'],
        $settings['doctrine']['meta']['cache'],
        false
    );
    return \Doctrine\ORM\EntityManager::create($settings['doctrine']['connection'], $config);
};


// Authentication Controller
$container["AuthenticationController"] = function ($container){
    return new \App\Controllers\AuthenticationController($container);
};

// AppUser Controller
$container["UserController"] = function ($container){
    return new \App\Controllers\UserController($container);
};

// SuperUser Controller
$container["SuperUserController"] = function ($container){
    return new \App\Controllers\SuperUserController($container);
};


