<?php

if(isset($_FILES['img'])) {

    $file = $_FILES['img'];

    $fileName = $_FILES['img']['name'];
    $fileTmpName = $_FILES['img']['tmp_name'];
    $fileSize = $_FILES['img']['size'];
    $fileError = $_FILES['img']['error'];
    $fileType = $_FILES['img']['type'];

    $fileExplosion = explode('.', $fileName);
    $fileActualName = strtolower($fileExplosion[0]);
    $fileActualExt = strtolower($fileExplosion[1]);

    $allowed = array('jpg', 'jpeg', 'png', 'webp', 'gif');

    if(in_array($fileActualExt, $allowed)) {
        if($fileError === 0) {
            if($fileSize < 1000000) {
                //saves filename.extension to variable
                $fileNameNew = $fileActualName.".".$fileActualExt;

                //directory/file
                $dest = 'img/' . $fileNameNew;

                //move file from temporary location to destination
                move_uploaded_file($fileTmpName, $dest);

            } else {
                echo "File-size is too big: " . $fileSize;
            }
        } else {
            echo "ERROR: Problem uploading file!";
        }
    } else {
        echo "ERROR: Only jpg, jpeg, png, gif, webp allowed!";
    }
}