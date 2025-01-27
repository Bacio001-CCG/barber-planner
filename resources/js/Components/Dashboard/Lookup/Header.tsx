import { Interactables } from '@/.';
export default function Header({
    selectedTab,
    setSelectedTab,
}: {
    selectedTab: string;
    setSelectedTab: Function;
}) {
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex w-full items-center">
                    <Interactables.Button
                        className={`w-full rounded-l rounded-r-none px-1.5 ${selectedTab === 'afspraak' ? 'bg-accent text-white' : 'bg-bg-extra-light text-accent'}`}
                        label="Afspraak"
                        onClick={() => setSelectedTab('afspraak')}
                    />
                    <Interactables.Button
                        className={`w-full rounded-l-none rounded-r px-1.5 ${selectedTab === 'bank' ? 'bg-accent text-white' : 'bg-bg-extra-light text-accent'}`}
                        label="Bank"
                        onClick={() => setSelectedTab('bank')}
                    />
                </div>
            </div>
        </>
    );
}
