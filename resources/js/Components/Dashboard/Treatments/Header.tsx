import { Interactables, React, TreatmentModal } from '@/.';
export default function Header({
    setSearch
}: {
    setSearch: Function
}) {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex w-full items-center gap-3">
                    <Interactables.Input
                        icon={'search'}
                        placeholder="Behandeling Zoeken..."
                        onChange={(value: string) => setSearch(value)}
                    />
                    <Interactables.Button
                        className="px-1.5"
                        icon="add_circle"
                        onClick={() => setShowModal(true)}
                    />
                </div>
            </div>
            <TreatmentModal
                mode="create"
                setShowModal={setShowModal}
                showModal={showModal}
            />
        </>
    );
}
