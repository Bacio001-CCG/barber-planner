import ApplicationLogo from '@/Components/Laravel/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { Logo } from '@/index.js';
import { Toast } from '@/index.js';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-bg-normal p-5 sm:justify-center sm:pt-0 ">
            <Link href="/">
                <Logo className='h-20 w-20 text-txt-one' />
            </Link>

            <div className="mt-6 w-full overflow-hidden rounded p-5 relative shadow-md sm:max-w-[30rem] sm:rounded-lg bg-bg-extra-light">
                {children}
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
