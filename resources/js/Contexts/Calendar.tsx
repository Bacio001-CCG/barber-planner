import { MiscEnums, MiscLib } from '@/.';
import { router } from '@inertiajs/react';
import React from 'react';

interface CalendarContextType {
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
    view: any;
    setView: (view: MiscEnums.ViewEnum) => void;
    changeView: () => void;
}

const CalendarContext = React.createContext<CalendarContextType>({
    selectedDate: new Date(),
    setSelectedDate: () => {},
    view: 'day',
    setView: () => {},
    changeView: () => {},
});

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const pathName = window.location.pathname.split('/');
    const initialDate = new Date(pathName.pop() as string);
    const initialView = MiscLib.getCookie('view') as MiscEnums.ViewEnum | null;
    const [view, setView] = React.useState<MiscEnums.ViewEnum>(
        initialView ?? MiscEnums.ViewEnum.Month,
    );
    const [selectedDate, setSelectedDate] = React.useState<Date>(
        isNaN(initialDate.getTime()) ? new Date() : initialDate,
    );

    React.useEffect(() => {
        const pathDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

        if (window.location.pathname !== `/dashboard/agenda/${pathDate}`) {
            return router.visit(`/dashboard/agenda/${pathDate}`, {
                preserveState: true,
            });
        }
    }, [selectedDate]);

    React.useEffect(() => {
        if (view) {
            document.cookie = `view=${view}`;
        }
    }, [view]);

    function changeView() {
        const view2 =
            view === MiscEnums.ViewEnum.Month
                ? MiscEnums.ViewEnum.Week
                : view === MiscEnums.ViewEnum.Week
                  ? MiscEnums.ViewEnum.Day
                  : MiscEnums.ViewEnum.Month;
        setView(view2);
        document.cookie = `view=${view2}`;
        router.reload();
    }

    return (
        <CalendarContext.Provider
            value={{
                selectedDate,
                setSelectedDate,
                view,
                setView,
                changeView,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendars = () => React.useContext(CalendarContext);
