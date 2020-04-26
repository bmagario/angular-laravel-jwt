<?php
namespace App\Helpers\data_types;

class TDStatus {
	const ENABLED = 1;
	const DISABLED = 2;

	public static $dictionary = [
		self::ENABLED => 'ENABLED',
		self::DISABLED => 'DISABLED'
	];

	public static function getDescriptionStatic($code) {
		return self::$dictionary[intval($code)];
	}

	public static function isEnabledStatic($code){
		return intval($code) === self::ENABLED;
	}

	public static function isDisabledStatic($code){
		return intval($code) === self::DISABLED;
	}
}
