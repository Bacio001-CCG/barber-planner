<?php
namespace App\Functions;

use App\Models\Appointment;
use App\Models\GoogleEvent;
use App\Models\User;
use Carbon\Carbon;
use Spatie\GoogleCalendar\Event;
use Illuminate\Support\Facades\Auth;
use Google\Client; 
use Google\Service\Calendar as GoogleCalendar; 
use App\Models\Customer;
use App\Models\Treatment;

class Calendar 
{

	protected $client;    
	protected $calendarService;    

	public function __construct() {        
		$this->client = new Client();        
		$this->client->setClientId(config('services.google.client_id'));        
		$this->client->setClientSecret(config('services.google.client_secret'));        
		$this->client->setRedirectUri(config('services.google.redirect'));        
		$this->client->addScope(GoogleCalendar::CALENDAR);        
		$this->calendarService = new GoogleCalendar($this->client);    
	}    
	
    public function getClient() 
    {
        $google_user = Auth::user()->googleUser;
        $this->client->setAccessToken([
            'access_token' => $google_user->token,
            'refresh_token' => $google_user->refresh_token
        ]);

        if ($this->client->isAccessTokenExpired()) {
            $this->refreshToken($google_user);
        }

        return $this->client;
    }

    public function eventTrigger($request, $appointment, $end_date_time, $date_time, $type) {
        
        if(!Auth::user()->googleUser) return false;

        $customers = Customer::whereIn('id', $request->customers)->get();
        $treatments = Treatment::whereIn('id', $request->treatments)->get();
        $customer_names = $customers->map(function ($customer) {
            return trim($customer->first_name . ' ' . $customer->infix . ' ' . $customer->last_name);
        })->implode(', ');
        
        $treatment_names = $treatments->pluck('name')->implode(', ');
        
        $description = implode(PHP_EOL, [
            'Behandelingen: ' . $treatment_names,
            'Klanten: ' . $customer_names,
            ' ',
            'Notities: ' . $request->notes,
        ]);      

        $customer = Customer::find($request->customers[0]);

        if($type === 'create')$this->createEvent([
            'summary' => 'Afspraak met ' . $customer->first_name . ' ' . $customer->infix . ' ' . $customer->last_name . ' - BarberPlanner',
            'location' => $customer->address . ', ' . $customer->postal_code . ' ' . $customer->location,
            'description' => $description,
            'start' => [
                'dateTime' => Carbon::parse($date_time)->setTimezone('Europe/Amsterdam')->format('Y-m-d\TH:i:s'),
                'timeZone' => 'Europe/Amsterdam',
            ],
            'end' => [
                'dateTime' => Carbon::parse($end_date_time)->setTimezone('Europe/Amsterdam')->format('Y-m-d\TH:i:s'),
                'timeZone' => 'Europe/Amsterdam',
            ],
        ], $appointment->id);

        if($type === 'update') $this->updateEvent([
            'summary' => 'Afspraak met ' . $customer->first_name . ' ' . $customer->infix . ' ' . $customer->last_name . ' - BarberPlanner',
            'location' => $customer->address . ', ' . $customer->postal_code . ' ' . $customer->location,
            'description' => $description,
            'start' => [
                'dateTime' => Carbon::parse($date_time)->setTimezone('Europe/Amsterdam')->format('Y-m-d\TH:i:s'),
                'timeZone' => 'Europe/Amsterdam',
            ],
            'end' => [
                'dateTime' => Carbon::parse($end_date_time)->setTimezone('Europe/Amsterdam')->format('Y-m-d\TH:i:s'),
                'timeZone' => 'Europe/Amsterdam',
            ],
        ], $appointment->id);

    }

    private function refreshToken($google_user)
    {
        $new_token = $this->client->fetchAccessTokenWithRefreshToken($google_user->refresh_token);
        
        if (isset($new_token['access_token'])) {
            $google_user->update([
                'token' => $new_token['access_token'],
                'refresh_token' => $new_token['refresh_token'] ?? $google_user->refresh_token
            ]);
            
            $this->client->setAccessToken($new_token);
        }
    }
	
	public function listEvents($calendar_id = 'primary')  {       
		$this->getClient();        
		$events = $this->calendarService->events->listEvents($calendar_id);        
		return $events->getItems();    
	}    
	
	public function createEvent($event_data , $appointment_id, $calendar_id = 'primary')  {        
		$this->getClient();        
		$event = new \Google\Service\Calendar\Event($event_data);        
		$event = $this->calendarService->events->insert($calendar_id, $event);
        GoogleEvent::create([
            'event_id' => $event->id,
            'appointment_id' => $appointment_id,
            'company_id' => Auth::user()->company->id
        ]);
        return $event;
	} 

    public function updateEvent($event_data, $appointment_id, $calendar_id = 'primary')  {    
        $g_event = GoogleEvent::where(['appointment_id' => $appointment_id, 'company_id' => Auth::user()->company->id])->first(); 
        if(!$g_event) return false;
        $this->getClient();        
        $event = new \Google\Service\Calendar\Event($event_data);        
        $event = $this->calendarService->events->update($calendar_id, $g_event->event_id, $event);
        return $event;    
    }

    public function deleteEvent($event_id)  {    
        $this->getClient();        
        $this->calendarService->events->delete('primary', $event_id);
        GoogleEvent::where(['event_id' => $event_id])->delete();
        return true;    
    }

}