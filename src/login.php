<?php

    include_once("includes/config.php");

    if(isset($_GET["logout"])) {
        session_destroy();
    }

    if(isset($_POST['username'])) {
        $username = $_POST['username'];
        $password= $_POST['password'];

        $User = new User();
        
        if($User->login($username, $password)) {
            $_SESSION["username"] = $username;
            header("location: admin.php");
        } else {
            $message = "Incorrect Login Information";
        } 
    } else {
    }


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css" type="text/css">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <title>LOGIN - Portfolio</title>
</head>
<body>

    <header>
        <nav>
            <div id="navIcons">
            <div id="menu_div"><span class="menu_icon"><i id="hamburger" class="fas fa-bars fa-2x"></i></span><span>menu</span></div>
                <div id="login_div"><a id="loginLink" href="#"><span>log in</span><span class="login_icon"><i class="fas fa-sign-in-alt fa-2x"></i></span></a></div>
            </div>
            <ul id="menu_ul">
                <li id="closeMenu_li"><i id="closeMenu" class="fas fa-times fa-2x"></i></li>
                <li><a id="homeLink" href="#">Home</a></li>
                <li><a id="adminLink" href="#">Admin</a></li>
            </ul>
        </nav>
    </header>
    
    <main id="login_main">

        <form id="login_form" method="POST" action="login.php">
            <div class="formSection">
                <label for="username">Username</label>
                <input name="username" id="username" type="text">
            </div>
            <div class="formSection">
            <label for="password">Password</label>
                <input name="password" id="password" type="password">
            </div>
            <div class="formSection">
                <input type="submit" value="Log In">
                <?php if(isset($message)) {echo "<label>" .$message . "</label>";}?>
            </div>
        </form>
        
        <a id="topButton" href="#top">Up Please</a>
    </main>
    <script src="js/typescript.js"></script>
</body>
</html>