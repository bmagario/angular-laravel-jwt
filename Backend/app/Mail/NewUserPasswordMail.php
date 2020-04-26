<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewUserPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $first_name;
    public $url;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($first_name, $token) {
        $this->first_name = $first_name;
        $this->url = env('APP_URL_FRONTEND') . '/reset-link?token='.$token;
    }

    /**
     * Build the html message.
     *
     * @return $this
     */
    public function build() {
        return $this->markdown('Email.passwordNewUser')->with([
            'first_name' => $this->first_name,
            'url' => $this->url
        ]);
    }
}
