<?php

$nombre = $_POST['FullName'];
$correo = $_POST['Email'];
$telefono = $_POST['Phone'];
$mensaje = $_POST['Message'];


$destinatario = "tomsteven22@hotmail.com"
$asunto = "Contacto desde el formulario";
$cuerpo = "Nombre: $nombre\nCorreo: $correo\nTelefono: $telefono\nMensaje: $mensaje";

mail($destinatario, $asunto, $cuerpo);

?>
