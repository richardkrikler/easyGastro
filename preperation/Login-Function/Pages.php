<?php

class Pages
{
    function __construct(){

    }

    public static function changePage($input){
        switch ($input) {
            case "Admin":
                header("Location: admin.php");
                break;
            case "Kellner":
                header("Location: kellner.php");
                break;
            case "Küchenmitarbeiter":
                header("Location: kuechenmitarbeiter.php");
                break;
            default:
                break;
        }
    }

    public static function checkPage($type,$data){
        if(isset($data) && $data['typ'] !== $type){
            Pages::changePage($data['typ']);
        }

        if(!$data){
            header("Location: index.php");
        }

        if(isset($_POST['logout'])){
            header('Location: destroySession.php');
        }

        if(time() > $_SESSION['username']['timeout']){
            header('Location: destroySession.php');
        }
    }
}