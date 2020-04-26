<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Token;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;

use App\Helpers\JWTHelper;
use App\User;

class JwtAuthMiddleware extends BaseMiddleware
{
    /**
     * Handle an incoming request, verifying the current cookie and token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $cookie_name = env('AUTH_COOKIE_NAME');
            //First we must check the existence of the cookie.
            if ($request->hasCookie($cookie_name)) {
                //Get the current cookie and check if the user exists.
                $cookie = $request->cookie($cookie_name);
                $token = new Token($cookie);
                $payload = JWTAuth::decode($token);
                $user = User::find($payload->get('id_user'));

                //If user exists, we have to login the current user to be used lately.
                if(auth()->login($user)){
                    //It is necessary to refresh the current token, and the corresponden cookie.
                    $token = auth()->refresh();
                    JWTHelper::forgetCookie();
                    $cookie = JWTHelper::getCookie($token);
                    $request->headers->add([
                        'Authorization' => 'Bearer ' . $cookie,
                        'Accept' => 'application/json',
                    ]);
                    return $next($request)->withCookie($cookie);
                } else{
                    return response()->json([
                        'message' => 'User not found',
                        'error' => 'User not found'
                    ], 401);
                }
            } else{
                return response()->json([
                    'message' => 'User not authenticated',
                    'error' => 'User not authenticated'
                ], 401);
            }
        } catch (TokenExpiredException $e) {
            return response()->json([
                'message' => 'Token expired',
                'error' => $e
            ], 401);
        } catch (TokenInvalidException $e) {
            return response()->json([
                'message' => 'Token not valid',
                'error' => $e
            ], 401);
        } catch (JWTException $e) {
            return response()->json([
                'message' => 'Token not provided',
                'error' => $e
            ], 401);
        } catch (TokenBlacklistedException $e) {
            return response()->json([
                'message' => 'Token blacklisted',
                'error' => $e
            ], 401);
        }

    }
}
