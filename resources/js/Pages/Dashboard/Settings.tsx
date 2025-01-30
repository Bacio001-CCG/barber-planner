import {
    DashboardLayout,
    Header,
    InertiaReact,
    Interactables,
    MiscEnums,
    MiscTypes,
    Toast,
} from '@/.';

const distanceCalculationStepOptions: MiscTypes.Option[] = [
    {
        label: 'Van Afspraak Naar Afspraak',
        value: MiscEnums.DistanceCalculationStepEnum
            .FromAppointmentToAppointment,
    },
    {
        label: 'Van Bedrijf Naar Afspraak Naar Bedrijf',
        value: MiscEnums.DistanceCalculationStepEnum
            .FromCompanyToAppointmentToCompany,
    },
];

const languageOptions: MiscTypes.Option[] = [
    { label: 'Nederlands', value: MiscEnums.LanguageEnum.Dutch },
    { label: 'Engels', value: MiscEnums.LanguageEnum.English },
];

const currencyOptions: MiscTypes.Option[] = [
    { label: 'Euro (€)', value: MiscEnums.CurrencyEnum.Euro },
    { label: 'Dollar ($)', value: MiscEnums.CurrencyEnum.Dollar },
    { label: 'Pound (£)', value: MiscEnums.CurrencyEnum.Pound },
];

const measurementOptions: MiscTypes.Option[] = [
    { label: 'Meter', value: MiscEnums.MeasurmentEnum.Meter },
    { label: 'Yard', value: MiscEnums.MeasurmentEnum.Yard },
];

export default function Settings({
    settings,
    google,
}: {
    settings: MiscTypes.Settings;
    google: {
        name: string;
        email: string;
        avatar: string;
        token: string;
    };
}) {
    const { data, setData, post, processing, errors, reset, patch } =
        InertiaReact.useForm<{
            id: number;
            distance_calculation_step: MiscEnums.DistanceCalculationStepEnum;
            measurement: MiscEnums.MeasurmentEnum;
            currency: MiscEnums.CurrencyEnum;
            language: MiscEnums.LanguageEnum;
        }>({
            id: settings.id,
            distance_calculation_step: settings.distanceCalculationStep,
            measurement: settings.measurement,
            currency: settings.currency,
            language: settings.language,
        });

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        patch(route('dashboard.settings.update', data.id), {
            onSuccess: () => {
                Toast.toast('Instellingen zijn bijgewerkt', {
                    type: 'success',
                    position: 'bottom-right',
                });
            },
            onError: () => {
                Toast.toast('Er is iets fout gegaan', {
                    type: 'error',
                    position: 'bottom-right',
                });
            },
        });
    }

    return (
        <DashboardLayout>
            <Header
                title="Instellingen"
                description="Hier vind je alle instellingen van de applicatie en link je, je google voor kalender."
            />
            <div className="">
                {google ? (
                    <a href={route('google.redirect')} type="button">
                        <div className="flex w-fit gap-3 rounded-lg border border-border p-3">
                            <img
                                src={google.avatar}
                                alt=""
                                className="h-[55px] rounded-full"
                            />
                            <div className="flex flex-col justify-center">
                                <h1 className="font-semibold tracking-wide text-txt-one">
                                    {google.name}
                                </h1>
                                <p className="text-txt-two">{google.email}</p>
                            </div>
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                version="1.1"
                                x="0px"
                                y="0px"
                                viewBox="0 0 48 48"
                                enableBackground="new 0 0 48 48"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="#FFC107"
                                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                ></path>
                                <path
                                    fill="#FF3D00"
                                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                ></path>
                                <path
                                    fill="#4CAF50"
                                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                ></path>
                                <path
                                    fill="#1976D2"
                                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                ></path>
                            </svg>
                        </div>
                    </a>
                ) : (
                    <a href={route('google.redirect')} type="button">
                        <button
                            aria-label="Link your Google"
                            className="border-button-border-light hover:bg-bg-highlight flex items-center rounded-md border border-border p-0.5 pr-3 transition-all duration-300"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-l">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="h-8 w-8"
                                >
                                    <title>Link your Google</title>
                                    <desc>Google G Logo</desc>
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        className="fill-google-logo-blue"
                                    ></path>
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        className="fill-google-logo-green"
                                    ></path>
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        className="fill-google-logo-yellow"
                                    ></path>
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        className="fill-google-logo-red"
                                    ></path>
                                </svg>
                            </div>
                            <span className="tracking-wider text-txt-one">
                                Link your Google
                            </span>
                        </button>
                    </a>
                )}
            </div>
            <hr className="my-5 border-border" />
            <form onSubmit={submit} className="flex flex-col gap-5 pt-2">
                <Interactables.Select
                    label="Afstandsberekening Stappen"
                    value={
                        distanceCalculationStepOptions.find(
                            (o: MiscTypes.Option) =>
                                data.distance_calculation_step == o.value,
                        )?.label ?? ''
                    }
                    options={distanceCalculationStepOptions}
                    onChange={(e: MiscEnums.DistanceCalculationStepEnum) =>
                        setData('distance_calculation_step', e)
                    }
                />
                <Interactables.Select
                    label="Afstands Meeteenheid"
                    value={
                        measurementOptions.find(
                            (o: MiscTypes.Option) =>
                                data.measurement == o.value,
                        )?.label ?? ''
                    }
                    options={measurementOptions}
                    onChange={(e: MiscEnums.MeasurmentEnum) =>
                        setData('measurement', e)
                    }
                />
                <Interactables.Select
                    label="Munteenheid"
                    value={
                        currencyOptions.find(
                            (o: MiscTypes.Option) => data.currency == o.value,
                        )?.label ?? ''
                    }
                    options={currencyOptions}
                    onChange={(e: MiscEnums.CurrencyEnum) =>
                        setData('currency', e)
                    }
                />
                {/* <Interactables.Select
                    label="Taal"
                    value={
                        languageOptions.find(
                            (o: MiscTypes.Option) => data.language == o.value,
                        )?.label ?? ''
                    }
                    options={languageOptions}
                    onChange={(e: MiscEnums.LanguageEnum) =>
                        setData('language', e)
                    }
                /> */}

                <Interactables.Button
                    label="Opslaan"
                    submit
                    loading={processing}
                />
            </form>
        </DashboardLayout>
    );
}
