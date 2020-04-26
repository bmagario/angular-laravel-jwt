@component('mail::message')
# Solicitud de Restablecimiento de Contraseña

Hola {{$first_name}}

Haga clic en el siguiente botón para restablecer la contraseña

@component('mail::button', ['url' => $url])
Restablecer Contraseña
@endcomponent

Gracias,<br><br>
{{ config('app.name') }}
@endcomponent
