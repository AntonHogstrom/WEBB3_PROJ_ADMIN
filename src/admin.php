<?php
    include_once("includes/config.php");

    if(!isset($_SESSION["username"])) {
        header("location: login.php?error=login");
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
    <title>ADMIN - Portfolio</title>
</head>
<body>

    <header>
        <nav>
            <div id="navIcons">
            <div id="menu_div"><span class="menu_icon"><i id="hamburger" class="fas fa-bars fa-2x"></i></span><span>menu</span></div>
                <div id="login_div"><a id="loginLink" href="#"><span>log out</span><span class="login_icon"><i class="fas fa-sign-out-alt fa-2x"></i></span></a></div>
            </div>
            <ul id="menu_ul">
                <li id="closeMenu_li"><i id="closeMenu" class="fas fa-times fa-2x"></i></li>
                <li><a id="homeLink" href="#">Home</a></li>
                <li><a id="adminLink" href="#">Admin</a></li>
            </ul>
        </nav>
    </header>
    
    <main id="admin_main">

        <div id="showOptionsSection">
            <button id="editCourses" onclick="coursesOptions()">Courses</button>
            <button id="editWorks" onclick="worksOptions()">Works</button>
            <button id="editWebsites" onclick="websitesOptions()">Websites</button>
        </div>

        <section id="addSection">

        </section>
        <section id="resultsSection">

        </section>


    </main>

    <script src="js/typescript.js"></script>
</body>
</html>