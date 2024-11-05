import InputError from '@/Components/Laravel/InputError';
import PrimaryButton from '@/Components/Laravel/PrimaryButton';
import TextInput from '@/Components/Laravel/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import * as GlobalImports from '@/.';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-txt-two">
                Wachtwoord vergeten? Geen probleem. Vul uw e-mailadres in en we sturen u een link om uw wachtwoord opnieuw in te stellen.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>

                <GlobalImports.Interactables.Input 
                        name='email' 
                        label='Email'
                        type='email' 
                        value={data.email} 
                        autoComplete="username" 
                        isFocused={true} 
                        hasError={errors.email ? true : false} 
                        onChange={(e: string) => setData('email', e)} 
                        />

                <GlobalImports.Interactables.Button loading={processing} className='w-full mt-4' label='Email Password Reset Link' submit={true} />

            </form>
        </GuestLayout>
    );
}
