import { CustomerHeader, DashboardLayout, CustomerList, MiscTypes, React } from "@/.";
export default function Customers({
    customers,
}: {
    customers: MiscTypes.Customer[];
}) {

    const [search, setSearch] = React.useState<string>('');

    customers = customers.filter((customer) => {
        return (
            (customer.firstName + ' ' + customer.infix + ' ' + customer.lastName).includes(search) ||
            (customer.firstName + ' ' + customer.lastName).includes(search)
        );
    });

    return (
        <DashboardLayout>
            <CustomerHeader setSearch={setSearch} />
            <CustomerList customers={customers} />
        </DashboardLayout>
    )
}