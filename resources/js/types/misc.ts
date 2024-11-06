import { MiscEnums } from '@/.';

export interface Option {
    label: string,
    value: string
}

export interface Settings {
    id: number
    distanceCalculationStep: MiscEnums.DistanceCalculationStepEnum,
    measurement: MiscEnums.MeasurmentEnum,
    currency: MiscEnums.CurrencyEnum,
    language: MiscEnums.LanguageEnum,
}

export interface Appointment 
{
    id: number;
    customers: Customer[];
    treatments: Treatment[];
    dateTime: Date;
    notes: string;
    location: string;
    highlight: boolean;
    finished: boolean;
    type: 'business' | 'personal';
}

export interface Customer {
    id: number | null,
    firstName: string,
    infix: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    location: string,
    address: string,
    postalCode: string,
}

export interface Treatment {
    id: number,
    name: string,
    price: string,
}

export interface Company {
    id: number,
    name: string,
    location: string,
    address: string,
    postalCode: string,
    phoneNumber: string,
    email: string,
    kvkNumber: string,
    btwNumber: string,
    iban: string,
    type: 'BV' | 'Eenmanszaak' | 'V.O.F.',
    strict: boolean,
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