<?php
    if (isset($_POST['nick']) && !empty($_POST['nick'])) {
        echo "<p>Komunikacja z bazą</p>";
        
        return;
    }
    print_r($_POST);
    echo "<p>Brak danych potrzebnych dla bazy danych";