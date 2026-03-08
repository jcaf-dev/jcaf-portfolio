<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = "Contacto por web ";
    $message = trim($_POST["Mensaje"]);

    // Comprueba si los datos estan completos
    if (empty($name) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Por favor completa todos los campos del formulario.";
        exit;
    }

    // Configuracion del destinatario
    $recipient = "juancarlos@jcaf.es";
    $email_subject = "Nuevo mensaje de: $name";
    $email_content = "Nombre: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Asunto: $subject\n\n";
    $email_content .= "Mensaje:\n$message\n";

    // Encabezados
    $headers = "From: $email";

    // Intenta enviar el correo
    if (mail($recipient, $email_subject, $email_content, $headers)) {
        echo "success";
    } else {
        echo "Ocurrió un error al enviar el mensaje.";
    }
} else {
    echo "Hubo un problema con tu solicitud, intenta nuevamente.";
}
?>
