import { PublicNavigation, React, Toast } from '@/.';
export default function Dashboard({ children }: React.PropsWithChildren) {
    return (
        <div id="theme" className="bg-bg-normal" data-theme="dark">
            <PublicNavigation />
            {children}
            <Toast.ToastContainer
                toastStyle={{
                    backgroundColor: 'var(--bg-light)',
                    color: 'var(--txt-one)',
                }}
            />
        </div>
    );
}
