import { MiscEnums } from '@/.';

export interface Option {
    label: string;
    value: string;
}

export interface Settings {
    id: number;
    distanceCalculationStep: MiscEnums.DistanceCalculationStepEnum;
    measurement: MiscEnums.MeasurmentEnum;
    currency: MiscEnums.CurrencyEnum;
    language: MiscEnums.LanguageEnum;
}

export interface Appointment {
    id: number;
    customers: Customer[];
    treatments: Treatment[];
    dateTime: Date;
    endDateTime: Date;
    notes: string;
    location: string;
    highlight: boolean;
    finished: boolean;
    type: 'business' | 'personal';
    googleEvent: GoogleEvent;
}

export interface GoogleEvent {
    appointmentId: number;
    eventId: string;
    companyId: number;
}

export interface Customer {
    id: number | null;
    firstName: string;
    infix: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    location: string;
    address: string;
    postalCode: string;
}

export interface Treatment {
    id: number;
    name: string;
    price: string;
}

export interface Company {
    id: number;
    name: string;
    location: string;
    address: string;
    postalCode: string;
    phoneNumber: string;
    email: string;
    kvkNumber: string;
    btwNumber: string;
    iban: string;
    type: 'BV' | 'Eenmanszaak' | 'V.O.F.';
    strict: boolean;
}

export interface Address {
    house_number: string;
    road: string;
    hamlet: string;
    country: string;
    country_code: string;
    municipality: string;
    postcode: string;
    state: string;
    village: string;
    city: string;
    [key: string]: string;
}

export interface NominatimResponse {
    place_id: number;
    licence: string;
    osm_type: 'node' | 'way' | 'relation';
    osm_id: number;
    boundingbox: [string, string, string, string];
    class: string;
    display_name: string;
    importance: number;
    lat: string;
    lon: string;
    name: string;
    addresstype: string;
    address: Address;
    place_rank: number;
}

export interface FinishedAppointment {
    id: number;
    appointmentId: number;
    price: number;
    tip: number;
    paymentType: 'cash' | 'card';
    distance: number;
    createdAt: string;
}

export interface AppointmentBackend {
    id: number | null;
    type: string;
    customers: string[];
    treatments: string[];
    notes: string;
    time: string;
    end_time?: string;
    date: string;
}
