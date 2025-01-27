import { InertiaReact, Interactables, MiscLib, MiscTypes, React } from '@/.';
export default function LookupResult({ selectedTab }: { selectedTab: string }) {
    return (
        <>
            <div className="mt-5 flex flex-col gap-6 text-txt-one">
                {selectedTab === 'afspraak' ? (
                    <AppointmentLookup />
                ) : (
                    <BankLookup />
                )}
            </div>
        </>
    );
}

function AppointmentLookup() {
    const [selectedCustomer, setSelectedCustomer] =
        React.useState<MiscTypes.Customer | null>(null);
    const [selectedTreatment, setSelectedTreatment] =
        React.useState<MiscTypes.Treatment | null>(null);

    const customers = InertiaReact.usePage().props.customers;
    const appointments = InertiaReact.usePage().props.appointments;
    const [results, setResults] = React.useState<MiscTypes.Appointment[]>([]);
    const [onlyShowFinished, setOnlyShowFinished] =
        React.useState<boolean>(false);
    const customerOptions = (customers as MiscTypes.Customer[]).map(
        (customer: MiscTypes.Customer) => {
            return {
                label: customer.infix
                    ? `${customer.firstName} ${customer.infix} ${customer.lastName}`
                    : `${customer.firstName} ${customer.lastName}`,
                value: customer.id?.toString(),
            };
        },
    ) as MiscTypes.Option[];

    React.useEffect(() => {
        if (selectedCustomer) {
            setResults(
                (appointments as MiscTypes.Appointment[])
                    .filter((appointment) =>
                        appointment.customers.find(
                            (customer) => customer.id == selectedCustomer.id,
                        ),
                    )
                    .filter((appointment) =>
                        onlyShowFinished ? appointment.finished : true,
                    )
                    .sort(
                        (a, b) =>
                            new Date(a.dateTime).getTime() -
                            new Date(b.dateTime).getTime(),
                    )
                    .reverse(),
            );
        }
    }, [selectedCustomer, selectedTreatment, onlyShowFinished]);

    return (
        <>
            <div className="border-b border-border/10 pb-2">
                <h1 className="text-xl font-semibold">Klant Afspraaken</h1>
                <p className="text-txt-two">
                    Zoek naar de afspraken gefiltered op gegeven parameters.
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <Interactables.Select
                    label={'Klant'}
                    options={customerOptions}
                    value={
                        customerOptions.find(
                            (option) =>
                                option.value ==
                                selectedCustomer?.id?.toString(),
                        )?.label ?? ''
                    }
                    onChange={(value: number) => {
                        setSelectedCustomer(
                            (customers as MiscTypes.Customer[]).find(
                                (customer) => customer.id == value,
                            ) ?? null,
                        );
                    }}
                />
                <Interactables.Toggle
                    label={'Afgeronde afspraken'}
                    description="Toon alleen de afgewerkte afspraken."
                    value={onlyShowFinished}
                    onChange={() => {
                        setOnlyShowFinished(!onlyShowFinished);
                    }}
                />
                <div className="overlfow-y-auto relative max-h-[20rem] rounded-lg border border-border/10 bg-bg-extra-light p-3 py-5">
                    {results.length == 0 ? (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-widest text-txt-two">
                            Geen resultaten...
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {results.map((appointment) => {
                                return (
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <p className="font-semibold">
                                                {appointment.customers
                                                    .map(
                                                        (customer) =>
                                                            customer.firstName,
                                                    )
                                                    .join(', ')}
                                            </p>
                                            <p>
                                                {appointment.treatments
                                                    .map(
                                                        (treatment) =>
                                                            treatment.name,
                                                    )
                                                    .join(', ')}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="my-auto text-txt-two">
                                                {new Date(appointment.dateTime)
                                                    .toLocaleString('nl-NL')
                                                    .split(':')[0]
                                                    .replaceAll('-', '/')}
                                                :
                                                {
                                                    new Date(
                                                        appointment.dateTime,
                                                    )
                                                        .toLocaleString('nl-NL')
                                                        .split(':')[1]
                                                }
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function BankLookup() {
    const finished = InertiaReact.usePage().props
        .finished as MiscTypes.FinishedAppointment[];
    const [van, setVan] = React.useState('');
    const [tot, setTot] = React.useState('');
    const [results, setResults] = React.useState<
        MiscTypes.FinishedAppointment[]
    >([]);

    const isDateBetween = (date: string, start: string, end: string) => {
        const dateObj = new Date(date);
        const startObj = new Date(start);
        const endObj = new Date(end);
        startObj.setHours(0, 0, 0, 0);
        endObj.setHours(23, 59, 59, 999);
        return dateObj >= startObj && dateObj <= endObj;
    };

    React.useEffect(() => {
        if (van && tot) {
            const filtered = finished.filter((item: any) =>
                isDateBetween(item.createdAt, van, tot),
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [finished, van, tot]);

    return (
        <>
            <div className="border-b border-border/10 pb-2">
                <h1 className="text-xl font-semibold">Inkomen</h1>
                <p className="text-txt-two">
                    Zie uw inkomen tussen geselecteerde datums.
                </p>
            </div>
            <div className="mt-4 flex gap-4">
                <Interactables.Input
                    label={'Van'}
                    type="date"
                    value={van}
                    onChange={setVan}
                />
                <Interactables.Input
                    label={'Tot'}
                    type="date"
                    value={tot}
                    onChange={setTot}
                />
            </div>
            <div className="relative max-h-[20rem] overflow-y-auto rounded-lg border border-border/10 bg-bg-extra-light p-3 py-4">
                <div className="flex items-center text-lg font-semibold">
                    <span className="material-symbols-outlined mr-2 scale-75 text-accent">
                        euro
                    </span>
                    <span className="mr-2">Totaal:</span>
                    <span className="font-normal">
                        {MiscLib.priceFormat(
                            results
                                .map(
                                    (r: MiscTypes.FinishedAppointment) =>
                                        r.price,
                                )
                                .reduce((acc, price) => acc + price, 0),
                        )}
                    </span>
                </div>
                <div className="flex items-center text-lg font-semibold">
                    <span className="material-symbols-outlined mr-2 scale-75 text-accent">
                        payments
                    </span>
                    <span className="mr-2">Contant:</span>
                    <span className="font-normal">
                        {MiscLib.priceFormat(
                            results
                                .filter(
                                    (r: MiscTypes.FinishedAppointment) =>
                                        r.paymentType == 'cash',
                                )
                                .map((r: { price: number }) => r.price)
                                .reduce((acc, price) => acc + price, 0),
                        )}
                    </span>
                </div>
                <div className="flex items-center text-lg font-semibold">
                    <span className="material-symbols-outlined mr-2 scale-75 text-accent">
                        credit_card
                    </span>
                    <span className="mr-2">Debit Kaart:</span>
                    <span className="font-normal">
                        {MiscLib.priceFormat(
                            results
                                .filter(
                                    (r: MiscTypes.FinishedAppointment) =>
                                        r.paymentType == 'card',
                                )
                                .map((r: { price: number }) => r.price)
                                .reduce((acc, price) => acc + price, 0),
                        )}
                    </span>
                </div>
                <div className="flex items-center text-lg font-semibold">
                    <span className="material-symbols-outlined mr-2 scale-75 text-accent">
                        savings
                    </span>
                    <span className="mr-2">Fooi:</span>
                    <span className="font-normal">
                        {MiscLib.priceFormat(
                            results
                                .map(
                                    (r: MiscTypes.FinishedAppointment) => r.tip,
                                )
                                .reduce((acc, tip) => acc + tip, 0),
                        )}
                    </span>
                </div>
            </div>
            <div className="overlfow-y-auto relative max-h-[20rem] rounded-lg border border-border/10 bg-bg-extra-light p-3 py-5">
                {results.length == 0 && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-widest text-txt-two">
                        Geen resultaten...
                    </div>
                )}
                {results.map((item: any) => (
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <p className="font-semibold">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                            <p>
                                {item.paymentType
                                    .replace('card', 'debit kaart')
                                    .replace('cash', 'contant')}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="my-auto text-txt-two">
                                <div>{MiscLib.priceFormat(item.price)}</div>
                                {parseFloat(item.tip) > 0 && (
                                    <div className="text-sm text-gray-500">
                                        +{MiscLib.priceFormat(item.tip)} tip
                                    </div>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
