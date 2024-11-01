import { InertiaReact, Interactables, Modal, React, ReactDom, Toast, MiscTypes, Loader } from '@/index';
import Loading from '../Loading';

export default function CustomerModal({
    showModal,
    setShowModal,
    mode,
    customer
}: {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    mode: 'create' | 'edit';
    customer?: MiscTypes.Customer | null;
}) {
    function close() {
        setShowModal(false);
    }

    return (
        <>
            {ReactDom.createPortal(
                <Modal
                    title={mode === 'create' ? 'Klant Aanmaken' : 'Klant Aanpassen'}
                    onClose={close}
                    children={<Body mode={mode} close={close} customer={customer} />}
                    isOpen={showModal}
                />,
                document.body,
            )}
        </>
    );
}

function Body({ mode, close, customer }: { mode: 'create' | 'edit', close: () => void, customer?: MiscTypes.Customer | null }) {
    const [addressData, setAddressData] = React.useState<MiscTypes.NominatimResponse | null>(null);
    const [loading, setLoading] = React.useState(false);
    const { data, setData, post, processing, errors, reset, patch } = InertiaReact.useForm<{
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
    });

    React.useEffect(() => {
        if (mode === 'edit' && customer) {
            setData({
                id: customer.id,
                first_name: customer.firstName,
                infix: customer.infix,
                last_name: customer.lastName,
                phone_number: customer.phoneNumber,
                email: customer.email,
                location: customer.location,
                address: customer.address,
                postal_code: customer.postalCode,
                osm_id: null,
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
            })
            try {
                const response = await fetch(`/api/address/search?address=${encodeURIComponent(data.address)}`);
                const addressData = await response.json();
                setAddressData(addressData);
            } catch (err) {
                console.error('Error fetching address data:', err);
            }
        }
        setLoading(false);
    }
    
    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if(mode == 'create') post(route('dashboard.customers.store'), {
            onSuccess: () => {
                Toast.toast('Klant Aangemaakt', {
                    type: 'success',
                    position: 'bottom-right'
                });
                reset();
                close();
            },
            onError: () => {
                Toast.toast('Aanmaken Mislukt', {
                    type: 'error',
                    position: 'bottom-right'
                });
            },
        }); else if(data.id) patch(route('dashboard.customers.update', data.id), {
                onSuccess: () => {
                    Toast.toast('Klant Aangepast', {
                        type: 'success',
                        position: 'bottom-right'
                    });
                    reset();
                    close();
                },  
                onError: () => {
                    Toast.toast('Aanpassen Mislukt', {
                        type: 'error',
                        position: 'bottom-right'
                    });
                },
            });
    }
    
    async function deleteItem(e: React.MouseEvent<HTMLInputElement>) {
        if (data.id) {
            e.preventDefault();
            if (confirm('Weet je zeker dat je deze klant wilt verwijderen?')) {
                InertiaReact.router.delete(route('dashboard.customers.destroy', data.id), {
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
                });
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

            <div className='w-full relative'>
                <Interactables.Input
                    label={'Adres'}
                    value={data.address}
                    onChange={(e: string) => setData('address', e)}
                    type="text"
                    hasError={!!errors.address ? true : false}
                    required={true}
                    disabled={!!addressData}
                />
                {
                    addressData ? (
                        <div className='flex gap-2 absolute text-sm cursor-pointer text-txt-two right-2 top-1/2 -translate-y-1/2'>
                            <span className="material-symbols-outlined text-green-500" onClick={() => {
                                setData({
                                    ...data,
                                    location: addressData?.address?.city ?? addressData?.address?.village,
                                    postal_code: addressData?.address?.postcode,
                                    osm_id: addressData?.osm_id?.toString(),
                                });
                                setAddressData(null);
                            }}>
                                check
                            </span>
                            <span className="material-symbols-outlined text-red-500" onClick={() => {
                                setAddressData(null);
                            }}>
                                close
                            </span>
                        </div>
                    ) : (
                        <div className='flex gap-2 absolute text-sm cursor-pointer text-txt-two right-2 top-1/2 -translate-y-1/2'>
                            {
                                loading ? (
                                    <Loader />
                                ) : (
                                    <span className="material-symbols-outlined text-txt-two" onClick={() => {
                                        setLoading(true);
                                        fetchAddressData();
                                    }}>
                                        search
                                    </span>
                                )
                            }
                        </div>
                    )
                }
            </div>

            <Interactables.Input
                label={'Plaats'}
                value={data.location}
                onChange={(e: string) => setData('location', e)}
                type="text"
                hasError={!!errors.location ? true : false}
                required={true}
                placeholder={addressData?.address?.city ?? addressData?.address?.village}
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
            <Interactables.Button
                submit
                label={`${mode == 'create' ? 'Aanmaken' : 'Aanpassen'}`}
            />
            {
                mode == 'edit' && (
                    <Interactables.Button
                        submit={false}
                        label={'Verwijderen'}
                        background={'red'}
                        onClick={(e: React.MouseEvent<HTMLInputElement>) => deleteItem(e)}
                    />
                )
            }
        </form>
    );
}
