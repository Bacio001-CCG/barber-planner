import { CustomerModal, Interactables, React } from '@/.';
export default function Header({ setSearch }: { setSearch: Function }) {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex w-full items-center gap-3">
                    <Interactables.Input
                        icon={'search'}
                        placeholder="Klant Zoeken..."
                        onChange={(value: string) => setSearch(value)}
                    />
                    <Interactables.Button
                        onClick={() => setShowModal(true)}
                        className="px-1.5"
                        icon="add_circle"
                    />
                </div>
            </div>
            <CustomerModal
                setSelectedCustomer={() => {}}
                mode="create"
                setShowModal={setShowModal}
                showModal={showModal}
            />
        </>
    );
}
