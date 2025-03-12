<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // $to = "thebeaumonthaunt@gmail.com";
    $to = "mrhess25@gmail.com";
    $subject = "New Contact Form Submission";
    
    // Collect and sanitize form data
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST["message"]);
    
    // Construct the email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Construct the email body
    $body = "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Message sent successfully!'); window.location.href = 'contact.html';</script>";
    } else {
        echo "<script>alert('Error sending message. Please try again.'); window.history.back();</script>";
    }
} else {
    echo "<script>alert('Invalid request.'); window.history.back();</script>";
}
?>
