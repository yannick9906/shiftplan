<?php
/**
 * Created by PhpStorm.
 * User: gifsu
 * Date: 25.11.2018
 * Time: 04:00
 */

namespace shiftplan;


class Stations {
    private $sStreet, $sStreetNumber, $sCity, $sZipCode;
    private $sName;
    private $sID;
    private $pdo;

    /**
     * Stations constructor.
     *
     * @param string $sID
     * @param string $sName
     * @param string $sStreet
     * @param int $sStreetNumber
     * @param string $sCity
     * @param int $sZipCode
     */
    public function __construct($sID, $sName, $sStreet, $sStreetNumber, $sCity, $sZipCode) {
        $this->sID = $sID;
        $this->sName = $sName;
        $this->sStreet = $sStreet;
        $this->sStreetNumber = $sStreetNumber;
        $this->sCity = $sCity;
        $this->sZipCode = $sZipCode;
        $this->pdo = new PDO_MYSQL();
    }

    /**
     * Get a Station from it's unique sID.
     *
     * @param string $sID
     * @return object Stations
     */
    public static function fromSID($sID) {
        $pdo = new PDO_MYSQL();
        $res = $pdo->query("SELECT * FROM sp_stations WHERE sID = :stationID", [":stationID" => $sID]);
        return new Stations($res->sID, $res->sName, $res->sStreet, $res->sStreetNumber, $res->sCity, $res->sZipCode);
    }

    public static function getAllStations() {
        $pdo = new PDO_MYSQL();
        $res = $pdo->queryMulti("SELECT * FROM sp_stations ORDER BY ID");
        $rows = array();
        while ($r = $res->fetchObject()) {
            array_push($rows, $r);
        }

        return $rows;
    }

    public function getSID() {
        return $this->sID;
    }

    public function getSName() {
        return $this->sName;
    }

    public function getSStreet() {
        return $this->sStreet;
    }

    public function getSStreetNumber() {
        return $this->sStreetNumber;
    }

    public function getSCity() {
        return $this->sCity;
    }

    public function getSZipCode() {
        return $this->sZipCode;
    }
}