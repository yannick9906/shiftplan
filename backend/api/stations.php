<?php
    /**
 * Created by PhpStorm.
 * User: gifsu
 * Date: 25.11.2018
 * Time: 04:52
 */

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require_once "../classes/Stations.php";
    require_once "../classes/PDO_MYSQL.php";

    if (isset($_POST['sID'])) {
        $sID = $_POST['sID'];
        echo json_encode(\shiftplan\Stations::fromSID($sID));
    }