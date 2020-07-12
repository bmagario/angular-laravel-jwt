<?php

namespace App\Helpers;


class JWTHelper
{
    /**
     * Set cookie details and return cookie
     *
     * @param string $token JWT
     * Cookie('name', 'value', $minutes, $path, $domain, $secure, $httpOnly);
     * @return \Illuminate\Cookie\CookieJar|\Symfony\Component\HttpFoundation\Cookie
     */
    public static function getCookie($token) {
        return cookie(
            env('AUTH_COOKIE_NAME'),
            $token,
            env('JWT_TTL'),
            null,
            null,
            env('APP_DEBUG') ? false : true,
            true,
            false,
            env('APP_DEBUG') ? 'None' : 'Strict'
        );
    }

    /**
     * Remove the current cookie.
     *
     * @return void
     */
    public static function forgetCookie() {
        cookie()->forget(env('AUTH_COOKIE_NAME'));
    }
}
