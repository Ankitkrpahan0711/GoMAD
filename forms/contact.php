<?php

    $name = $_POST['name'];
    $mailfrom = $_POST['email'];
    $subject = $_POST['subject'];
    $phone  = $_POST['phone'];
    $message = $_POST['message'];
    $toEmail = "gomadpvtltd@gmail.com";
    $txt = "Name: " . $name . "\r\nSubject: " . $subject . "\r\nE-mail: " . $mailfrom . "\r\nPhone: " . $phone . "\r\nMessage: " . $message . "\r\n";
    $headers = "From: $mailfrom\r\n" .
        "CC: $toEmail";
    // if (!empty($mailfrom)) {
        if (mail($toEmail, $subject, $txt, $headers)) {
        header("Location:/");
            echo "Message sent successfully!";
        } else {
            echo "Message delivery failed...";
            error_log("Error: Email delivery failed."); 
        }
  
?>;