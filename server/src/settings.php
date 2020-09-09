<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => true, // Allow the web server to send the content-length header
        'determineRouteBeforeAppMiddleware' => true,

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        "public_routes"=>[
            "/v1/authenticate"

        ], // these routes don't need Authentification

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],

        'doctrine' => [
            'meta' => [
                'entity_path' => [
                    __DIR__ . '/App/Entities'
                ],
                'auto_generate_proxies' => true,
                'proxy_dir' =>  __DIR__.'/../cache/proxies',
                'cache' => null,
            ],
            'connection' => [
                'user'      => 'qcxqdlgcuxhbvp',
                'password'  =>'a413a241812654137904d41ab9d4eaa6821195111a5ec3068b103e973b9108b8',
                'host'      => 'ec2-50-19-95-47.compute-1.amazonaws.com',
                'port'      => 5432,
                'dbname'    =>"d5ob98mllbe2qe",
                'charset'   =>"utf-8",
                'driver'    => 'pdo_pgsql'
            ]
        ],
    ],
];
