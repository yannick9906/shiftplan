<?php
    /**
     * Created by PhpStorm.
     * User: gifsu
     * Date: 13.12.2018
     * Time: 16:56
     */
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require_once "../../classes/User.php";
    require_once "../../classes/PDO_MYSQL.php";

    $user = \shiftplan\User::checkSession(true);

    if(isset($_GET['destroy'])) {
        session_destroy();
    }