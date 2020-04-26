@component('mail::message')
# Generación de Contraseña

Hola {{$first_name}}, bienvenido a {{ config('app.name') }}

Haga clic en el siguiente botón para generar la contraseña

@component('mail::button', ['url' => $url])
Generar Contraseña
@endcomponent

Gracias,<br><br>
{{ config('app.name') }}
@endcomponent
