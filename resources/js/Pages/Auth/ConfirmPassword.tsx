import InputError from '@/Components/Laravel/InputError';
import InputLabel from '@/Components/Laravel/InputLabel';
import PrimaryButton from '@/Components/Laravel/PrimaryButton';
import TextInput from '@/Components/Laravel/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import * as GlobalImports from '@/.';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-txt-two">
                Dit is een beveiligde zone van de applicatie. Voer alstublieft uw wachtwoord in om door te gaan.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <GlobalImports.Interactables.Input 
                        name='password' 
                        label='Wachtwoord'
                        type='password' 
                        value={data.password} 
                        isFocused={true} 
                        hasError={errors.password ? true : false} 
                        onChange={(e: string) => setData('password', e)} 
                        />
                </div>

                <GlobalImports.Interactables.Button loading={processing} className='w-full mt-4' label='Confirm' submit={true} />

            </form>
        </GuestLayout>
    );
}
