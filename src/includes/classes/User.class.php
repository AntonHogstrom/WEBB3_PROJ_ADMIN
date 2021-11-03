<?php

class User {
    private $db;

    //Constructor
    public function __construct() {
        //Database connection
        $this -> db = new mysqli(DBHOST, DBUSER, DBPASS, DBDATABASE);

        //Error handling if error with connection
        if($this -> db -> connect_error) {
            die("Connection failed: " . $this -> db -> connect_error);
        }
    }


    //LOGIN USER
    //password is hashed and checked and put in manually in database
    //to then be verified in function under
    public function login($username, $password) {
        $username = $this->db->real_escape_string($username);
        $password = $this->db->real_escape_string($password);

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        var_dump($passwordHash);

        $sql = "SELECT password FROM user WHERE username ='".$username."'";
        $result = mysqli_query($this->db, $sql);

        if($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if(password_verify($_POST['password'], $row['password'])) {
                $_SESSION['username'] = $username;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}