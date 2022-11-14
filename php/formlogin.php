<?php
    if (isset($_POST['login']) && !empty($_POST['login'])) {
        $baza=new mysqli("localhost", "root", "", "baza4b");
        $zap = $baza->query("SELECT * FROm `osoby`;", MYSQLI_USE_RESULT);
        foreach($zap as $w) {
            print_r($w);
        }
        //echo "<p>Komunikacja z bazą</p>";
        //print_r($_POST);
        return;
    }
    //print_r($_POST);
    echo "<p>Brak danych potrzebnych dla bazy danych";