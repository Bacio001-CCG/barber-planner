import Checkbox from '@/Components/Laravel/Checkbox';
import InputError from '@/Components/Laravel/InputError';
import InputLabel from '@/Components/Laravel/InputLabel';
import PrimaryButton from '@/Components/Laravel/PrimaryButton';
import TextInput from '@/Components/Laravel/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import * as GlobalImports from '@/.';

export default function Login({
    status,
    canResetPassword,
}: {
    status: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

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
                        label='Wacthwoord'
                        type='password' 
                        value={data.password} 
                        autoComplete="current-password" 
                        hasError={errors.password ? true : false} 
                        onChange={(e: string) => setData('password', e)} 
                        />
                </div>

                <div className="mt-4 block">
                    <GlobalImports.Interactables.Toggle 
                        label='Herinner mij'
                        value={data.remember} 
                        onChange={(e: boolean) => setData('remember', e)} 
                        />
                </div>

                <GlobalImports.Interactables.Button loading={processing} className='w-full mt-4' label='Log in' submit={true} />

                <div className='flex gap-5 justify-center'>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                        >
                            <div className='mt-4 rounded-md text-sm text-txt-two underline text-center w-full'>
                                Wachtwoord vergeten?
                            </div>
                        </Link>
                    )}
                        <span className='mt-4 text-txt-two'>of</span>
                        <Link
                            href={route('register')}
                        >
                            <div className='mt-4 rounded-md text-sm text-txt-two underline text-center w-full'>
                                Nog geen account? Registreer nu!
                            </div>
                        </Link>
                        
                </div>

            </form>
        </GuestLayout>
    );
}
