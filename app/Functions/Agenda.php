<?php
namespace App\Functions;

use Carbon\Carbon;
use stdClass;
 
class Agenda 
{

    private $appointments;

    function __construct($appointments) {        
        $this->appointments = $appointments;
    }

    function getDates() {
        $dates = new stdClass();

        foreach ($this->appointments as $appointment) {
            $dateKey = Carbon::parse($appointment->date_time)->format('Y-m-d');
            if (!isset($dates->$dateKey)) {
                $dates->$dateKey = [];
            }
        
            $dates->{$dateKey}[] = $appointment;
        }

        $dates = $this->handleHighlighting($dates);

        return $dates;
    }

function handleHighlighting($dates) {

    if(!(Array) $dates) return $dates;
    if(!isset($dates->{Carbon::now()->format('Y-m-d')})) return $dates;
    $todaysAppointments = $dates->{Carbon::now()->format('Y-m-d')};
    $now = Carbon::now();

    foreach($todaysAppointments as &$appointment) {

        $startTime = Carbon::parse($appointment['date_time']);
        $endTime = Carbon::parse($appointment['end_date_time']);
        
        if($now->between($startTime, $endTime)) {
            $appointment['highlight'] = true;
        }

    }

    return $dates;
}

}