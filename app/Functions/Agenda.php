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

        for($i = 0; $i < count($todaysAppointments); $i++) {
            if(!isset($todaysAppointments[$i])) continue;
            if(!isset($todaysAppointments[$i + 1])) {
                $todaysAppointments[$i]['highlight'] = true;
                continue;
            }
            if(Carbon::parse($todaysAppointments[$i]['date_time']) < Carbon::now() && Carbon::parse($todaysAppointments[$i + 1]['date_time']) > Carbon::now()) {
                $todaysAppointments[$i]['highlight'] = true;
            }
        }

        return $dates;
    }

}