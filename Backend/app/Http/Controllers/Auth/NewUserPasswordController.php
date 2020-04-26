<?php

namespace App\Http\Controllers\Users;

use App\Helpers\TokenHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewUserPasswordMail;

class NewUserPasswordController extends Controller
{
    /**
     * Send the email if exists.
     * The response it's always the same, so we prevent the enumeration attack.
     *
     * @param Request $request
     * @return void
     */
    public static function sendEmail($first_name, $email) {
        $token = TokenHelper::generate();
        TokenHelper::savePasswordResetToken($token, $email);

        Mail::to($email)->send(new NewUserPasswordMail($first_name, $token));
    }
}
