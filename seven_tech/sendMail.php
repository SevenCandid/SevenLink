<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mail = new PHPMailer(true);

    try {
        // ======================
        // 1. SEND EMAIL TO YOURSELF
        // ======================
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'frankbediako38@gmail.com'; // Your Gmail
        $mail->Password   = 'jssspnsipctwxlrg';        // Your Gmail App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom('frankbediako38@gmail.com', 'Sev-Tech');
        $mail->addAddress('frankbediako38@gmail.com'); // Your inbox

        $mail->isHTML(true);
        $mail->Subject = 'New Quote Request with File Upload';

        $body  = "<h3>New Request</h3>";
        $body .= "<p><b>Name:</b> {$_POST['name']}</p>";
        $body .= "<p><b>Phone:</b> {$_POST['phone']}</p>";
        $body .= "<p><b>Email:</b> {$_POST['email']}</p>";
        $body .= "<p><b>Institution:</b> {$_POST['institution']}</p>";
        $body .= "<p><b>Service:</b> {$_POST['serviceNeeded']}</p>";
        $body .= "<p><b>Deadline:</b> {$_POST['deadline']}</p>";
        $body .= "<p><b>Details:</b><br>{$_POST['details']}</p>";
        $mail->Body = $body;

        // Attach files (if any)
        if (!empty($_FILES['files']['name'][0])) {
            foreach ($_FILES['files']['tmp_name'] as $key => $tmp_name) {
                if ($_FILES['files']['error'][$key] == 0) {
                    $mail->addAttachment($tmp_name, $_FILES['files']['name'][$key]);
                }
            }
        }

        $mail->send(); // ✅ Send to you

        // ==============================
        // 2. AUTO-REPLY TO STUDENT
        // ==============================
        if (!empty($_POST['email'])) {
            $autoReply = new PHPMailer(true);
            $autoReply->isSMTP();
            $autoReply->Host       = 'smtp.gmail.com';
            $autoReply->SMTPAuth   = true;
            $autoReply->Username   = 'frankbediako38@gmail.com';
            $autoReply->Password   = 'jssspnsipctwxlrg';
            $autoReply->SMTPSecure = 'tls';
            $autoReply->Port       = 587;

            $autoReply->setFrom('frankbediako38@gmail.com', 'Seven-Tech Services');
            $autoReply->addAddress($_POST['email']); // student’s email

            $autoReply->isHTML(true);
            $autoReply->Subject = "We received your request ✅";
            $autoReply->Body    = "
                <p>Hello <b>{$_POST['name']}</b>,</p>
                <p>Thanks for contacting <b>Sev-Tech Services</b>.</p>
                <p>We’ve received your request for <b>{$_POST['serviceNeeded']}</b> and our team will get back to you shortly.</p>
                <p>📅 Deadline noted: {$_POST['deadline']}</p>
                <p>We usually reply within 24 hours. For urgent matters, please WhatsApp us at 
                <a href='https://wa.me/233549437374'>+233 54 943 7374</a>.</p>
                <br>
                <p>Best regards,<br><b>Sev-Tech Team</b></p>
            ";

            $autoReply->send(); // ✅ Send confirmation to student
        }

        // ==============================
        // 3. SUCCESS RESPONSE
        // ==============================
        echo "<div class='form-response success'>
                ✅ Your request has been sent successfully! <br>
                A confirmation email has been sent to the sender.
              </div>";

    } catch (Exception $e) {
        echo "<div class='form-response error'>
                ❌ Sorry, your message could not be sent. <br>
                Error: {$mail->ErrorInfo}
              </div>";
    }
}
?>
