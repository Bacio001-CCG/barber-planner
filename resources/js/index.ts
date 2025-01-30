import AppointmentList from '@/Components/Dashboard/Agenda/AppointmentList';
import Modal from '@/Components/Dashboard/Modal';
import Navigation from '@/Components/Dashboard/Navigation';
import * as Interactables from '@/Components/Interactables';
import * as CalendarContext from '@/Contexts/Calendar';
import * as ThemeContext from '@/Contexts/Theme';
import * as MiscEnums from '@/enums/misc';
import * as CalendarLib from '@/lib/calendar';
import * as MiscLib from '@/lib/misc';
import * as InteractableTypes from '@/types/interactables';
import * as MiscTypes from '@/types/misc';
import * as InertiaReact from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import * as FramerMotion from 'framer-motion';
import React from 'react';
import ReactDom from 'react-dom';
import * as Toast from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppointmentModal from './Components/Dashboard/Agenda/AppointmentModal';
import Calendar from './Components/Dashboard/Agenda/Calendar';
import FinishAppointmentModal from './Components/Dashboard/Agenda/FinishAppointmentModal';
import YearMonthModal from './Components/Dashboard/Agenda/YearMonthModal';
import CustomerList from './Components/Dashboard/Customers/CustomerList';
import CustomerModal from './Components/Dashboard/Customers/CustomerModal';
import CustomerHeader from './Components/Dashboard/Customers/Header';
import Header from './Components/Dashboard/Header';
import Loader from './Components/Dashboard/Loader';
import LookupHeader from './Components/Dashboard/Lookup/Header';
import LookupResult from './Components/Dashboard/Lookup/LookupResult';
import MobileNavigation from './Components/Dashboard/MobileNavigation';
import PcNavigation from './Components/Dashboard/PcNavigation';
import TopNavigation from './Components/Dashboard/TopNavigation';
import TreatmentHeader from './Components/Dashboard/Treatments/Header';
import TreatmentList from './Components/Dashboard/Treatments/TreatmentList';
import TreatmentModal from './Components/Dashboard/Treatments/TreatmentModal';
import Logo from './Components/Interactables/Logo';
import LoadingScreen from './Components/LoadingScreen';
import PublicNavigation from './Components/Public/Navigation';
import DashboardLayout from './Layouts/DashboardLayout';
import PublicLayout from './Layouts/PublicLayout';

export {
    AppointmentList,
    AppointmentModal,
    axios,
    Calendar,
    CalendarContext,
    CalendarLib,
    CustomerHeader,
    CustomerList,
    CustomerModal,
    DashboardLayout,
    FinishAppointmentModal,
    FramerMotion,
    Header,
    InertiaReact,
    Interactables,
    Link,
    Loader,
    LoadingScreen,
    Logo,
    LookupHeader,
    LookupResult,
    MiscEnums,
    MiscLib,
    MobileNavigation,
    Modal,
    Navigation,
    PcNavigation,
    PublicLayout,
    PublicNavigation,
    React,
    ReactDom,
    ThemeContext,
    Toast,
    TopNavigation,
    TreatmentHeader,
    TreatmentList,
    TreatmentModal,
    YearMonthModal,
};

export type { InteractableTypes, MiscTypes };
