import { React, CalendarContext, DashboardLayout, Calendar, AppointmentList } from '@/.';

export default function Agenda() {

    //TODO: Make it so calander format and amount of fetched days can be changed in settings trough database, cookies don't work.

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
