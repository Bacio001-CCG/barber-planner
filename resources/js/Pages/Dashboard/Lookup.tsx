import {
    DashboardLayout,
    LookupHeader,
    LookupResult,
    MiscTypes,
    React,
} from '@/.';
export default function Lookup({
    customers,
    treatments,
    appointments,
}: {
    customers: MiscTypes.Customer[];
    treatments: MiscTypes.Treatment[];
    appointments: MiscTypes.Appointment[];
}) {
    const [selectedTab, setSelectedTab] = React.useState<string>('afspraak');
    return (
        <DashboardLayout>
            <LookupHeader
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <LookupResult selectedTab={selectedTab} />
        </DashboardLayout>
    );
}
