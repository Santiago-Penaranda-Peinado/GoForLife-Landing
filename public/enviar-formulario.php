<?php
// Muestra errores para depuración (comentar en producción)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir las clases de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Asegúrate de que la ruta a la carpeta 'phpmailer' sea correcta
// Generalmente, si 'enviar-formulario.php' está en la raíz, 
// y 'phpmailer' es una carpeta en la raíz, esto funcionará.
require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

// --- Obtener Datos del Formulario ---
// Usamos htmlspecialchars para prevenir ataques XSS
$nombre    = htmlspecialchars(trim($_POST['nombre'] ?? ''));
$telefono  = htmlspecialchars(trim($_POST['telefono'] ?? ''));
$email     = htmlspecialchars(trim($_POST['email'] ?? ''));
$modelo    = htmlspecialchars(trim($_POST['modelo'] ?? 'No seleccionado'));
$inversion = htmlspecialchars(trim($_POST['inversion'] ?? 'No especificado'));
$mensaje   = htmlspecialchars(trim($_POST['mensaje'] ?? ''));

// --- Validación Sencilla ---
// Validamos los campos requeridos en tu HTML
if (empty($nombre) || empty($telefono) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($modelo)) {
    // Si falla la validación, detenemos el script.
    die('Error: Por favor, complete todos los campos requeridos (Nombre, Teléfono, Email, Modelo).');
}

// --- Construir Cuerpo del Correo ---
$cuerpoCorreo = "
    <h2 style='color: #333;'>Nueva Cotización desde la Página Web</h2>
    <p><strong>Nombre:</strong> {$nombre}</p>
    <p><strong>Teléfono:</strong> {$telefono}</p>
    <p><strong>Email:</strong> {$email}</p>
    <hr>
    <p><strong>Modelo de Interés:</strong> {$modelo}</p>
    <p><strong>Inversión Aproximada:</strong> {$inversion}</p>
    <p><strong>Mensaje:</strong> " . nl2br($mensaje) . "</p>
";

// --- Configuración de PHPMailer ---
$mail = new PHPMailer(true);
$correoDestino = 'gflmtex@gmail.com'; // El correo de GMAIL donde se recibirá

try {
   $mail->IsSMTP();
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'tls';
    $mail->Host = "smtp.ionos.mx";
    $mail->Port = 587;
    
    $mail->Username = "formularios@wde.com.mx"; 
    $mail->Password = "Wde.2025!";

    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    
    $mail->SMTPDebug = 0; 
    $mail->Debugoutput = 'html';
    
    // Remitente (Debe ser el mismo que tu Username de SMTP)
    $mail->setFrom('formularios@wde.com.mx', 'Formulario Web');
    
    // Destinatario (A dónde llegará el correo)
    $mail->addAddress($correoDestino, 'Contacto GFLM');
    
    // Dirección para que al darle "Responder", se responda al cliente
    $mail->addReplyTo($email, $nombre);

    // Contenido del Correo
    $mail->isHTML(true);
    $mail->Subject = "Nueva Cotización de: {$nombre}";
    $mail->Body    = $cuerpoCorreo;
    $mail->AltBody = strip_tags($cuerpoCorreo); // Versión de texto plano

    // Enviar el correo
    $mail->send();
    
    // Redirigir a la página de agradecimiento
    header('Location: /gracias.html');
    exit();

} catch (Exception $e) {
    echo "El mensaje no pudo ser enviado. Error de PHPMailer: {$mail->ErrorInfo}";
    // En un sitio en vivo, podrías redirigir a una página de error
    // header('Location: /error.html');
}

?>
