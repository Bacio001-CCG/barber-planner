import { React, CalendarContext, DashboardLayout, Calendar, AppointmentList } from '@/.';

export default function Agenda() {

    return (
        <DashboardLayout>
            <CalendarContext.CalendarProvider>
                <div className="flex h-full w-full flex-col items-center overflow-hidden">
                    <div className="relative flex h-full w-full max-w-[26rem] flex-col overflow-hidden">
                        <Calendar />
                        <div className="h-full w-full flex-1 overflow-hidden">
                            <AppointmentList />
                        </div>
                    </div>
                </div>
            </CalendarContext.CalendarProvider>
        </DashboardLayout>
    );
}
