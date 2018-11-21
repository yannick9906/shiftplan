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


    /**
     * @param $sID
     * @return StationClass
     */
    public static function fromSID($sID) {
        $pdo = new PDO_MYSQL();
        $res = $pdo->query("SELECT * FROM sp_stations WHERE sID = ".$sID);
        return new StationClass($res->sID, $res->sName, $res->sStreet, $res->sStreetNumber, $res->sCity, $res->sZipCode);
    }

    /**
     * @param $sName
     * @return StationClass
     */
    public static function fromSName($sName) {
        $pdo = new PDO_MYSQL();
        $res = $pdo->query("SELECT * FROM sp_stations WHERE sName = ".$sName);
        return new StationClass($res->sID, $res->sName, $res->sStreet, $res->sStreetNumber, $res->sCity, $res->sZipCode);
    }

    /**
     * @return string
     */
    public function getSID() {
        return $this->sID;
    }

    /**
     * @return string
     */
    public function getSName() {
        return $this->sName;
    }

    /**
     * @return string
     */
    public function getSStreet() {
        return $this->sStreet;
    }

    /**
     * @return int
     */
    public function getSStreetNumber() {
        return $this->sStreetNumber;
    }

    /**
     * @return string
     */
    public function getSCity() {
        return $this->sCity;
    }

    /**
     * @return int
     */
    public function getSZipCode() {
        return $this->sZipCode;
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