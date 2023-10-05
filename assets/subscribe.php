<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    
        
        
        $file = 'subscriber.txt'; // Replace with the path to your text file
        $current = file_get_contents($file);
        $current .= $email . "\n";
        file_put_contents($file, $current);
        
        header("Location: index.html");
        
        echo "Thank you for subscribing!";
    
}
?>