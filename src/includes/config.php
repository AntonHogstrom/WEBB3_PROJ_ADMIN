<?php
$devMode = true;

if($devMode) {
    error_reporting(-1);
    ini_set("display_errors", 1);
}
$devmode = true;

//Autoload classes from classes/classFile.php
spl_autoload_register(function($class_name) {
    include 'classes/' . $class_name . '.class.php';
});

session_start();

//defines database connection depending on if localhost or not
if($_SERVER['SERVER_NAME'] === "localhost") {
    define("DBHOST", "localhost");
    define("DBUSER", "portfolio");
    define("DBPASS", "password");
    define("DBDATABASE", "portfolio");
} else {
    define("DBHOST", "devnoe.com.mysql");
    define("DBUSER", "devnoe_comportfolio");
    define("DBPASS", "MinPortfolioPasswordMiun123!");
    define("DBDATABASE", "devnoe_comportfolio");
}
