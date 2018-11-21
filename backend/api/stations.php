<?php
        /**
     * Created by PhpStorm.
     * User: gifsu
     * Date: 21.11.2018
     * Time: 01:57
     */

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require_once '../classes/StationsClass.php';
    if(isset($_GET['sID'])) $sID = $_GET['sID'];
    echo 'sID: '.var_dump($sID);
    if(isset($_GET['sName'])) $sName = $_GET['sName'];
    echo 'sName: '.var_dump($sName);

    echo json_encode(\shiftplan\StationClass::fromSID($sID));
    echo json_encode(\shiftplan\StationClass::fromSName($sName));