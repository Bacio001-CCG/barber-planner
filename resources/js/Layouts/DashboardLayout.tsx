import { React, Navigation, Toast } from '@/.'
export default function Dashboard({ children }: React.PropsWithChildren) {
    return (
        <div className="h-screen bg-bg-normal overflow-y-hidden flex flex-col">
            <Navigation />
            <div className='flex-1 w-full p-4 overflow-hidden'>
                <div className='overflow-hidden h-full w-full flex flex-col'>
                    {children}
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
