<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;

class TokenHelper
{
    /**
     * Generates a random token.
     *
     */
    public static function generate() {
        $token = openssl_random_pseudo_bytes(30);
        $token = bin2hex($token);
        return $token;
    }

    /**
     * Creates the reset token if not exists.
     *
     * @param [type] $token
     * @param [type] $email
     */
    public static function savePasswordResetToken($token, $email) {
        DB::table('user_password_reset')->updateOrInsert(
        ['email' => $email],
        [
            'email' => $email,
            'token' => $token,
            'created_at' => now()
        ]);
    }

}
