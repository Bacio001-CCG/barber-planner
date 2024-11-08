import { MiscTypes, MiscEnums, DashboardLayout, Interactables, InertiaReact, Toast } from '@/.';

const distanceCalculationStepOptions: MiscTypes.Option[] = [
    { label: 'Van Afspraak Naar Afspraak', value: MiscEnums.DistanceCalculationStepEnum.FromAppointmentToAppointment },
    { label: 'Van Bedrijf Naar Afspraak Naar Bedrijf', value: MiscEnums.DistanceCalculationStepEnum.FromCompanyToAppointmentToCompany },
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
}: {
    settings: MiscTypes.Settings;
}) {

    const { data, setData, post, processing, errors, reset, patch } = InertiaReact.useForm<{
        id: number,
        distance_calculation_step: MiscEnums.DistanceCalculationStepEnum,
        measurement: MiscEnums.MeasurmentEnum,
        currency: MiscEnums.CurrencyEnum,
        language: MiscEnums.LanguageEnum,
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
                    position: 'bottom-right'
                });
            },
            onError: () => {
                Toast.toast('Er is iets fout gegaan', {
                    type: 'error',
                    position: 'bottom-right'
                });
            }
        });
    }

    return (
        <DashboardLayout>
            <form onSubmit={submit} className='flex flex-col gap-5'>

                <Interactables.Select
                    label='Afstandsberekening Stappen'
                    value={distanceCalculationStepOptions.find((o: MiscTypes.Option) => data.distance_calculation_step == o.value)?.label ?? ''}
                    options={distanceCalculationStepOptions}
                    onChange={(e: MiscEnums.DistanceCalculationStepEnum) => setData('distance_calculation_step', e)}
                />
                <Interactables.Select
                    label='Afstands Meeteenheid'
                    value={measurementOptions.find((o: MiscTypes.Option) => data.measurement == o.value)?.label ?? ''}
                    options={measurementOptions}
                    onChange={(e: MiscEnums.MeasurmentEnum) => setData('measurement', e)}
                />
                <Interactables.Select
                    label='Munteenheid'
                    value={currencyOptions.find((o: MiscTypes.Option) => data.currency == o.value)?.label ?? ''}
                    options={currencyOptions}
                    onChange={(e: MiscEnums.CurrencyEnum) => setData('currency', e)}
                />
                <Interactables.Select
                    label='Taal'
                    value={languageOptions.find((o: MiscTypes.Option) => data.language == o.value)?.label ?? ''}
                    options={languageOptions}
                    onChange={(e: MiscEnums.LanguageEnum) => setData('language', e)}
                />

                <Interactables.Button
                    label='Opslaan'
                    submit
                    loading={processing}
                />
            </form>
        </DashboardLayout>
    );
}