<?php
namespace App\Functions;

use Carbon\Carbon;
use stdClass;
use Illuminate\Support\Facades\Auth;

class Currency {

    public static $conversionRates = [
        'USD' => 1.18,
        'EUR' => 1,
        'GBP' => 0.86,
    ];


    public static function convertToCurrency($price, $currency = null)
    {
        if(!$currency) {
            $currency = Auth::user()->company->setting->currency;
        }
        return $price * self::$conversionRates[$currency];
    }

    public static function convertToEuro($price)
    {
        $currency = Auth::user()->company->setting->currency;
        return $price / self::$conversionRates[$currency];
    }

}