import { React, PublicNavigation, Toast } from '@/.'
export default function Dashboard({ children }: React.PropsWithChildren) {
    return (
        <>
            <PublicNavigation />
            {children}
            <Toast.ToastContainer
                toastStyle={{
                    backgroundColor: 'var(--bg-light)',
                    color: 'var(--txt-one)',
                }}
            />
        </>
    );
}
