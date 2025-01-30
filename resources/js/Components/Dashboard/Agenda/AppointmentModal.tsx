import {
    FinishAppointmentModal,
    FramerMotion,
    InertiaReact,
    Interactables,
    MiscTypes,
    Modal,
    React,
    ReactDom,
    Toast,
} from '@/index';
import { priceFormat } from '@/lib/misc';
import { ListItem } from './AppointmentList';

export default function AppointmentModal({
    showModal,
    setShowModal,
    mode,
    appointment,
}: {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    mode: 'create' | 'edit';
    appointment: MiscTypes.Appointment | null;
}) {
    function close() {
        setShowModal(false);
    }

    return (
        <>
            {ReactDom.createPortal(
                <Modal
                    title={
                        mode === 'create'
                            ? 'Afspraak Aanmaken'
                            : 'Afspraak Aanpassen'
                    }
                    onClose={close}
                    children={
                        <Body
                            mode={mode}
                            close={close}
                            appointment={appointment}
                        />
                    }
                    isOpen={showModal}
                />,
                document.body,
            )}
        </>
    );
}

function Body({
    mode,
    close,
    appointment,
}: {
    mode: 'create' | 'edit';
    close: () => void;
    appointment?: MiscTypes.Appointment | null;
}) {
    const { data, setData, post, processing, errors, reset, patch } =
        InertiaReact.useForm<{
            id: number | null;
            type: string;
            customers: string[];
            treatments: string[];
            notes: string;
            time: string;
            end_time?: string;
            date: string;
        }>({
            id: null,
            type: 'business',
            customers: [],
            treatments: [],
            notes: '',
            time: '',
            end_time: '',
            date: '',
        });

    const [showModal, setShowModal] = React.useState(false);
    const customers = InertiaReact.usePage().props.customers;
    const treatments = InertiaReact.usePage().props.treatments;
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
    const treatmentOptions = (treatments as MiscTypes.Treatment[]).map(
        (treatment: MiscTypes.Treatment) => {
            return {
                label: treatment.name,
                value: treatment.id.toString(),
            };
        },
    ) as MiscTypes.Option[];

    React.useEffect(() => {
        if (mode == 'edit' && appointment) {
            setData({
                // @ts-ignore
                id: appointment.id,
                type: appointment.type,
                customers: appointment.customers.map((customer) => {
                    return customer.id;
                }),
                treatments: appointment.treatments.map((treatment) => {
                    return treatment.id;
                }),
                notes: appointment.notes,
                time: `${String(new Date(appointment.dateTime).getHours()).padStart(2, '0')}:${String(new Date(appointment.dateTime).getMinutes()).padStart(2, '0')}`,
                end_time: `${String(new Date(appointment.endDateTime).getHours()).padStart(2, '0')}:${String(new Date(appointment.endDateTime).getMinutes()).padStart(2, '0')}`,
                date: new Date(appointment.dateTime)
                    .toISOString()
                    .split('T')[0],
            });
        }
    }, [mode, appointment]);

    React.useEffect(() => {
        if (mode === 'create') {
            if (data.time && !data.end_time) {
                const time = data.time.split(':');
                const endTime = new Date(
                    new Date().setHours(
                        parseInt(time[0]),
                        parseInt(time[1]) + 30,
                    ),
                );
                setData(
                    'end_time',
                    `${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`,
                );
            }
        }
    }, [mode, data]);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (mode == 'create')
            post(route('dashboard.agenda.store'), {
                onSuccess: () => {
                    Toast.toast('Afspraak Aangemaakt', {
                        type: 'success',
                        position: 'bottom-right',
                    });
                    reset();
                    close();
                },
                onError: () => {
                    Toast.toast('Aanmaken Mislukt', {
                        type: 'error',
                        position: 'bottom-right',
                    });
                },
            });
        else if (data.id)
            patch(route('dashboard.agenda.update', data.id), {
                onSuccess: () => {
                    Toast.toast('Afspraak Aangepast', {
                        type: 'success',
                        position: 'bottom-right',
                    });
                    reset();
                    close();
                },
                onError: () => {
                    Toast.toast('Aanpassen Mislukt', {
                        type: 'error',
                        position: 'bottom-right',
                    });
                },
            });
    }

    async function deleteItem(e: React.MouseEvent<HTMLInputElement>) {
        if (data.id) {
            e.preventDefault();
            if (
                confirm('Weet je zeker dat je deze afspraak wilt verwijderen?')
            ) {
                InertiaReact.router.delete(
                    route('dashboard.agenda.destroy', data.id),
                    {
                        onSuccess: () => {
                            Toast.toast('Afspraak Verwijderd', {
                                type: 'success',
                                position: 'bottom-right',
                            });
                            close();
                        },
                        onError: () => {
                            Toast.toast('Verwijderen Mislukt', {
                                type: 'error',
                                position: 'bottom-right',
                            });
                        },
                    },
                );
            }
        }
    }

    return (
        <>
            <form className="flex flex-col gap-5" onSubmit={submit}>
                <Interactables.Toggle
                    label={'Type afspraak'}
                    description={'Aan als het een persoonlijke afspraak is.'}
                    value={data.type == 'personal' ? true : false}
                    onChange={(e: boolean) =>
                        setData('type', e ? 'personal' : 'business')
                    }
                    hasError={errors.type ? true : false}
                />

                {mode === 'edit' && (
                    <AppointmentInfo
                        appointment={appointment as MiscTypes.Appointment}
                    />
                )}

                <AppointmentList
                    date={data.date}
                    appointment={appointment ? appointment : null}
                />

                {data.type == 'business' && (
                    <>
                        <Interactables.MultiSelect
                            label={'Klanten'}
                            emptyMessage="Er zijn geen klanten beschikbaar."
                            options={customerOptions}
                            values={data.customers.map(
                                (customerValue: string) => {
                                    const customer = customerOptions.find(
                                        (option) =>
                                            option.value == customerValue,
                                    );
                                    return customer ? customer.label : '';
                                },
                            )}
                            onAdd={(value: string) => {
                                const selectedCustomer = customerOptions.find(
                                    (option) => option.value == value,
                                );
                                if (
                                    selectedCustomer &&
                                    !data.customers.includes(
                                        selectedCustomer.value,
                                    )
                                ) {
                                    setData('customers', [
                                        ...data.customers,
                                        selectedCustomer.value,
                                    ]);
                                }
                            }}
                            onDelete={(value: string) => {
                                const selectedCustomer = customerOptions.find(
                                    (option) => option.label == value,
                                );
                                if (selectedCustomer) {
                                    setData(
                                        'customers',
                                        data.customers.filter(
                                            (customer) =>
                                                customer !=
                                                selectedCustomer.value,
                                        ),
                                    );
                                }
                            }}
                            hasError={errors.customers ? true : false}
                        />
                        <Interactables.MultiSelect
                            label={'Behandelingen'}
                            emptyMessage="Er zijn geen behandelingen beschikbaar."
                            allowOnceMultipleTimes={true}
                            options={treatmentOptions}
                            values={data.treatments.map(
                                (treatmentValue: string) => {
                                    const treatment = treatmentOptions.find(
                                        (option) =>
                                            option.value == treatmentValue,
                                    );
                                    return treatment ? treatment.label : '';
                                },
                            )}
                            onAdd={(value: string) => {
                                const selectedTreatment = treatmentOptions.find(
                                    (option) => option.value == value,
                                );
                                if (!selectedTreatment) return;
                                setData('treatments', [
                                    ...data.treatments,
                                    selectedTreatment.value,
                                ]);
                            }}
                            onDelete={(value: string) => {
                                const selectedTreatment = treatmentOptions.find(
                                    (option) => option.label == value,
                                );
                                if (selectedTreatment) {
                                    setData(
                                        'treatments',
                                        data.treatments.filter(
                                            (treatment) =>
                                                treatment !=
                                                selectedTreatment.value,
                                        ),
                                    );
                                }
                            }}
                            hasError={errors.treatments ? true : false}
                        />
                    </>
                )}

                <Interactables.Input
                    label={'Datum'}
                    value={data.date}
                    onChange={(e: string) => setData('date', e)}
                    type="date"
                    hasError={errors.date ? true : false}
                />
                <Interactables.Input
                    label={'Tijd'}
                    value={data.time}
                    onChange={(e: string) => setData('time', e)}
                    type="time"
                    hasError={errors.time ? true : false}
                />
                <Interactables.Input
                    label={'Eind Tijd'}
                    value={data.end_time}
                    onChange={(e: string) => setData('end_time', e)}
                    type="time"
                    hasError={errors.end_time ? true : false}
                />
                <Interactables.Textarea
                    label={'Extra informatie'}
                    value={data.notes}
                    onChange={(e: string) => setData('notes', e)}
                    hasError={errors.notes ? true : false}
                />
                {mode == 'edit' && (
                    <div
                        className={`grid grid-cols-${!appointment?.finished ? '2' : '1'} gap-5`}
                    >
                        {!appointment?.finished && (
                            <Interactables.Button
                                submit={false}
                                label={'Afronden'}
                                background={'green'}
                                onClick={(
                                    e: React.MouseEvent<HTMLInputElement>,
                                ) => {
                                    e.preventDefault();
                                    setShowModal(true);
                                }}
                            />
                        )}
                        <Interactables.Button
                            submit={false}
                            label={'Verwijderen'}
                            background={'red'}
                            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                                deleteItem(e)
                            }
                        />
                    </div>
                )}
                <Interactables.Button
                    submit
                    label={`${mode == 'create' ? 'Aanmaken' : 'Aanpassen'}`}
                />
            </form>
            {appointment && (
                <FinishAppointmentModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    appointment={appointment}
                />
            )}
        </>
    );
}

