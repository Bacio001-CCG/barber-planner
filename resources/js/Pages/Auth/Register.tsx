import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Interactables, React, Toast } from '@/.';

interface IStep {
    data: any;
    setData: (key: string, value?: any) => void;
    processing: boolean;
    errors: any;
    setStep: (step: number) => void;
}

const STEPS = 6;

export default function Register() {
    const [step, setStep] = React.useState(0);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',

        company_kvk_number: '',
        company_name: '',
        company_location: '',
        company_address: '',
        company_postal_code: '',
        company_phone_number: '',
        company_email: '',
        company_btw_number: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <div className="flex flex-col gap-4">
                <div
                    className={`absolute left-0 top-0 grid h-[5px] w-full grid-cols-${STEPS}`}
                >
                    {step != 0 && (
                        <div
                            className={`h-full w-full bg-accent col-span-${`${step}`} `}
                        ></div>
                    )}
                </div>

                <Head title="Register" />

                {step == 0 && (
                    <StepZero
                        data={data}
                        setData={setData}
                        processing={processing}
                        errors={errors}
                        setStep={setStep}
                    />
                )}
                {step == 1 && (
                    <StepOne
                        data={data}
                        setData={setData}
                        processing={processing}
                        errors={errors}
                        setStep={setStep}
                    />
                )}
                {step == 2 && (
                    <StepTwo
                        data={data}
                        setData={setData}
                        processing={processing}
                        errors={errors}
                        setStep={setStep}
                    />
                )}

                <form onSubmit={submit}>
                    <Link href={route('login')}>
                        <div className="w-full rounded-md text-center text-sm text-txt-two underline">
                            Al geregistreerd?
                        </div>
                    </Link>
                </form>
            </div>
        </GuestLayout>
    );
}

{
    /* <Interactables.Button
loading={processing}
className=" w-full"
label="Register"
submit={true}
/> */
}

function StepZero({ data, setData, processing, errors, setStep }: IStep) {
    return (
        <>
            <Interactables.Input
                name="name"
                label="Naam"
                type="name"
                value={data.name}
                autoComplete="name"
                isFocused={true}
                required={true}
                hasError={errors.name ? true : false}
                onChange={(e: string) => setData('name', e)}
            />

            <Interactables.Input
                name="email"
                label="Email"
                type="email"
                value={data.email}
                autoComplete="username"
                hasError={errors.email ? true : false}
                required={true}
                onChange={(e: string) => setData('email', e)}
            />

            <Interactables.Input
                label="Telefoonnummer"
                type="text"
                value={data.phone_number}
                hasError={errors.phone_number ? true : false}
                required={true}
                onChange={(e: string) => setData('phone_number', e)}
            />

            <Interactables.Input
                name="password"
                label="Wachtwoord"
                type="password"
                value={data.password}
                autoComplete="new-password"
                hasError={errors.password ? true : false}
                required={true}
                onChange={(e: string) => setData('password', e)}
            />

            <Interactables.Input
                name="password_confirmation"
                label="Wachtwoord bevestigen"
                type="password"
                value={data.password_confirmation}
                autoComplete="new-password"
                hasError={errors.password_confirmation ? true : false}
                required={true}
                onChange={(e: string) => setData('password_confirmation', e)}
            />

            <Interactables.Button
                className="w-full"
                label="Next Step"
                onClick={() => setStep(1)}
            />
        </>
    );
}

function StepOne({ data, setData, processing, errors, setStep }: IStep) {


    async function validate() {
        const response = await fetch(`/api/kvk/${data.company_kvk_number}`);
        const result = await response.json();
        if(result.length == 0) {
            Toast.toast('KVK nummer is invalide', {
                type: 'error',
                position: 'bottom-right'
            });
        } else {
            setData({
                ...data,
                company_name: result.name,
                company_location: result.location,
                company_address: result.address,
                company_postal_code: result.postal_code,
                company_type: result.type,
            })
            setStep(2);
        }
    }

    return (
        <>
            <Interactables.Input
                label="KVK Nummer"
                type="text"
                value={data.company_kvk_number}
                required={true}
                onChange={(e: string) => setData('company_kvk_number', e)}
            />

            <Interactables.Input
                label="BTW Nummer"
                type="text"
                value={data.company_btw_number}
                hasError={errors.company_btw_number ? true : false}
                required={true}
                onChange={(e: string) => setData('company_btw_number', e)}
            />

            <Interactables.Input
                name="email"
                label="Email"
                type="email"
                value={data.company_email}
                hasError={errors.company_email ? true : false}
                required={true}
                onChange={(e: string) => setData('company_email', e)}
            />

            <Interactables.Input
                label="Telefoonnummer"
                type="text"
                value={data.company_phone_number}
                hasError={errors.company_phone_number ? true : false}
                required={true}
                onChange={(e: string) => setData('company_phone_number', e)}            
            />

            <Interactables.Button
                className="w-full"
                label="Next Step"
                onClick={() => validate()}
            />
        </>
    );
}

function StepTwo({ data, setData, processing, errors, setStep }: IStep) {
    // Overzicht van alle gegevens en accept terms
    return (
        <></>
    )
}