import { Navigation, React, ThemeContext, Toast, TopNavigation } from '@/.';
export default function Dashboard({ children }: React.PropsWithChildren) {
    return (
        <>
            <ThemeContext.ThemeProvider>
                <Body children={children} />
            </ThemeContext.ThemeProvider>
        </>
    );
}

function Body({ children }: React.PropsWithChildren) {
    const [open, setOpen] = React.useState(false);
    const { theme } = ThemeContext.useThemes();
    return (
        <div
            id="theme"
            data-theme={theme}
            className="flex h-screen flex-col overflow-y-hidden bg-bg-normal"
        >
            <TopNavigation open={open} setOpen={setOpen} />
            <div className="flex h-full">
                <Navigation open={open} />
                <div className="mx-auto flex h-[calc(100vh-65px)] w-full max-w-[1400px] flex-1 flex-col gap-10 overflow-hidden overflow-y-auto p-4 md:py-8">
                    <div className="flex h-full w-full flex-col overflow-hidden">
                        {children}
                    </div>
                </div>
            </div>
            <Toast.ToastContainer
                toastStyle={{
                    backgroundColor: 'var(--bg-light)',
                    color: 'var(--txt-one)',
                }}
            />
        </div>
    );
}
