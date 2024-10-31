import * as Interactables from '@/Components/Interactables';
import React from 'react';
import ReactDom from 'react-dom';
import Modal from '@/Components/Dashboard/Modal';
import YearMonthModal from './Components/Dashboard/Agenda/YearMonthModal';
import AppointmentModal from './Components/Dashboard/Agenda/AppointmentModal';
import * as MiscTypes from '@/types/misc';
import * as InteractableTypes from '@/types/interactables';
import * as MiscEnums from '@/enums/misc';
import * as CalendarLib from '@/lib/calendar';
import * as FramerMotion from 'framer-motion';
import * as CalendarContext from '@/Contexts/Calendar';
import * as InertiaReact from '@inertiajs/react';
import MobileNavigation from './Components/Dashboard/MobileNavigation';
import { Link } from '@inertiajs/react';
import CustomerList from './Components/Dashboard/Customers/CustomerList';
import CustomerHeader from './Components/Dashboard/Customers/Header';
import DashboardLayout from './Layouts/DashboardLayout';
import Calendar from './Components/Dashboard/Agenda/Calendar';
import AppointmentList from '@/Components/Dashboard/Agenda/AppointmentList';
import TreatmentList from './Components/Dashboard/Treatments/TreatmentList';
import TreatmentHeader from './Components/Dashboard/Treatments/Header';
import TreatmentModal from './Components/Dashboard/Treatments/TreatmentModal';
import CustomerModal from './Components/Dashboard/Customers/CustomerModal';
import * as Toast from 'react-toastify';
import Navigation from '@/Components/Dashboard/Navigation';
import 'react-toastify/dist/ReactToastify.css';
import * as MiscLib from '@/lib/misc';
import Loader from './Components/Dashboard/Loader';

export {
    Loader,
    MiscLib,
    Navigation,
    Toast,
    TreatmentHeader,
    TreatmentList,
    AppointmentList,
    Calendar,
    DashboardLayout,
    CustomerList,
    Link,
    MobileNavigation,
    InertiaReact,
    Interactables,
    React,
    ReactDom,
    Modal,
    MiscEnums,
    YearMonthModal,
    AppointmentModal,
    CalendarLib,
    FramerMotion,
    CalendarContext,
    CustomerHeader,
    CustomerModal,
    TreatmentModal
}

export type {
    MiscTypes,
    InteractableTypes
}