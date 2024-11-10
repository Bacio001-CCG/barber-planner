import { Logo, PublicLayout, React } from '@/.';
import AfspraakAanmaken from '@/Images/Phone/Afsrpaak_Aanmaken.png';
import AfspraakFinish from '@/Images/Phone/Afsrpaak_Finish.png';
import Behandelingen from '@/Images/Phone/Behandelingen.png';
import Dag from '@/Images/Phone/Dag.png';
import Klanten from '@/Images/Phone/Klanten.png';
import Maand from '@/Images/Phone/Maand.png';
import Week from '@/Images/Phone/Week.png';
export default function Landing() {
    const [imageStep, setImageStep] = React.useState(1);

    React.useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    function nextImage() {
        setImageStep((prev) => (prev === 7 ? 1 : prev + 1));
    }

    return (
        <PublicLayout>
            <div className="flex h-full w-screen flex-col">
                <div className="relative z-20 mx-auto h-screen w-full">
                    <div className="z-10 mx-auto flex max-w-3xl flex-col gap-6 px-4 py-32 tracking-widest sm:px-6 lg:px-8 lg:py-52">
                        <h1 className="text-center text-4xl font-bold text-txt-one sm:text-6xl">
                            Uw perfecte planning, voor een perfecte knipbeurt.
                        </h1>
                        <p className="text-center text-lg leading-8 text-txt-two">
                            Beheer je afspraken in enkele minuten met de Barber
                            Planner. Ons platform maakt het plannen van
                            afspraken eenvoudig en efficiënt. Geen gedoe, gewoon
                            werken!
                        </p>
                        <div className="flex items-center justify-center gap-6">
                            <button className="rounded-lg border border-bg-extra-light bg-bg-light px-5 py-2 text-lg text-txt-one transition-all duration-300 hover:bg-bg-extra-light">
                                Probeer ons nu!
                            </button>
                            <button className="rounded-lg border border-bg-extra-light bg-bg-light px-5 py-2 text-lg text-txt-one transition-all duration-300 hover:bg-bg-extra-light">
                                Probeer ons nu!
                            </button>
                        </div>
                    </div>
                    <div className="absolute left-1/2 w-[1200px] -translate-x-1/2">
                        <div className="mx-auto max-w-2xl lg:max-w-none">
                            <div className="space-y-2 text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-txt-one sm:text-4xl">
                                    Vertrouwd door kappers over de hele wereld
                                </h2>
                                <p className="text-lg leading-8 text-txt-two">
                                    Wij kunnen u helpen uw afspraken te plannen,
                                    ongeacht de grote van uw bedrijf.
                                </p>
                            </div>

                            <hr className="mx-auto mt-2 w-[300px] border-2 border-accent" />

                            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                                <div className="flex flex-col bg-bg-light py-8">
                                    <dt className="text-sm font-semibold leading-6 text-txt-two">
                                        afspraken geregistreerd
                                    </dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-txt-one">
                                        12 million
                                    </dd>
                                </div>
                                <div className="flex flex-col bg-bg-light py-8">
                                    <dt className="text-sm font-semibold leading-6 text-txt-two">
                                        behandelingen aangemaakt
                                    </dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-txt-one">
                                        10k
                                    </dd>
                                </div>
                                <div className="flex flex-col bg-bg-light py-8">
                                    <dt className="text-sm font-semibold leading-6 text-txt-two">
                                        klanten aangemaakt
                                    </dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-txt-one">
                                        6.6k
                                    </dd>
                                </div>
                                <div className="flex flex-col bg-bg-light py-8">
                                    <dt className="text-sm font-semibold leading-6 text-txt-two">
                                        bedrijven geregistreerd
                                    </dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-txt-one">
                                        2.1k
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mb-[14rem] flex w-[1200px] flex-col gap-[14rem]">
                    <div className="flex flex-col gap-10">
                        <div className="w-fit">
                            <h2 className="text-xl font-bold tracking-tight text-txt-one sm:text-4xl">
                                Ons Aanbod
                            </h2>
                            <p className="leading-8 text-txt-two">
                                Wij bieden een breed scala aan functies om uw
                                bedrijf te helpen groeien.
                            </p>
                            <hr className="mt-2 w-1/3 border-2 border-accent" />
                        </div>
                        <div className="mx-auto flex w-fit gap-10">
                            <div className="flex w-[800px] flex-col gap-5">
                                <div className="my-auto flex gap-3 rounded-lg p-4">
                                    <div className="rounded-lg bg-accent/10 p-10">
                                        <span className="material-symbols-outlined scale-[250%] text-accent">
                                            event
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-xl font-bold tracking-widest text-txt-one">
                                            Afspraken in een oogopslag
                                        </h1>
                                        <p className="text-txt-two/70">
                                            when an unknown printer took a
                                            galley of type and scrambled it to
                                            make a type specimen book. It has
                                            survived not only five centuries,
                                            but also the leap into electronic
                                            typesetting, remaining essentially.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3 rounded-lg p-4">
                                    <div className="rounded-lg bg-accent/10 p-10">
                                        <span className="material-symbols-outlined scale-[250%] text-accent">
                                            person
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-xl font-bold tracking-widest text-txt-one">
                                            Volledig klanten overzicht
                                        </h1>
                                        <p className="text-txt-two/70">
                                            when an unknown printer took a
                                            galley of type and scrambled it to
                                            make a type specimen book. It has
                                            survived not only five centuries,
                                            but also the leap into electronic
                                            typesetting, remaining essentially.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3 rounded-lg p-4">
                                    <div className="rounded-lg bg-accent/10 p-10">
                                        <span className="material-symbols-outlined scale-[250%] text-accent">
                                            content_cut
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-xl font-bold tracking-widest text-txt-one">
                                            Alle behandeling in een overzicht
                                        </h1>
                                        <p className="text-txt-two/70">
                                            when an unknown printer took a
                                            galley of type and scrambled it to
                                            make a type specimen book. It has
                                            survived not only five centuries,
                                            but also the leap into electronic
                                            typesetting, remaining essentially.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3 rounded-lg p-4">
                                    <div className="rounded-lg bg-accent/10 p-10">
                                        <span className="material-symbols-outlined scale-[250%] text-accent">
                                            calculate
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-xl font-bold tracking-widest text-txt-one">
                                            Automatische afstands berekeningen
                                        </h1>
                                        <p className="text-txt-two/70">
                                            when an unknown printer took a
                                            galley of type and scrambled it to
                                            make a type specimen book. It has
                                            survived not only five centuries,
                                            but also the leap into electronic
                                            typesetting, remaining essentially.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-[300px] flex-col gap-3">
                                {imageStep === 1 && (
                                    <img
                                        src={Maand}
                                        alt="Afspraak Aanmaken"
                                        className="h-[600px] w-full rounded-lg border border-border/10"
                                    />
                                )}
                                {imageStep === 2 && (
                                    <img
                                        src={Week}
                                        alt="Afspraak Aanmaken"
                                        className="h-[600px] w-full rounded-lg border border-border/10"
                                    />
                                )}
                                {imageStep === 3 && (
                                    <img
                                        src={Dag}
                                        alt="Afspraak Aanmaken"
                                        className="h-[600px] w-full rounded-lg border border-border/10"
                                    />
                                )}
                                {imageStep === 4 && (
                                    <img
                                        src={Klanten}
                                        alt="Afspraak Aanmaken"
                                        className="h-[600px] w-full rounded-lg border border-border/10"
                                    />
                                )}
                                {imageStep === 5 && (
                                    <img
                                        src={Behandelingen}
                                        alt="Afspraak Aanmaken"
                                        className="h-[600px] w-full rounded-lg border border-border/10"
                                    />
                                )}
                                {imageStep === 6 && (
                                    <img
                                        src={AfspraakAanmaken}
                                        alt="Afspraak Aanmaken"
                                        className="h-[600px] w-full rounded-lg border border-border/10"
                                    />
                                )}
                                {imageStep === 7 && (
                                    <img
                                        src={AfspraakFinish}
                                        alt="Afspraak Aanmaken"
                                        className="h-[600px] w-full rounded-lg border border-border/10"
                                    />
                                )}
                                <div className="mt-2 grid grid-cols-2 gap-2 text-center text-txt-one">
                                    <button
                                        className={`h-[30px] rounded border border-border/10 bg-bg-light ${imageStep === 1 ? 'opacity-50' : 'transition-all duration-300 hover:bg-bg-extra-light'}`}
                                        onClick={() => {
                                            if (imageStep != 1)
                                                setImageStep(
                                                    (prev) => prev - 1,
                                                );
                                        }}
                                    >
                                        <span className="material-symbols-outlined scale-125">
                                            chevron_left
                                        </span>
                                    </button>
                                    <button
                                        className={`h-[30px] rounded border border-border/10 bg-bg-light ${imageStep === 7 ? 'opacity-50' : 'transition-all duration-300 hover:bg-bg-extra-light'}`}
                                        onClick={() => {
                                            if (imageStep != 7)
                                                setImageStep(
                                                    (prev) => prev + 1,
                                                );
                                        }}
                                    >
                                        <span className="material-symbols-outlined scale-125">
                                            chevron_right
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="w-fit">
                            <h2 className="text-xl font-bold tracking-tight text-txt-one sm:text-4xl">
                                Recensies
                            </h2>
                            <p className="leading-8 text-txt-two">
                                Onze recensies spreken voor zich.
                            </p>
                            <hr className="mt-2 w-1/3 border-2 border-accent" />
                        </div>
                        <div className="relative mx-auto flex h-[110px] w-[1400px]">
                            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 scale-125 text-txt-two">
                                arrow_back_ios
                            </span>
                            <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 scale-125 text-txt-two">
                                arrow_forward_ios
                            </span>
                            <div className="absolute left-1/2 top-1/2 flex w-[1200px] -translate-x-1/2 -translate-y-1/2 gap-8">
                                <div className="flex h-fit max-w-[400px] items-center gap-5 rounded-lg border border-border/10 p-3">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvIDLyE2qiXbONA33TsxXBaa9vUEn3VxXw3A&s"
                                        alt=""
                                        className="h-[80px] rounded-full"
                                    />
                                    <div>
                                        <h1 className="text-xl font-bold text-txt-one">
                                            Cas Backx
                                        </h1>
                                        <p className="text-sm text-txt-two">
                                            It was popularised in the 1960s with
                                            the release of Letraset sheets
                                        </p>
                                    </div>
                                </div>
                                <div className="flex h-fit max-w-[400px] items-center gap-5 rounded-lg border border-border/10 p-3">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvIDLyE2qiXbONA33TsxXBaa9vUEn3VxXw3A&s"
                                        alt=""
                                        className="h-[80px] rounded-full"
                                    />
                                    <div>
                                        <h1 className="text-xl font-bold text-txt-one">
                                            Cas Backx
                                        </h1>
                                        <p className="text-sm text-txt-two">
                                            It was popularised in the 1960s with
                                            the release of Letraset sheets
                                        </p>
                                    </div>
                                </div>
                                <div className="flex h-fit max-w-[400px] items-center gap-5 rounded-lg border border-border/10 p-3">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvIDLyE2qiXbONA33TsxXBaa9vUEn3VxXw3A&s"
                                        alt=""
                                        className="h-[80px] rounded-full"
                                    />
                                    <div>
                                        <h1 className="text-xl font-bold text-txt-one">
                                            Cas Backx
                                        </h1>
                                        <p className="text-sm text-txt-two">
                                            It was popularised in the 1960s with
                                            the release of Letraset sheets
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="space-y-2 text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-txt-one sm:text-4xl">
                                Bekijk wat wij u kunnen bieden
                            </h2>
                            <p className="text-lg leading-8 text-txt-two">
                                Gebruik ons platform zonder enige restricties
                                voor een betaalbare prijs.
                            </p>
                            <hr className="mx-auto w-[300px] border-2 border-accent" />
                        </div>
                        <div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-y-6 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
                            <div className="rounded-3xl rounded-t-3xl bg-bg-light p-8 ring-1 ring-txt-two/10 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-bl-3xl lg:rounded-tr-none">
                                <h3
                                    id="tier-hobby"
                                    className="text-base/7 font-semibold text-accent"
                                >
                                    Gratis
                                </h3>
                                <p className="mt-4 flex items-baseline gap-x-2">
                                    <span className="text-5xl font-semibold tracking-tight text-txt-two">
                                        €0
                                    </span>
                                    <span className="text-base text-txt-two">
                                        /month
                                    </span>
                                </p>
                                <p className="mt-6 text-base/7 text-txt-two">
                                    Perfect voor kleine bedrijven die net
                                    beginnen
                                </p>
                                <ul
                                    role="list"
                                    className="mt-8 space-y-3 text-sm/6 text-txt-two sm:mt-10"
                                >
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-accent"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        10 afspraken per week
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-accent"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        20 klant plekken
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-accent"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        10 behandeling plekken
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-accent"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        Boekhouding overzicht
                                    </li>
                                </ul>
                                <a
                                    href="#"
                                    aria-describedby="tier-hobby"
                                    className="mt-8 block rounded-md bg-accent/60 px-3.5 py-2.5 text-center text-sm font-semibold text-txt-two ring-inset sm:mt-10"
                                >
                                    Start vandaag
                                </a>
                            </div>
                            <div className="relative rounded-3xl bg-bg-extra-light p-8 shadow-2xl ring-1 ring-txt-two/10 sm:p-10">
                                <h3
                                    id="tier-enterprise"
                                    className="text-base/7 font-semibold text-accent"
                                >
                                    Bedrijf
                                </h3>
                                <p className="mt-4 flex items-baseline gap-x-2">
                                    <span className="text-5xl font-semibold tracking-tight text-txt-one">
                                        €9,99
                                    </span>
                                    <span className="text-base text-txt-two">
                                        /month
                                    </span>
                                </p>
                                <p className="mt-6 text-base/7 text-txt-two">
                                    Perfect voor bedrijven met een groot
                                    klantenbestand.
                                </p>
                                <ul
                                    role="list"
                                    className="mt-8 space-y-3 text-sm/6 text-txt-two sm:mt-10"
                                >
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-accent"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        Alles van het gratis plan
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-accent"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        Oneindige afspraken per week
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-accent"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        Oneindige klanten per week
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-accent"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        Oneindige behandelingen per week
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-accent"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        Email support
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-accent"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        Exporteer boekhouding
                                    </li>
                                </ul>
                                <a
                                    href="#"
                                    aria-describedby="tier-enterprise"
                                    className="mt-8 block rounded-md bg-accent px-3.5 py-2.5 text-center text-sm font-semibold text-txt-one shadow-sm hover:bg-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:mt-10"
                                >
                                    Get started today
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className='p-3 border bg-bg-light border-border/10 rounded-xl flex'>
                        <div className='flex-1'>
                            <h1 className='text-txt-one font-bold text-2xl'>Contacteer Ons</h1>
                            <p className='text-txt-two'>Heeft u vragen of wilt u meer informatie over ons platform?</p>
                        </div>
                        <a href="mailto:cbwebsitedevelopment@gmail.com" className='rounded-lg border border-border/10 bg-accent text-txt-one px-5 py-2 font-bold flex items-center justify-center gap-3 hover:bg-accent/80 transition-all duration-300'>
                        <span className="material-symbols-outlined text-txt-one">
                            send
                        </span>
                            Contacteer ons
                        </a>
                    </div>
                </div>

                <footer className="relative mx-auto w-[90%]">
                    <div className="flex items-center border-t border-border/10 py-6">
                        <Logo className="h-10 w-10 text-txt-one" />
                        <p className="mb-4 ml-5 block text-center text-sm text-txt-two md:mb-0">
                            Copyright © 2024 Barber Planner. All Rights
                            Reserved.
                        </p>
                    </div>
                    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-10 text-txt-two">
                        <span>Ons Aanbod</span>
                        <span>Recensies</span>
                        <span>Prijzen</span>
                    </div>
                </footer>

                <div className="absolute left-0 top-0 z-0 h-screen w-screen bg-transparent bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(204,102,0,0.3),rgba(255,80,0,0.05),rgba(255,255,255,0))]"></div>
            </div>
        </PublicLayout>
    );
}
