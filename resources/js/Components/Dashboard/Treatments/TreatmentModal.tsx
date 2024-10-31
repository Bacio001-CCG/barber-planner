import { InertiaReact, Interactables, Modal, React, ReactDom, Toast, MiscTypes } from '@/index';

export default function TreatmentModal({
    showModal,
    setShowModal,
    mode,
    treatment,
}: {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    mode: 'create' | 'edit';
    treatment?: MiscTypes.Treatment | null;
}) {
    function close() {
        setShowModal(false);
    }

    return (
        <>
            {ReactDom.createPortal(
                <Modal
                    title={mode === 'create' ? 'Behandeling Aanmaken' : 'Behandeling Aanpassen'}
                    onClose={close}
                    children={<Body mode={mode} close={close} treatment={treatment} />}
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
    treatment,
}: {
    mode: 'create' | 'edit';
    close: () => void;
    treatment?: MiscTypes.Treatment | null;
}) {
    const { data, setData, post, processing, errors, reset, patch } = InertiaReact.useForm<{
        id: number | null;
        name: string;
        price: number;
    }>({
        id: null,
        name: '',
        price: 0,
    });

    React.useEffect(() => {
        if (mode === 'edit' && treatment) {
            setData({
                id: treatment.id,
                name: treatment.name,
                price: parseFloat(treatment.price),
            });
        }
    }, [mode, treatment]);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if(mode == 'create') post(route('dashboard.treatments.store'), {
            onSuccess: () => {
                Toast.toast('Behandeling Aangemaakt', {
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
        }); else if(data.id) patch(route('dashboard.treatments.update', data.id), {
                onSuccess: () => {
                    Toast.toast('Behandeling Aangepast', {
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
            if (confirm('Weet je zeker dat je deze behandeling wilt verwijderen?')) {
                InertiaReact.router.delete(route('dashboard.treatments.destroy', data.id), {
                    onSuccess: () => {
                        Toast.toast('Behandeling Verwijderd', {
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
                label={'Naam'}
                value={data.name}
                onChange={(e: string) => setData('name', e)}
                type="text"
                hasError={!!errors.name}
                required
            />
            <Interactables.Input
                label={`Prijs (€)`}
                value={data.price}
                onChange={(e: number) => setData('price', e)}
                type="number"
                hasError={!!errors.price}
                placeholder="1,20"
                required
            />
            <Interactables.Button
                submit
                label={`Behandeling ${mode === 'create' ? 'Aanmaken' : 'Aanpassen'}`}
            />
            {
                mode == 'edit' && (
                    <Interactables.Button
                        submit={false}
                        label={'Behandeling Verwijderen'}
                        background={'red'}
                        onClick={(e: React.MouseEvent<HTMLInputElement>) => deleteItem(e)}
                    />
                )
            }
        </form>
    );
}
