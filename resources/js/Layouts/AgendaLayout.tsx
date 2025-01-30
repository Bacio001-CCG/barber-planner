import { PropsWithChildren } from 'react';
export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-bg-normal">
            <main>{children}</main>
        </div>
    );
}
