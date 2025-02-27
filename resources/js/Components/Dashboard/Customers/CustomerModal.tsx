import {
    InertiaReact,
    Interactables,
    Loader,
    MiscTypes,
    Modal,
    React,
    ReactDom,
    Toast,
    axios,
} from '@/index';

export default function CustomerModal({
    showModal,
    setShowModal,
    mode,
    customer,
    setSelectedCustomer,
}: {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    mode: 'create' | 'edit';
    customer?: MiscTypes.Customer | null;
    setSelectedCustomer: (value: MiscTypes.Customer | null) => void;
}) {
    function close() {
        setShowModal(false);
    }

    return (
        <>
            {ReactDom.createPortal(
                <Modal
                    title={
                        mode === 'create' ? 'Klant Aanmaken' : 'Klant Aanpassen'
                    }
                    onClose={() => {
                        setSelectedCustomer(null);
                        close();
                    }}
                    children={
                        <Body mode={mode} close={close} customer={customer} />
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
    customer,
}: {
    mode: 'create' | 'edit';
    close: () => void;
    customer?: MiscTypes.Customer | null;
}) {
    const [addressData, setAddressData] =
        React.useState<MiscTypes.NominatimResponse | null>(null);
    const [loading, setLoading] = React.useState(false);
    const { data, setData, post, processing, errors, reset, patch } =
        InertiaReact.useForm<{
            id: number | null;
            first_name: string;
            infix: string;
            last_name: string;
            phone_number: string;
            email: string;
            location: string;
            address: string;
            postal_code: string;
            osm_id: string | null;
            manual_distance: number;
            notes: string;
        }>({
            id: null,
            first_name: '',
            infix: '',
            last_name: '',
            phone_number: '',
            email: '',
            location: '',
            address: '',
            postal_code: '',
            osm_id: null,
            manual_distance: 0,
            notes: '',
        });

    React.useEffect(() => {
        if (mode === 'edit' && customer) {
            setData({
                id: customer.id,
                first_name: customer?.firstName ?? '',
                infix: customer?.infix ?? '',
                last_name: customer?.lastName ?? '',
                phone_number: customer?.phoneNumber ?? '',
                email: customer?.email ?? '',
                location: customer?.location ?? '',
                address: customer?.address ?? '',
                postal_code: customer?.postalCode ?? '',
                osm_id: customer?.osmId ?? null,
                manual_distance: customer?.manualDistance ?? 0,
                notes: customer?.notes ?? '',
            });
        }
    }, [mode, customer]);

    async function fetchAddressData() {
        if (data.address) {
            setData({
                ...data,
                location: '',
                postal_code: '',
                osm_id: null,
            });
            try {
                const response = await axios.get(
                    `/api/address/search?address=${encodeURIComponent(data.address)}`,
                    {
                        withCredentials: true,
                    },
                );

                const addressData = await response.data;
                setAddressData(addressData);
            } catch (err) {
                console.error('Error fetching address data:', err);
            }
        }
        setLoading(false);
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (mode == 'create')
            post(route('dashboard.customers.store'), {
                onSuccess: () => {
                    Toast.toast('Klant Aangemaakt', {
                        type: 'success',
                        position: 'bottom-right',
                    });
                    reset();
                    close();
                },
                onError: () => {
                    console.log(errors);
                    Toast.toast('Aanmaken Mislukt', {
                        type: 'error',
                        position: 'bottom-right',
                    });
                },
            });
        else if (data.id)
            patch(route('dashboard.customers.update', data.id), {
                onSuccess: () => {
                    Toast.toast('Klant Aangepast', {
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
            if (confirm('Weet je zeker dat je deze klant wilt verwijderen?')) {
                InertiaReact.router.delete(
                    route('dashboard.customers.destroy', data.id),
                    {
                        onSuccess: () => {
                            Toast.toast('Klant Verwijderd', {
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
        <form className="flex flex-col gap-5" onSubmit={submit}>
            <Interactables.Input
                label={'Voornaam'}
                value={data.first_name}
                onChange={(e: string) => setData('first_name', e)}
                type="text"
                hasError={!!errors.first_name ? true : false}
                required={true}
            />
            <Interactables.Input
                label={'Tussenvoegsel'}
                value={data.infix}
                onChange={(e: string) => setData('infix', e)}
                type="text"
                hasError={!!errors.infix ? true : false}
            />
            <Interactables.Input
                label={'Achternaam'}
                value={data.last_name}
                onChange={(e: string) => setData('last_name', e)}
                type="text"
                hasError={!!errors.last_name ? true : false}
                required={true}
            />
            <Interactables.Input
                label={'Telefoonnummer'}
                value={data.phone_number}
                onChange={(e: string) => setData('phone_number', e)}
                type="text"
                hasError={!!errors.phone_number ? true : false}
            />
            <Interactables.Input
                label={'Email'}
                value={data.email}
                onChange={(e: string) => setData('email', e)}
                type="email"
                hasError={!!errors.email ? true : false}
            />

            <div className="relative w-full">
                <Interactables.Input
                    label={'Adres'}
                    value={data.address}
                    onChange={(e: string) => setData('address', e)}
                    type="text"
                    hasError={!!errors.address ? true : false}
                    required={true}
                    disabled={!!addressData}
                />
                {addressData ? (
                    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 cursor-pointer gap-2 text-sm text-txt-two">
                        <span
                            className="material-symbols-outlined text-green-500"
                            onClick={() => {
                                setData({
                                    ...data,
                                    location:
                                        addressData?.address?.city ??
                                        addressData?.address?.village,
                                    postal_code: addressData?.address?.postcode,
                                    osm_id: addressData?.osm_id?.toString(),
                                });
                                setAddressData(null);
                            }}
                        >
                            check
                        </span>
                        <span
                            className="material-symbols-outlined text-red-500"
                            onClick={() => {
                                setAddressData(null);
                            }}
                        >
                            close
                        </span>
                    </div>
                ) : (
                    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 cursor-pointer gap-2 text-sm text-txt-two">
                        {loading ? (
                            <Loader />
                        ) : (
                            <span
                                className="material-symbols-outlined text-txt-two"
                                onClick={() => {
                                    setLoading(true);
                                    fetchAddressData();
                                }}
                            >
                                search
                            </span>
                        )}
                    </div>
                )}
            </div>

            <Interactables.Input
                label={'Plaats'}
                value={data.location}
                onChange={(e: string) => setData('location', e)}
                type="text"
                hasError={!!errors.location ? true : false}
                required={true}
                placeholder={
                    addressData?.address?.city ?? addressData?.address?.village
                }
            />
            <Interactables.Input
                label={'Postcode'}
                value={data.postal_code}
                onChange={(e: string) => setData('postal_code', e)}
                type="text"
                hasError={!!errors.postal_code ? true : false}
                required={true}
                placeholder={addressData?.address?.postcode}
            />
            <div className="relative">
                {data.osm_id && (
                    <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black opacity-50">
                        <span className="text-white">Gevonden op OSM</span>
                    </div>
                )}
                <Interactables.Input
                    label={'Handmatige Afstand'}
                    disabled={data?.osm_id ? true : false}
                    value={data.manual_distance}
                    onChange={(e: string) =>
                        setData('manual_distance', parseInt(e))
                    }
                    type="number"
                    hasError={!!errors.manual_distance ? true : false}
                    required={true}
                    placeholder={addressData?.address?.manualDistance}
                />
            </div>
            <Interactables.Textarea
                label={'Opmerkingen'}
                value={data.notes}
                onChange={(e: string) => setData('notes', e)}
                hasError={!!errors.notes ? true : false}
            />

            <Interactables.Button
                submit
                label={`${mode == 'create' ? 'Aanmaken' : 'Aanpassen'}`}
            />
            {mode == 'edit' && (
                <Interactables.Button
                    submit={false}
                    label={'Verwijderen'}
                    background={'red'}
                    onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                        deleteItem(e)
                    }
                />
            )}
        </form>
    );
}