function AppointmentInfo({
    appointment,
}: {
    appointment: MiscTypes.Appointment | null;
}) {
    const [showInfo, setShowInfo] = React.useState(false);
    const customer = appointment?.customers?.[0];
    const prijs = appointment?.treatments?.reduce(
        (acc: number, treatment: MiscTypes.Treatment) => {
            return acc + parseFloat(treatment.price);
        },
        0,
    );
    if (!customer || !prijs) return <></>;
    return (
        <div>
            <div
                onClick={() => {
                    setShowInfo(!showInfo);
                }}
                className="mb-2 flex cursor-pointer justify-between border-b border-border pb-2 text-txt-one"
            >
                Afspraak Informatie{' '}
                <FramerMotion.motion.span
                    initial={'off'}
                    animate={showInfo ? 'on' : 'off'}
                    variants={{
                        off: {
                            rotate: '90deg',
                        },
                        on: {
                            rotate: '270deg',
                        },
                    }}
                    className="material-symbols-outlined cursor-pointer select-none text-accent"
                >
                    chevron_right
                </FramerMotion.motion.span>
            </div>
            <FramerMotion.motion.div
                initial={'off'}
                animate={showInfo ? 'on' : 'off'}
                variants={{
                    off: {
                        height: 0,
                        opacity: 0,
                    },
                    on: { height: 'auto', opacity: 1 },
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
            >
                <div className="flex flex-col gap-3 overflow-hidden rounded-lg border border-border bg-bg-extra-light p-2">
                    <div>
                        <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                            Locatie
                        </label>
                        <p className="text-sm text-txt-two">
                            {customer?.address && `${customer.address}, `}
                            {customer?.postalCode} {customer?.location}
                        </p>
                    </div>
                    <div>
                        <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                            Prijs
                        </label>
                        <p className="text-sm text-txt-two">
                            {priceFormat(prijs)}
                        </p>
                    </div>
                    <div>
                        <label className="text-sm font-semibold uppercase tracking-widest text-txt-one">
                            Telefoonnummer
                        </label>
                        <p className="text-sm text-txt-two">
                            {customer?.phoneNumber ?? 'Geen telefoonnummer'}
                        </p>
                    </div>
                </div>
            </FramerMotion.motion.div>
        </div>
    );
}

function AppointmentList({
    date,
    appointment,
}: {
    date: string;
    appointment: MiscTypes.Appointment | null;
}) {
    const [showInfo, setShowInfo] = React.useState(false);
    const appointments = InertiaReact.usePage().props
        .appointments as MiscTypes.Appointment[];
    const appointmentsThisDay = appointments.filter((a) => {
        if (date == '') return false;
        return (
            new Date(a.dateTime).toISOString().split('T')[0] ==
            new Date(date).toISOString().split('T')[0]
        );
    });
    return (
        <div>
            <div
                onClick={() => {
                    setShowInfo(!showInfo);
                }}
                className="mb-2 flex cursor-pointer justify-between border-b border-border pb-2 text-txt-one"
            >
                Afspraken op geselecteerde dag
                <FramerMotion.motion.span
                    initial={'off'}
                    animate={showInfo ? 'on' : 'off'}
                    variants={{
                        off: {
                            rotate: '90deg',
                        },
                        on: {
                            rotate: '270deg',
                        },
                    }}
                    className="material-symbols-outlined cursor-pointer select-none text-accent"
                >
                    chevron_right
                </FramerMotion.motion.span>
            </div>
            <FramerMotion.motion.div
                initial={'off'}
                animate={showInfo ? 'on' : 'off'}
                variants={{
                    off: {
                        height: 0,
                        opacity: 0,
                    },
                    on: { height: 'auto', opacity: 1 },
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
            >
                {date == '' && (
                    <p className="text-center text-sm text-txt-two">
                        Selecteer een datum om afspraken te zien
                    </p>
                )}
                {appointmentsThisDay.length == 0 ? (
                    <p className="text-center text-sm text-txt-two">
                        Geen afspraken op geselecteerde datum
                    </p>
                ) : (
                    appointmentsThisDay
                        .filter((a) => a.id != appointment?.id)
                        .map((appointment) => (
                            <ListItem
                                key={appointment.id}
                                index={appointment.id}
                                item={appointment as MiscTypes.Appointment}
                            />
                        ))
                )}
            </FramerMotion.motion.div>
        </div>
    );
}
