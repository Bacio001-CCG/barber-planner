import { Modal, React, ReactDom } from '@/index.js';

export default function YearMonthModal({
    setYear,
    setMonth,
    month,
    year,
    showModal,
    setShowModal,
}: {
    setYear: Function;
    setMonth: Function;
    month: number;
    year: number;
    showModal: boolean;
    setShowModal: Function;
}) {
    const [newMonth, setNewMonth] = React.useState(month);
    const [newYear, setNewYear] = React.useState(year);

    function close() {
        if (newYear) setYear(newYear);
        if (newMonth) setMonth(newMonth);
        setShowModal(false);
    }

    return (
        <>
            {showModal &&
                ReactDom.createPortal(
                    <Modal
                        isOpen={showModal}
                        onClose={() => close()}
                        children={
                            <Body
                                setNewMonth={setNewMonth}
                                setNewYear={setNewYear}
                                month={month}
                                year={year}
                            />
                        }
                    />,
                    document.body,
                )}
        </>
    );
}

function Body({
    setNewMonth,
    setNewYear,
    month,
    year,
}: {
    setNewMonth: Function;
    setNewYear: Function;
    month: number;
    year: number;
}) {
    const monthNames = [
        'Januari',
        'Februari',
        'Maart',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Augustus',
        'September',
        'Oktober',
        'November',
        'December',
    ];

    const currentYear = year;
    const currentMonth = month;

    const years = Array.from({ length: 3000 }, (_, index) => 2000 + index);

    // Refs for scrolling
    const monthRefs = React.useRef<React.RefObject<HTMLDivElement>[]>(
        monthNames.map(() => React.createRef<HTMLDivElement>()),
    );
    const yearRefs = React.useRef<React.RefObject<HTMLDivElement>[]>(
        years.map(() => React.createRef<HTMLDivElement>()),
    );
    const isDragging = React.useRef(false); // Track if dragging is happening

    const scrollToMonth = (index: number) => {
        (monthRefs.current[index].current as HTMLElement).scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    const scrollToYear = (index: number) => {
        (yearRefs.current[index].current as HTMLElement).scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    // Scroll to current month and year when modal opens
    React.useEffect(() => {
        // Scroll to the current month
        (monthRefs.current[currentMonth].current as HTMLElement).scrollIntoView(
            {
                behavior: 'smooth',
                block: 'center',
            },
        );

        // Scroll to the current year
        (
            yearRefs.current[currentYear - 2000].current as HTMLElement
        ).scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }, [currentMonth, currentYear]);

    // Function to handle drag-to-scroll
    const handleDragScroll = (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    ) => {
        const container = e.currentTarget;
        const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        let scrollTop = container.scrollTop;

        isDragging.current = true;

        const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
            const y =
                'touches' in moveEvent
                    ? moveEvent.touches[0].clientY
                    : moveEvent.clientY;
            const distance = startY - y;
            container.scrollTop = scrollTop + distance;
        };

        const handleEnd = () => {
            isDragging.current = false;
            container.removeEventListener('mousemove', handleMove);
            container.removeEventListener('mouseup', handleEnd);
            container.removeEventListener('touchmove', handleMove);
            container.removeEventListener('touchend', handleEnd);
        };

        container.addEventListener('mousemove', handleMove);
        container.addEventListener('mouseup', handleEnd);
        container.addEventListener('touchmove', handleMove);
        container.addEventListener('touchend', handleEnd);
    };

    // Function to handle click events
    const handleClick = (
        event: React.MouseEvent<HTMLDivElement>,
        index: number,
        type: 'month' | 'year',
    ) => {
        if (isDragging.current) return;

        if (type === 'month') {
            scrollToMonth(index);
            setNewMonth(index);
        } else if (type === 'year') {
            scrollToYear(index);
            years[index] && setNewYear(years[index]);
        }
    };

    return (
        <div className="no-scroll relative flex h-full items-center justify-center">
            {/* Gradient Overlays */}
            <div className="pointer-events-none absolute top-0 z-10 h-[20px] w-full bg-gradient-to-b from-bg-normal to-transparent" />
            <div className="pointer-events-none absolute bottom-0 z-10 h-[20px] w-full bg-gradient-to-t from-bg-normal to-transparent" />

            {/* Month Selector */}
            <div
                className="user-select-none no-scroll relative z-0 flex h-[120px] flex-col gap-0 overflow-y-auto px-3 py-12"
                onMouseDown={handleDragScroll}
                onTouchStart={handleDragScroll}
            >
                {monthNames.map((month, index) => (
                    <div
                        key={index}
                        ref={monthRefs.current[index]}
                        className="flex h-[40px] cursor-pointer items-center justify-center text-center text-xl uppercase tracking-widest text-txt-one"
                        onClick={(e) => handleClick(e, index, 'month')}
                    >
                        {month}
                    </div>
                ))}
            </div>

            {/* Year Selector */}
            <div
                className="user-select-none no-scroll relative z-0 flex h-[120px] flex-col gap-0 overflow-y-auto px-4"
                onMouseDown={handleDragScroll}
                onTouchStart={handleDragScroll}
            >
                {years.map((year, index) => (
                    <div
                        key={index}
                        ref={yearRefs.current[index]}
                        className="flex h-[40px] cursor-pointer items-center justify-center text-center text-xl uppercase tracking-widest text-txt-one"
                        onClick={(e) => handleClick(e, index, 'year')}
                    >
                        {year}
                    </div>
                ))}
            </div>
        </div>
    );
}
