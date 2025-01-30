import { Logo } from '@/.';
export default function Navigation() {
    return (
        <nav className="relative z-20 h-[4rem] w-full">
            <div className="relative mx-auto flex h-full items-center px-5 lg:w-[1400px]">
                <Logo className="h-12 w-12 text-txt-one" />
                <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 justify-center gap-8 font-semibold tracking-widest text-txt-two lg:flex">
                    <span>Ons Aanbod</span>
                    <span>Recensies</span>
                    <span>Prijzen</span>
                </div>
                <a
                    href="/dashboard/agenda"
                    className="absolute right-0 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-lg border border-border bg-bg-light px-8 py-1.5 text-txt-one transition-all duration-300 hover:bg-bg-extra-light lg:block"
                >
                    Dashboard
                </a>
            </div>
        </nav>
    );
}
