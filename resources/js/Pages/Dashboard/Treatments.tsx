import { TreatmentHeader, DashboardLayout, TreatmentList, MiscTypes, React } from "@/.";
export default function Treatments({
    treatments,
}: {
    treatments: MiscTypes.Treatment[];
}) {

    const [search, setSearch] = React.useState<string>('');

    treatments = treatments.filter((treatment) => {
        return (
            treatment.name.includes(search)
        );
    });

    return (
        <DashboardLayout>
            <TreatmentHeader setSearch={setSearch} />
            <TreatmentList treatments={treatments} />
        </DashboardLayout>
    )
}