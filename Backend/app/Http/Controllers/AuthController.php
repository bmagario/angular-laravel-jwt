<?php

namespace App\Http\Controllers;

use App\Helpers\data_types\TDStatus;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\Helpers\JWTHelper;
use App\Helpers\RecaptchaHelper;
use Illuminate\Http\Request;

use App\User;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'logout']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request) {
        $captcha = $request->input('captcha');
        if(!RecaptchaHelper::valid($captcha)){
			return response()->json(['error' => 'Captcha inválido'], 401);
        }

        $credentials = request(['email', 'password']);
        $credentials += ['id_status' => TDStatus::ENABLED];

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Email o contraseña incorrectos'], 401);
        }

        $cookie = JWTHelper::getCookie($token);
        $request->headers->add([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ]);

        return response()->json([
            'user' => auth()->user(),
        ])->withCookie($cookie);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        JWTHelper::forgetCookie();
        auth()->logout();

        return response()->json(['message' => 'Ha cerrado sesión correctamente.']);
    }
}
