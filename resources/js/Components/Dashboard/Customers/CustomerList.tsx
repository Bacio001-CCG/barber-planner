import { CustomerModal, MiscTypes, React } from '@/index';

export default function CustomerList({
    customers,
}: {
    customers: MiscTypes.Customer[];
}) {
    
    const [selectedCustomer, setSelectedCustomer] = React.useState<MiscTypes.Customer | null>(null);
    const [showModal, setShowModal] = React.useState(false);

    if (customers.length == 0)
        return (
            <div className="no-scroll mt-3 flex h-full flex-col items-center justify-center overflow-y-auto uppercase tracking-widest">
                <div className="relative w-fit flex-col gap-2 text-center text-txt-one">
                    <h1 className="relative">Nog geen klanten...</h1>
                </div>
            </div>
        );

    return (
        <div className="no-scroll mt-3 h-full overflow-y-auto">
            <div className="flex h-full flex-col divide-y-[1px] divide-border/5 overflow-y-auto">
                {customers.map((customer: MiscTypes.Customer, index) => {
                    return (
                        <div className="relative w-full py-2 text-txt-one hover:bg-bg-hover pl-2 cursor-pointer rounded" key={index} onClick={() => {
                            setSelectedCustomer(customer);
                            setShowModal(true);
                        }}>
                            <h1>
                                {customer.firstName} {customer.infix} {customer.lastName}
                            </h1>
                            <h2 className="text-sm text-txt-two">
                                {customer.location}, {customer.address},{' '}
                                {customer.postalCode}
                            </h2>
                            <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-accent">
                                chevron_right
                            </span>
                        </div>
                    );
                })}
            </div>
            <CustomerModal
                mode="edit"
                setShowModal={setShowModal}
                showModal={showModal}
                customer={selectedCustomer}
            />
        </div>
    );
}
