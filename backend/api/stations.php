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

    if(isset($_POST['sID'])) {
        $sID = $_POST['sID'];
        echo json_encode(\shiftplan\StationClass::fromSID($sID));
    }

    if(isset($_POST['sName'])) {
        $sName = $_POST['sName'];
        echo json_encode(\shiftplan\StationClass::fromSName($sName));
    }

