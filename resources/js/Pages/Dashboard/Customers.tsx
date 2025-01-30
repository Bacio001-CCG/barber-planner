import {
    CustomerHeader,
    CustomerList,
    DashboardLayout,
    Header,
    MiscTypes,
    React,
} from '@/.';
export default function Customers({
    customers,
}: {
    customers: MiscTypes.Customer[];
}) {
    const [search, setSearch] = React.useState<string>('');

    customers = customers.filter((customer) => {
        return (
            (
                customer.firstName +
                ' ' +
                customer.infix +
                ' ' +
                customer.lastName
            ).includes(search) ||
            (customer.firstName + ' ' + customer.lastName).includes(search)
        );
    });

    return (
        <DashboardLayout>
            <Header
                title="Klanten"
                description="Hier vind je een overzicht van alle klanten en maak je ook je klanten aan."
            />
            <CustomerHeader setSearch={setSearch} />
            <CustomerList customers={customers} />
        </DashboardLayout>
    );
}
