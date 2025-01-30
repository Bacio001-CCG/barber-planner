import { MiscLib, MiscTypes, React, TreatmentModal } from '@/index';

export default function TreatmentList({
    treatments,
}: {
    treatments: MiscTypes.Treatment[];
}) {
    const [selectedTreatment, setSelectedTreatment] =
        React.useState<MiscTypes.Treatment | null>(null);
    const [showModal, setShowModal] = React.useState(false);

    if (treatments.length == 0)
        return (
            <div className="no-scroll mt-3 flex h-full flex-col items-center justify-center overflow-y-auto uppercase tracking-widest">
                <div className="relative w-fit flex-col gap-2 text-center text-txt-one">
                    <h1 className="relative">Nog geen behandelingen...</h1>
                </div>
            </div>
        );

    return (
        <>
            <div className="no-scroll mt-3 flex flex-1 flex-col divide-y-[1px] divide-border overflow-y-auto">
                {treatments.map((treatment: MiscTypes.Treatment, index) => {
                    return (
                        <div
                            className="relative w-full cursor-pointer rounded py-2 pl-2 text-txt-one hover:bg-bg-hover"
                            key={index}
                            onClick={() => {
                                setSelectedTreatment(treatment);
                                setShowModal(true);
                            }}
                        >
                            <h1>{treatment.name}</h1>
                            <h2 className="text-sm text-txt-two">
                                {MiscLib.priceFormat(treatment.price)}
                            </h2>
                            <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-accent">
                                chevron_right
                            </span>
                        </div>
                    );
                })}
            </div>
            <TreatmentModal
                mode="edit"
                setShowModal={setShowModal}
                showModal={showModal}
                treatment={selectedTreatment}
            />
        </>
    );
}
