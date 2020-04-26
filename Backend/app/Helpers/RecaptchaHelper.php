<?php

namespace App\Helpers;

class RecaptchaHelper
{

   /**
     * Validates a google recaptcha.
     *
     * @return boolean
     */
    public static function valid($captcha) {
        try {
            $recaptcha = new \ReCaptcha\ReCaptcha(env('RECAPTCHA_PRIVATE_KEY'));
            $resp = $recaptcha->verify($captcha);
            if ($resp->isSuccess()) {
                return true;
            } else {
                // $errors = $resp->getErrorCodes();
                return false;
            }
        } catch (\Exception $ex) {
            return false;
        }
    }
}
