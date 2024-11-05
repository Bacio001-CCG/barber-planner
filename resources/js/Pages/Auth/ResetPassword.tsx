import InputError from '@/Components/Laravel/InputError';
import InputLabel from '@/Components/Laravel/InputLabel';
import PrimaryButton from '@/Components/Laravel/PrimaryButton';
import TextInput from '@/Components/Laravel/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import * as GlobalImports from '@/.';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div>
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
                </div>

                <div className="mt-4">

                    <GlobalImports.Interactables.Input 
                        name='password' 
                        label='Wachtwoord'
                        type='password' 
                        value={data.password} 
                        autoComplete="new-password" 
                        hasError={errors.password ? true : false} 
                        onChange={(e: string) => setData('password', e)} 
                        />

                </div>

                <div className="mt-4">

                    <GlobalImports.Interactables.Input 
                        name='password_confirmation' 
                        label='Wachtwoord bevestigen'
                        type='password' 
                        value={data.password_confirmation} 
                        autoComplete="new-password" 
                        hasError={errors.password_confirmation ? true : false} 
                        onChange={(e: string) => setData('password_confirmation', e)} 
                        />

                </div>

                <GlobalImports.Interactables.Button loading={processing} className='w-full mt-4' label='Wachtwoord Herstellen' submit={true} />

            </form>
        </GuestLayout>
    );
}
