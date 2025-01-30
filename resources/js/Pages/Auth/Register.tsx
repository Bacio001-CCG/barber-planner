import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

import { Interactables, React, Toast, axios } from '@/.';

interface IStep {
    data: {
        name: string;
        email: string;
        phone_number: string;
        password: string;
        password_confirmation: string;

        company_kvk_number: string;
        company_name: string;
        company_location: string;
        company_address: string;
        company_postal_code: string;
        company_phone_number: string;
        company_email: string;
        company_btw_number: string;
        company_type: string;
    };
    setData: (key: any, value?: any) => void;
    processing: boolean;
    errors: any;
    setStep: (step: number | ((prev: number) => number)) => void;
}

const STEPS = 4;

export default function Register() {
    const [step, setStep] = React.useState(1);
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
        company_type: '',
    });

    async function submit(e: React.FormEvent) {
        e.preventDefault();

        post(route('register'), {
            onError: (errors) => {
                if (errors.errors) {
                    Toast.toast('Er zijn fouten gevonden', {
                        type: 'error',
                        position: 'bottom-right',
                    });
                }
                setStep(1);
            },
        });
    }

    return (
        <GuestLayout>
            <form onSubmit={submit}>
                <div className="flex flex-col gap-4">
                    <div
                        className={`absolute left-0 top-0 grid h-[5px] w-full grid-cols-${STEPS}`}
                    >
                        <div
                            className={`h-full w-full bg-accent`}
                            style={{
                                gridColumn: `span ${step} / span ${step}`,
                            }}
                        ></div>
                    </div>

                    <Head title="Register" />

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
                    {step == 3 && (
                        <StepThree
                            data={data}
                            setData={setData}
                            processing={processing}
                            errors={errors}
                            setStep={setStep}
                        />
                    )}

                    {step == 4 && (
                        <StepFour
                            data={data}
                            setData={setData}
                            processing={processing}
                            errors={errors}
                            setStep={setStep}
                        />
                    )}
                    <Link href={route('login')}>
                        <div className="w-full rounded-md text-center text-sm text-txt-two underline">
                            Al geregistreerd?
                        </div>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

function StepOne({ data, setData, processing, errors, setStep }: IStep) {
    return (
        <>
            <h1 className="border-b border-border pb-2 text-lg font-bold tracking-widest text-txt-one">
                Registratie Informatie
            </h1>

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
                icon="arrow_forward_ios"
                onClick={() => setStep((prev: number) => prev + 1)}
            />
        </>
    );
}

function StepTwo({ data, setData, processing, errors, setStep }: IStep) {
    const [loading, setLoading] = React.useState(false);

    async function validate() {
        setLoading(true);
        const response = await axios.get(
            '/api/kvk/' + data.company_kvk_number,
            {
                withCredentials: true,
            },
        );

        const result = await response.data;
        if (result.length == 0 || !result) {
            Toast.toast('KVK nummer is invalide', {
                type: 'error',
                position: 'bottom-right',
            });
        } else {
            setData({
                ...data,
                company_name: result.name,
                company_location: result.location,
                company_address: result.address,
                company_postal_code: result.postal_code,
                company_type: result.type,
            });
            setStep((prev: number) => prev + 1);
        }
        setLoading(false);
    }

    return (
        <>
            <h1 className="border-b border-border pb-2 text-lg font-bold tracking-widest text-txt-one">
                Bedrijfs Informatie
            </h1>

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

            <div className="flex gap-5">
                <Interactables.Button
                    className="w-full"
                    icon="arrow_back_ios"
                    onClick={() => setStep((prev: number) => prev - 1)}
                />

                <Interactables.Button
                    className="w-full"
                    loading={loading}
                    icon="arrow_forward_ios"
                    onClick={() => validate()}
                />
            </div>
        </>
    );
}

function StepThree({ data, setData, processing, errors, setStep }: IStep) {
    const [termsAccepted, setTermsAccepted] = React.useState(false);

    function validate() {
        if (!termsAccepted) {
            Toast.toast('Accepteer de algemene voorwaarden', {
                type: 'error',
                position: 'bottom-right',
            });
        } else {
            setStep((prev: number) => prev + 1);
        }
    }

    return (
        <>
            <h1 className="border-b border-border pb-2 text-lg font-bold tracking-widest text-txt-one">
                Informatie
            </h1>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 rounded bg-bg-light p-4">
                    <h1 className="text-center font-bold tracking-widest text-txt-one">
                        Persoonlijke Informatie
                    </h1>
                    <div className="flex flex-col gap-2">
                        <div>
                            <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                                Naam
                            </label>
                            <p className="text-sm text-txt-two">{data.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                                Email
                            </label>
                            <p className="text-sm text-txt-two">{data.email}</p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                                Telefoonnummer
                            </label>
                            <p className="text-sm text-txt-two">
                                {data.phone_number}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 rounded bg-bg-light p-4">
                    <h1 className="text-center font-bold tracking-widest text-txt-one">
                        Bedrijfs Informatie
                    </h1>
                    <div className="flex flex-col gap-2">
                        <div>
                            <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                                KVK Nummer
                            </label>
                            <p className="text-sm text-txt-two">
                                {data.company_kvk_number}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                                BTW Nummer
                            </label>
                            <p className="text-sm text-txt-two">
                                {data.company_btw_number}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                                Naam
                            </label>
                            <p className="text-sm text-txt-two">
                                {data.company_name}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                                Plaats
                            </label>
                            <p className="text-sm text-txt-two">
                                {data.company_location}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                                Adres
                            </label>
                            <p className="text-sm text-txt-two">
                                {data.company_address}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                                Postcode
                            </label>
                            <p className="text-sm text-txt-two">
                                {data.company_postal_code}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                                Telefoonnummer
                            </label>
                            <p className="text-sm text-txt-two">
                                {data.company_phone_number}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                                Email
                            </label>
                            <p className="text-sm text-txt-two">
                                {data.company_email}
                            </p>
                        </div>
                    </div>
                </div>

                <Interactables.Toggle
                    label="Terms of Service"
                    description="Accepteert u de Terms of Service"
                    value={termsAccepted}
                    onChange={(e: boolean) => setTermsAccepted(e)}
                />

                <div className="flex gap-5">
                    <Interactables.Button
                        className="w-full"
                        icon="arrow_back_ios"
                        onClick={() => setStep((prev: number) => prev - 1)}
                    />

                    <Interactables.Button
                        className="w-full"
                        icon="arrow_forward_ios"
                        onClick={() => validate()}
                    />
                </div>
            </div>
        </>
    );
}

function StepFour({ data, setData, processing, errors, setStep }: IStep) {
    return (
        <>
            <div className="flex gap-5">
                <Interactables.Button
                    className="w-full"
                    icon="arrow_back_ios"
                    onClick={() => setStep((prev: number) => prev - 1)}
                />

                <Interactables.Button
                    className="w-full"
                    label="Register"
                    loading={processing}
                    submit={true}
                />
            </div>
        </>
    );
}
