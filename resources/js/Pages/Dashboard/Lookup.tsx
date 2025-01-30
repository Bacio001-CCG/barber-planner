import {
    DashboardLayout,
    Header,
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
            <Header
                title="Opzoeken"
                description="Search for the last time you treated a customer, or check how much you have earned."
            />{' '}
            <LookupHeader
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <LookupResult selectedTab={selectedTab} />
        </DashboardLayout>
    );
}
