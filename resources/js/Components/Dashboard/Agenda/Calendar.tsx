'use client';
import {
    AppointmentModal,
    CalendarContext,
    CalendarLib,
    MiscLib,
    MiscEnums,
    React,
    YearMonthModal,
    InertiaReact
} from '@/.';

export default function Calendar() {
    const { selectedDate, setSelectedDate, view, setView } = CalendarContext.useCalendars();
    const [datesOfWeek, setDatesOfWeek] = React.useState<Date[][]>();
    const [weekNumbers, setWeekNumbers] = React.useState<number[]>();
    const [year, setYear] = React.useState<number>(new Date().getFullYear());
    const [month, setMonth] = React.useState<number>(new Date().getMonth());
    const [week, setWeek] = React.useState<number>();

    React.useEffect(() => {
        if (view === MiscEnums.ViewEnum.Week) {
            setMonth(selectedDate.getMonth());
            setYear(selectedDate.getFullYear());
            setDates();
        }
    }, [view]);

    React.useEffect(() => {
        if (!selectedDate) return;
        setWeek(CalendarLib.getISOWeekNumber(selectedDate));
    }, [selectedDate, datesOfWeek, weekNumbers]);

    React.useEffect(() => {
        setDates();
    }, [year, month]);

    function setDates() {
        const { weeks, weekNumbers } = CalendarLib.generateFullCalendar(
            year,
            month,
        );
        setDatesOfWeek(weeks);
        setWeekNumbers(weekNumbers);
    }

    return (
        <div className="w-auto max-w-[26rem]">
            <Switcher
                year={year}
                month={month}
                setYear={setYear}
                setMonth={setMonth}
                view={view}
                setView={setView}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                week={week}
            />
            {view != MiscEnums.ViewEnum.Day && (
                <>
                    <DaysDisplay />
                    <div className="relative isolate grid min-w-[330px] grid-cols-7 gap-[1px] overflow-hidden rounded-lg border border-ring/5 bg-bg-extra-light text-[0.875rem] shadow">
                        {datesOfWeek?.map((w, index) => {
                            return w.map((day, index2) => {
                                return (
                                    <DaySquare
                                        setSelectedDate={setSelectedDate}
                                        view={view}
                                        key={Math.random() * 1000000}
                                        day={day}
                                        index={index}
                                        index2={index2}
                                        weekNumbers={weekNumbers}
                                        month={month}
                                        week={week}
                                        selectedDate={selectedDate}
                                    />
                                );
                            });
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

function DaySquare({
    day,
    index,
    weekNumbers,
    index2,
    month,
    view,
    week,
    setSelectedDate,
    selectedDate,
}: {
    day: Date;
    index: number;
    weekNumbers: number[] | undefined;
    index2: number;
    month: number;
    view: MiscEnums.ViewEnum;
    week: number | undefined;
    setSelectedDate: (date: Date) => void;
    selectedDate: Date;
}) {
    const [blur, setBlur] = React.useState(day.getMonth() !== month);
    const [highlight] = React.useState(
        new Date().toDateString() === day.toDateString(),
    );
    const [active] = React.useState(
        selectedDate.toDateString() === day.toDateString(),
    );
    React.useEffect(() => {
        setBlur(day.getMonth() !== month);
    }, [day, month]);

    if (view === MiscEnums.ViewEnum.Week && weekNumbers?.[index] !== week)
        return null;

    return (
        <button
            className={`py-[0.375rem] ring-1 ring-ring/5 hover:bg-hover/5 ${blur && 'bg-bg-light'} relative transition-all duration-300`}
            onClick={() => {
                setSelectedDate(day)
            }}
        >
            <time
                className={`mx-auto flex h-[1.75rem] w-[1.75rem] min-w-[1.75rem] items-center justify-center ${active && 'rounded-full border border-accent'} ${highlight && 'rounded-full bg-accent'}`}
            >
                <span className={`${blur && 'opacity-40'} text-txt-one`}>
                    {day.getDate()}
                </span>
                {index2 === 6 && (
                    <span
                        className={`absolute bottom-0 right-0.5 text-[0.625rem] text-txt-one/40`}
                    >
                        {weekNumbers?.[index]}
                    </span>
                )}
            </time>
        </button>
    );
}

function Switcher({
    year,
    month,
    setYear,
    setMonth,
    view,
    setView,
    selectedDate,
    setSelectedDate,
    week,
}: {
    year: number;
    month: number;
    setYear: (year: number) => void;
    setMonth: (month: number) => void;
    view: MiscEnums.ViewEnum;
    setView: (view: MiscEnums.ViewEnum) => void;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    week: number | undefined;
}) {
    const [showModal, setShowModal] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);

    function add() {
        const date = new Date(year, month);

        switch (view) {
            case MiscEnums.ViewEnum.Month:
                date.setMonth(date.getMonth() + 1);
                setYear(date.getFullYear());
                setMonth(date.getMonth());
                break;
            case MiscEnums.ViewEnum.Week:
                const newWeekDate = new Date(selectedDate);
                newWeekDate.setDate(newWeekDate.getDate() + 7);
                setSelectedDate(newWeekDate);
                setYear(newWeekDate.getFullYear());
                setMonth(newWeekDate.getMonth());
                break;
            case MiscEnums.ViewEnum.Day:
                const newDayDate = new Date(selectedDate);
                newDayDate.setDate(newDayDate.getDate() + 1);
                setSelectedDate(newDayDate);
                break;
        }
    }

    function subtract() {
        switch (view) {
            case MiscEnums.ViewEnum.Month:
                const date = new Date(year, month);
                date.setMonth(date.getMonth() - 1);
                setYear(date.getFullYear());
                setMonth(date.getMonth());
                break;
            case MiscEnums.ViewEnum.Week:
                const newWeekDate = new Date(selectedDate);
                newWeekDate.setDate(newWeekDate.getDate() - 7);
                setSelectedDate(newWeekDate);
                setYear(newWeekDate.getFullYear());
                setMonth(newWeekDate.getMonth());
                break;
            case MiscEnums.ViewEnum.Day:
                const newDayDate = new Date(selectedDate);
                newDayDate.setDate(newDayDate.getDate() - 1);
                setSelectedDate(newDayDate);
                break;
        }
    }

    function changeView() {
        setView(
            view === MiscEnums.ViewEnum.Month
                ? MiscEnums.ViewEnum.Week
                : view === MiscEnums.ViewEnum.Week
                  ? MiscEnums.ViewEnum.Day
                  : MiscEnums.ViewEnum.Month,
        );
    }

    return (
        <div className="relative mb-4 flex w-full select-none items-center justify-center gap-4">
            <span
                className="material-symbols-outlined cursor-pointer text-txt-one"
                onClick={subtract}
            >
                chevron_left
            </span>
            <div
                className={`text-center font-semibold uppercase tracking-widest text-txt-one ${
                    view === MiscEnums.ViewEnum.Week
                        ? 'w-[180px]'
                        : view === MiscEnums.ViewEnum.Day
                          ? 'w-[180px]'
                          : 'w-[120px]'
                } cursor-pointer`}
                onClick={() => setShowModal(true)}
            >
                {view === MiscEnums.ViewEnum.Day
                    ? `${MiscLib.dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} ${MiscLib.monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
                    : view === MiscEnums.ViewEnum.Week
                      ? `${MiscLib.monthNames[month]} ${year}, W${week}`
                      : `${MiscLib.monthNames[month]} ${year}`}
            </div>

            <span
                className="material-symbols-outlined cursor-pointer text-txt-one"
                onClick={add}
            >
                chevron_right
            </span>

            <span
                className="material-symbols-outlined absolute left-0 cursor-pointer text-txt-one/40"
                onClick={() => setShowModal2(true)}
            >
                add_circle
            </span>

            <span
                className="material-symbols-outlined absolute right-0 cursor-pointer text-txt-one/40"
                onClick={changeView}
            >
                {`${view == MiscEnums.ViewEnum.Week ? 'date_range' : view == MiscEnums.ViewEnum.Day ? 'today' : 'calendar_month'}`}
            </span>

            <AppointmentModal
                mode="create"
                setShowModal={setShowModal2}
                showModal={showModal2}
            />

            <YearMonthModal
                setYear={setYear}
                setMonth={setMonth}
                month={month}
                year={year}
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </div>
    );
}

function DaysDisplay() {
    return (
        <div className="relative isolate mb-1 grid min-w-[330px] grid-cols-7 gap-[1px] text-[0.875rem]">
            {MiscLib.dayNames.map((day, index) => {
                return (
                    <span
                        key={index}
                        className="text-center text-sm text-txt-one/40"
                    >
                        {day}
                    </span>
                );
            })}
        </div>
    );
}
