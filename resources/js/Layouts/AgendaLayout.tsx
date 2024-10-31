import React from 'react';
import Navigation from '../Components/dashboard/Navigation';
import { PropsWithChildren } from 'react';
export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-bg-normal">
            <Navigation />
            <main>{children}</main>
        </div>
    );
}
