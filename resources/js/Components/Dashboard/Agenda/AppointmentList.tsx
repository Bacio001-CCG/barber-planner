import {
    AppointmentModal,
    GoogleIcon,
    InertiaReact,
    MiscLib,
    MiscTypes,
    React,
} from '@/.';

export default function AppointmentList() {
    const dates = InertiaReact.usePage().props?.dates as {
        date: string;
        data: MiscTypes.Appointment[];
    }[];

    if (Object.entries(dates).length == 0)
        return (
            <div className="no-scroll mt-3 flex h-full flex-col items-center justify-center overflow-y-auto uppercase tracking-widest">
                <div className="relative w-fit flex-col gap-2 text-center text-txt-one">
                    <h1 className="relative">Nog geen afspraken...</h1>
                </div>
            </div>
        );
    return (
        <div className="no-scroll mt-3 h-full max-h-[50vh] overflow-y-auto">
            <div className="flex h-full flex-col">
                {Object.entries(dates).map(
                    ([key, data]: [string, any], index) => {
                        const date = new Date(key);
                        return (
                            <div className="flex flex-col" key={index}>
                                <div
                                    className={`sticky top-0 z-[${10 + index * 10}] flex h-[16px] w-full items-center justify-center bg-bg-normal`}
                                >
                                    <hr className="relative w-full border border-border" />
                                    <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-bg-normal px-1 text-center text-xs uppercase tracking-widest text-txt-two">
                                        {MiscLib.dayNames[date.getDay() - 1]},{' '}
                                        {date.getDate()}{' '}
                                        {MiscLib.monthNames[date.getMonth()]}{' '}
                                        {date.getFullYear()}
                                    </h1>
                                </div>
                                <div className="flex h-full w-full flex-col divide-y-[1px] divide-border overflow-y-auto">
                                    {data.map(
                                        (
                                            item: MiscTypes.Appointment,
                                            index2: number,
                                        ) => (
                                            <ListItem
                                                key={index2}
                                                item={item}
                                                index={index2}
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                        );
                    },
                )}
            </div>
        </div>
    );
}

export function ListItem({
    index,
    item,
}: {
    index: number;
    item: MiscTypes.Appointment;
}) {
    const customerNames = item.customers
        .map((customer) =>
            customer.infix
                ? `${customer.firstName} ${customer.infix} ${customer.lastName}`
                : `${customer.firstName} ${customer.lastName}`,
        )
        .join(', ');
    const treatmentNames = item.treatments
        .map((treatment) => treatment.name)
        .join(', ');
    const [selectedAppointment, setSelectedAppointment] =
        React.useState<MiscTypes.Appointment | null>(null);
    const [showModal, setShowModal] = React.useState(false);
    return (
        <div className="relative w-full cursor-pointer py-2 text-txt-one">
            {item.googleEvent && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    {' '}
                    <GoogleIcon scale={75} />
                </div>
            )}
            <div
                className={`${item.highlight && 'rounded border border-border-highlight bg-bg-highlight'} flex min-h-[68px] w-full px-4 py-2`}
            >
                <time className="flex flex-col items-center justify-center">
                    <div className="pb-0.5">
                        {new Date(item.dateTime).toLocaleTimeString('nl-NL', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </div>
                    <div className="border-border/30 border-t pt-1 text-xs text-txt-two">
                        {new Date(item.endDateTime).toLocaleTimeString(
                            'nl-NL',
                            {
                                hour: '2-digit',
                                minute: '2-digit',
                            },
                        )}
                    </div>
                </time>
                <div
                    className={`ml-3 w-full overflow-hidden border-l-2 pl-3 ${item.finished ? 'border-green-500' : 'border-red-500'}`}
                    onClick={() => {
                        setSelectedAppointment(item);
                        setShowModal(true);
                    }}
                >
                    {item.type === 'personal' ? (
                        <>
                            <h1>Persoonlijke afspraak</h1>
                            <p className="mt-2 truncate text-sm text-txt-two">
                                {item.notes}
                            </p>
                        </>
                    ) : (
                        <>
                            <h1>{customerNames}</h1>
                            <h2 className="mt-2 text-sm text-txt-two">
                                {treatmentNames}
                            </h2>
                            <h2 className="text-sm text-txt-two">
                                {item.location}
                            </h2>
                        </>
                    )}
                </div>
                <AppointmentModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    mode="edit"
                    appointment={selectedAppointment}
                />
            </div>
        </div>
    );
}
