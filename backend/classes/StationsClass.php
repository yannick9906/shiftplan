<?php
/**
 * Created by PhpStorm.
 * User: gifsu
 * Date: 20.11.2018
 * Time: 23:29
 */

namespace shiftplan;
require_once 'PDO_MYSQL.php';


class StationClass implements \JsonSerializable {

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
        $res = $pdo->query("SELECT * FROM sp_stations WHERE sID = ".$sID);
        return new StationClass($res->sID, $res->sName, $res->sStreet, $res->sStreetNumber, $res->sCity, $res->sZipCode);
    }

    public static function fromSName($sName) {
        $pdo = new PDO_MYSQL();
        $res = $pdo->query("SELECT * FROM sp_stations WHERE sName = ".$sName);
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

    /**
     * Specify data which should be serialized to JSON
     * @link https://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize()
    {
        return [
            "sID" => $this->sID,
            "sName" => $this->sName,
            "sStreet" => $this->sStreet,
            "sStreetNumber" => $this->sStreetNumber,
            "sCity" => $this->sCity,
            "sZipCOde" => $this->sZipCode
        ];
    }
}