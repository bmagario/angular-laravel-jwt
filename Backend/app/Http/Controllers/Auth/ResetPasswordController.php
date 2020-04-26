<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;

use App\Http\Controllers\Controller;
use App\Helpers\TokenHelper;
use App\Http\Models\Users\UserModel;
use App\Mail\ResetPasswordMail;

class ResetPasswordController extends Controller
{
    /**
     * Send the email if exists.
     * The response it's always the same, so we prevent the enumeration attack.
     *
     * @param Request $request
     * @return void
     */
    public function sendEmail(Request $request) {
        try {
            if ($user = $this->validateEmail($request->email)) {
                $this->send($user["first_name"], $request->email);
            }

            return response()->json([
                'data' => 'We sent you an email. Please verify your inbox.'
            ], Response::HTTP_OK);
        } catch (\Exception $th) {
            return response()->json([
                'data' => 'There was an error.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Send the email.
     *
     * @param [type] $first_name
     * @param [type] $email
     */
    public function send($first_name, $email) {
        $token = TokenHelper::generate();
        TokenHelper::savePasswordResetToken($token, $email);
        Mail::to($email)->send(new ResetPasswordMail($first_name, $token));
    }

    public function validateEmail($email) {
        return UserModel::getUserByEmail($email);
    }

}
