import PrimaryButton from '@/Components/Laravel/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import * as GlobalImports from '@/.';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-txt-two">
                Bedankt voor het registreren! Voordat u begint, kunt u alstublieft uw e-mail verifiëren door op de link die we u hebben gemaild te klikken? Als u de e-mail niet heeft ontvangen, sturen we u graag een andere.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    Een nieuwe verificatielink is naar uw e-mailadres gestuurd.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">

                    <GlobalImports.Interactables.Button loading={processing} className='w-full mt-4' label='Resend Verification Email' submit={true} />

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className='mt-4 rounded-md text-sm text-txt-two underline text-center w-full'
                    >
                        Uitloggen
                    </Link>
                    
                </div>
                
            </form>
        </GuestLayout>
    );
}
