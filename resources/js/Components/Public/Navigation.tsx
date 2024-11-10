import { Logo } from "@/."
export default function Navigation() 
{
    return (
        <nav className="h-[4rem] w-full relative z-20">
            <div className="w-[1400px] mx-auto h-full flex items-center relative">
                <Logo className='h-12 w-12 text-txt-one' />
                <div className="flex text-txt-two gap-8 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 tracking-widest font-semibold  justify-center">
                    <span>Ons Aanbod</span>
                    <span>Recensies</span>
                    <span>Prijzen</span>
                </div>
                <a href='/dashboard/agenda' className="px-8 py-1.5 bg-bg-light border border-border/10 text-txt-one rounded-lg hover:bg-bg-extra-light transition-all duration-300 cursor-pointer right-0 absolute top-1/2 -translate-y-1/2">Dashboard</a>
            </div>
        </nav>
    )
}