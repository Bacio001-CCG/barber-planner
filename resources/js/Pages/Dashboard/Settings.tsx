import { MiscTypes, MiscEnums, DashboardLayout, Interactables, InertiaReact } from '@/.';
export default function Settings({
    settings,
}: {
    settings: MiscTypes.Settings;
}) {

    const { data, setData, post, processing, errors, reset, patch } = InertiaReact.useForm<MiscTypes.Settings>({
        id: settings.id,
        distanceCalculationStep: settings.distanceCalculationStep,
        measurement: settings.measurement,
        currency: settings.currency,
        language: settings.language,
    });

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('submit');
    }

    return (
        <DashboardLayout>
            <form onSubmit={submit}></form>
            {/* <Interactables.Select
                label='Taal'
                value={settings.language}
                options={[
                    { label: 'Nederlands', value: MiscEnums.LanguageEnum.Dutch },
                    { label: 'Engels', value: MiscEnums.LanguageEnum.English },
                ]}
            /> */}
        </DashboardLayout>
    );
}