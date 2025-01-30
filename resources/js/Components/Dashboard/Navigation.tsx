import { MobileNavigation, PcNavigation } from '@/index.js';

const Navigation = ({ open }: { open: boolean }) => {
    return (
        <>
            <MobileNavigation open={open} />
            <PcNavigation />
        </>
    );
};

export default Navigation;
