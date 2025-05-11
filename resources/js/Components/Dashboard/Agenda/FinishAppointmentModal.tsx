import {
    InertiaReact,
    Interactables,
    MiscTypes,
    Modal,
    React,
    ReactDom,
    Toast,
    axios,
} from '@/index';

const paymentOptions = [
    { label: 'Contant', value: 'cash' },
    { label: 'Kaart', value: 'card' },
];

export default function FinishAppointmentModal({
    showModal,
    setShowModal,
    appointment,
    edit,
}: {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    appointment: MiscTypes.Appointment | null | undefined;
    edit: boolean;
}) {
    function close() {
        setShowModal(false);
    }
    return (
        <>
            {ReactDom.createPortal(
                <Modal
                    title={'Afspraak Afronden'}
                    onClose={close}
                    children={
                        <Body
                            close={close}
                            appointment={appointment}
                            edit={edit}
                        />
                    }
                    isOpen={showModal}
                    zIndex={9999}
                />,
                document.body,
            )}
        </>
    );
}

function Body({
    close,
    appointment,
    edit,
}: {
    close: () => void;
    appointment: MiscTypes.Appointment | null | undefined;
    edit: boolean;
}) {
    const { data, post, setData, errors, patch } = InertiaReact.useForm<{
        appointment_id: number;
        price: number;
        tip: number;
        payment_type: 'card' | 'cash';
        distance: number;
    }>({
        appointment_id: 0,
        price: 0,
        tip: 0,
        payment_type: 'card',
        distance: 0,
    });
    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (edit) {
            patch(
                route(
                    'dashboard.finish-appointment.update',
                    data.appointment_id,
                ),
                {
                    onSuccess: () => {
                        Toast.toast('Afspraak Afgerond', {
                            type: 'success',
                            position: 'bottom-right',
                        });
                        close();
                    },
                    onError: () => {
                        Toast.toast('Afronding Mislukt', {
                            type: 'error',
                            position: 'bottom-right',
                        });
                    },
                },
            );
        } else {
            post(
                route(
                    'dashboard.finish-appointment.store',
                    data.appointment_id,
                ),
                {
                    onSuccess: () => {
                        Toast.toast('Afspraak Afgerond', {
                            type: 'success',
                            position: 'bottom-right',
                        });
                        close();
                    },
                    onError: () => {
                        Toast.toast('Afronding Mislukt', {
                            type: 'error',
                            position: 'bottom-right',
                        });
                    },
                },
            );
        }
    }

    React.useEffect(() => {
        async function fetchData() {
            if (!appointment) return;
            let distance = 0;

            try {
                const response = await axios.get(
                    '/api/address/distance/' + appointment.id,
                    {
                        withCredentials: true,
                    },
                );
                const result = (await response.data) as {
                    distance: number;
                };
                console.log(result);
                distance = result.distance;
            } catch (err) {
                Toast.toast('Afstand kon niet geladen worden!', {
                    type: 'error',
                    position: 'bottom-right',
                });
                console.log(err);
            }

            setData({
                appointment_id: appointment?.id,
                price: appointment?.treatments
                    .map((treatment) => {
                        return parseFloat(treatment.price);
                    })
                    .reduce((a, b) => {
                        return a + b;
                    }),
                tip: 0,
                payment_type: 'card',
                distance: Math.round(distance),
            });
        }
        fetchData();
    }, [appointment]);

    return (
        <form className="flex flex-col gap-5" onSubmit={submit}>
            <Interactables.Input
                label={`Prijs, Excl. Fooi (€)`}
                value={data.price}
                onChange={(e: number) => setData('price', e)}
                type="number"
                hasError={!!errors.price}
                placeholder="0"
                required
            />

            <Interactables.Input
                label={`Fooi (€)`}
                value={data.tip}
                onChange={(e: number) => setData('tip', e)}
                type="number"
                hasError={!!errors.tip}
                placeholder="0"
                required
            />

            <Interactables.Input
                label={`Afstand (Meter)`}
                value={data.distance}
                onChange={(e: number) => setData('distance', e)}
                type="number"
                hasError={!!errors.distance}
                required
            />

            <Interactables.Select
                label={'Betaalmethode'}
                value={
                    paymentOptions.find(
                        (option) => option.value == data.payment_type,
                    )?.label ?? 'Kaart'
                }
                options={paymentOptions}
                onChange={(e: string) =>
                    setData('payment_type', e as 'card' | 'cash')
                }
            />

            <Interactables.Button
                label={'Afronden'}
                background={'green'}
                submit={true}
            />
        </form>
    );
}
