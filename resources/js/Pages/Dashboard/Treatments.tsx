import {
    DashboardLayout,
    Header,
    MiscTypes,
    React,
    TreatmentHeader,
    TreatmentList,
} from '@/.';
export default function Treatments({
    treatments,
}: {
    treatments: MiscTypes.Treatment[];
}) {
    const [search, setSearch] = React.useState<string>('');

    treatments = treatments.filter((treatment) => {
        return treatment.name.includes(search);
    });

    return (
        <DashboardLayout>
            <Header
                title="Behandelingen"
                description="Hier vind je een overzicht van alle behandelingen en maak je ook je behandelingen aan."
            />
            <TreatmentHeader setSearch={setSearch} />
            <TreatmentList treatments={treatments} />
        </DashboardLayout>
    );
}
