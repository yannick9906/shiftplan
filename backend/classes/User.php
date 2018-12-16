<?php
/**
 * Created by PhpStorm.
 * User: yanni
 * Edited by: Marcel
 * Date: 13.12.2018
 * Time: 16:12
 */

namespace shiftplan;

require_once 'passwords.php';

class User implements \JsonSerializable {
    private $ID;
    private $sID, $wUsername, $wFirstName, $wLastName;
    private $password;
    private $wMail;
    private $pdo;

    /**
     * User constructor.
     *
     * @param int    $ID
     * @param string $sID
     * @param int    $wUsername
     * @param string $wFirstName
     * @param string $wLastName
     * @param string $wMail
     * @param string $password
     */
    public function __construct($ID, $sID, $wUsername, $wFirstName, $wLastName, $wMail, $password) {
        $this->ID = $ID;
        $this->sID = utf8_encode($sID);
        $this->wUsername = $wUsername;
        $this->wFirstName = utf8_encode($wFirstName);
        $this->wLastName = utf8_encode($wLastName);
        $this->wMail = utf8_encode($wMail);
        $this->password = $password;
        $this->pdo = new PDO_Mysql();
    }

    /**
     * creates a new instance from a specific DBID using dataO from db
     *
     * @param int $dbID
     * @return User
     */
    public static function fromUDBID($dbID) {
        $pdo = new PDO_MYSQL();
        $res = $pdo->query("SELECT * FROM sp_workers WHERE ID = :dbid", [":dbid" => $dbID]);
        return new User($res->ID, $res->sID, $res->wUsername, $res->wFirstName, $res->wLastName, $res->wMail, $res->password);
    }

    /**
     * Creates a new User Object from a give email
     *
     * @param string $email
     * @return User
     */
    public static function fromUEmail($email) {
        $pdo = new PDO_MYSQL();
        $res = $pdo->query("SELECT * FROM sp_workers WHERE email = :email", [":email" => $email]);
        return new User($res->ID, $res->sID, $res->wUsername, $res->wFirstName, $res->wLastName, $res->wMail, $res->password);
    }

    /**
     * Creates a new User Object from the given username
     *
     * @param string $username
     * @return User
     */
    public static function FromUName($username) {
        $pdo = new PDO_MYSQL();
        $res = $pdo->query("SELECT * FROM sp_workers WHERE wUsername = :uname", [":uname" => $username]);
        return new User($res->ID, $res->sID, $res->wUsername, $res->wFirstName, $res->wLastName, $res->wMail, $res->password);
    }
    /**
     * Makes this class as an string to use for debug only
     *
     * @return string
     */
    public function __toString() {
        return
            "id:        ".$this->ID."\n".
            "username:  ".$this->wUsername."\n".
            "email:     ".$this->wMail."\n";
    }

    /**
     * checks if a username is in the user db
     *
     * @param string $username
     * @return bool
     */
    public static function doesUserNameExist($username) {
        $pdo = new PDO_MYSQL();
        $res = $pdo->query("SELECT * FROM sp_workers WHERE wUsername = :uname", [":uname" => $username]);
        return isset($res->ID);
    }

    /**
     * Deletes a user
     *
     * @return bool
     */
    public function delete() {
        return $this->pdo->query("DELETE FROM sp_workers WHERE ID = :dbid", [":dbid" => $this->ID]);
    }

    /**
     * Saves the Changes made to this object to the db
     *
     * @param int $ID
     * @param string $newPasswd
     */
    protected function savePWChange($ID, $newPasswd) {
        $this->pdo->queryUpdate("sp_workers",
            ["password" => $this->md5($newPasswd)],
             "ID = :dbid",
            ["dbid" => $ID]
        );
    }

    /**
     * Creates a new user from the give attributes
     *
     */
    public static function createUser($sID, $wUsername, $wFirstName, $wLastName, $wMmail, $passwdHash) {
        $pdo = new PDO_MYSQL();
        $pdo->queryInsert("sp_worker", []
            //TODO: All Fields for creating a new User.
        );
    }

    /**
     * Checks a users session and logs him in, also printing some debug dataO if requested
     *
     * @param bool $check
     * @return bool|User
     */
    public static function checkSession($check = false) {
        session_start();
        if(!isset($_SESSION["ID"])) {
            echo json_encode(["success" => false, "error" => "NoLogin"]);
            exit;
        } else {
            $user = User::fullFromDBID($_SESSION["ID"]);
            if($_GET["m"] == "debug") {
                echo "<pre style='display: block; position: absolute'>\n";
                echo "[0] Perm Array Information:\n";
                echo "Not available on this platform";
                echo "\n[1] Permission Information:\n";
                echo "Not available on this platform";
                echo "\n[2] User Information:\n";
                echo json_encode($user);
                echo "\n[3] Client Information:\n";
                echo "    Arguments: ".$_SERVER["REQUEST_URI"]."\n";
                echo "    Req Time : ".$_SERVER["REQUEST_TIME"]."ns\n";
                echo "    Remote IP: ".$_SERVER["REMOTE_ADDR"]."\n";
                echo "    Usr Agent: ".$_SERVER["HTTP_USER_AGENT"]."\n";
                echo "</pre>\n";
            } elseif($check) {
                echo json_encode(["success" => true, "user" => $user]);
            }
            return $user;
        }
    }

    /**
     * @return int
     */
    public function getDBID() {
        return $this->ID;
    }

    /**
     * @return string
     */
    public function getUPass() {
        return $this->password;
    }

    /**
     * Set a new password for the specified User over the database ID
     *
     * @param int    $dbID
     * @param string $passwd
     */
    public function setNewUPass($dbID, $passwd) {
        $this->savePWChange($dbID, $passwd);
    }

    /**
     * @return string
     */
    public function getUEmail() {
        return $this->wMail;
    }

    /**
     * @param string $uEmail
     */
    public function setUEmail($uEmail) {
        $this->wMail = $uEmail;
    }

    public function getUPassHash() {
        return $this->password;
    }

    public function setUPassHash($passHash) {
        $this->password = $passHash;
    }
    /**
     * @param string $passHash
     * @return bool
     */
    public function comparePassHash($passHash) {
        return $this->password = $passHash;
    }

    /**
     * Specify dataO which should be serialized to JSON
     *
     * @link  http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed dataO which can be serialized by <b>json_encode</b>,
     *        which is a value of any type other than a resource.
     * @since 5.4.0
     */
    function jsonSerialize() {
        return [
            "dbID" => $this->ID,
            "username" => $this->wUsername,
            "email" => $this->wMail
        ];
    }
}