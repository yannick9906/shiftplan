<?php
/**
 * Created by PhpStorm.
 * User: gifsu
 * Date: 20.11.2018
 * Time: 23:29
 */

namespace shiftplan;
require_once 'PDO_MYSQL.php';


class StationClass {

    protected static $tableName = "sp_stations";

    private $sID;
    private $sName;
    private $sStreet;
    private $sStreetNumber;
    private $sCity;
    private $sZipCode;
    private $pdo;


    /**
     * stations constructor.
     * @param string $sID
     * @param string $sName
     * @param string $sStreet
     * @param int $sStreetNumber
     * @param string $sCity
     * @param int $sZipCode
     */
    public function __construct($sID, $sName, $sStreet, $sStreetNumber, $sCity, $sZipCode)
    {
        $this->sID = $sID;
        $this->sName = $sName;
        $this->sStreet = $sStreet;
        $this->sStreetNumber = $sStreetNumber;
        $this->sCity = $sCity;
        $this->sZipCode = $sZipCode;
        $this->pdo = new PDO_MYSQL();
    }


    public static function fromSID($sID) {
        $pdo = new PDO_MYSQL();
        $res = $pdo->query("SELECT * FROM".StationClass::$tableName."WHERE sID = :sID",
            [":sID" => $sID]);
        return new StationClass($res->sID, $res->sName, $res->sStreet, $res->sStreetNumber, $res->sCity, $res->sZipCode);
    }

    public static function fromSName($sName) {
        $pdo = new PDO_MYSQL();
        $res = $pdo->query("SELECT * FROM".StationClass::$tableName."WHERE sName = :sName",
            [":sName" => $sName]);
        return new StationClass($res->sID, $res->sName, $res->sStreet, $res->sStreetNumber, $res->sCity, $res->sZipCode);
    }

    public function getSID() {
        $this->sID;
    }

    public function getSName() {
        $this->sName;
    }

    public function getSStreet() {
        $this->sStreet;
    }

    public function getSStreetNumber() {
        $this->sStreetNumber;
    }

    public function getSCity() {
        $this->sCity;
    }

    public function getSZipCode() {
        $this->sZipCode;
    }
}