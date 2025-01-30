import { FramerMotion, InertiaReact, Link, React, ThemeContext } from '@/index';
export default function PcNavigation() {
    const [open, setOpen] = React.useState(true);
    const { setTheme } = ThemeContext.useThemes();
    return (
        <FramerMotion.motion.nav
            initial={{ width: '20rem' }}
            animate={{ width: open ? '20rem' : '3.5rem' }}
            transition={{ duration: 0.3 }}
            className="hidden h-[calc(100vh-64px)] flex-col overflow-hidden border-r border-border bg-bg-normal md:flex"
        >
            <ul className="my-2 flex w-full flex-1 flex-col gap-2">
                <FramerMotion.motion.li
                    initial={{ width: '20rem' }}
                    animate={{
                        width: open ? '20rem' : '3.5rem',
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setOpen((open) => !open)}
                    className={`flex w-full cursor-pointer justify-center gap-5 px-4 py-3 tracking-widest text-txt-two`}
                >
                    <FramerMotion.motion.span
                        initial={'on'}
                        animate={open ? 'on' : 'off'}
                        variants={{
                            on: { rotate: 180 },
                            off: { rotate: 0 },
                        }}
                        className={`material-symbols-outlined scale-125 ${window.location.href && window.location.href.includes('agenda') && 'text-accent'}`}
                    >
                        chevron_right
                    </FramerMotion.motion.span>{' '}
                </FramerMotion.motion.li>
                <Link href={route('dashboard.agenda.index')}>
                    <li
                        className={`flex w-full cursor-pointer gap-5 px-4 py-3 tracking-widest text-txt-two hover:bg-hover ${window.location.href && window.location.href.includes('agenda') && 'bg-bg-light'}`}
                    >
                        <span
                            className={`material-symbols-outlined scale-95 ${window.location.href && window.location.href.includes('agenda') && 'text-accent'}`}
                        >
                            calendar_month
                        </span>{' '}
                        <h1 className="text-lg">Agenda</h1>
                    </li>
                </Link>
                <Link href={route('dashboard.customers.index')}>
                    <li
                        className={`flex w-full cursor-pointer gap-5 px-4 py-3 tracking-widest text-txt-two hover:bg-hover ${window.location.href && window.location.href.includes('customers') && 'bg-bg-light'}`}
                    >
                        <span
                            className={`material-symbols-outlined scale-95 ${window.location.href && window.location.href.includes('customers') && 'text-accent'}`}
                        >
                            people
                        </span>{' '}
                        <h1 className="text-lg">Klanten</h1>
                    </li>
                </Link>
                <Link href={route('dashboard.treatments.index')}>
                    <li
                        className={`flex w-full cursor-pointer gap-5 px-4 py-3 tracking-widest text-txt-two hover:bg-hover ${window.location.href && window.location.href.includes('treatments') && 'bg-bg-light'}`}
                    >
                        <span
                            className={`material-symbols-outlined scale-95 ${window.location.href && window.location.href.includes('treatments') && 'text-accent'}`}
                        >
                            content_cut
                        </span>{' '}
                        <h1 className="text-lg">Behandelingen</h1>
                    </li>
                </Link>
                <Link href={route('dashboard.lookup.index')}>
                    <li
                        className={`flex w-full cursor-pointer gap-5 px-4 py-3 tracking-widest text-txt-two hover:bg-hover ${window.location.href && window.location.href.includes('lookup') && 'bg-bg-light'}`}
                    >
                        <span
                            className={`material-symbols-outlined scale-95 ${window.location.href && window.location.href.includes('lookup') && 'text-accent'}`}
                        >
                            search
                        </span>{' '}
                        <h1 className="text-lg">Opzoeken</h1>
                    </li>
                </Link>
                <Link href={route('dashboard.bookkeeping.index')}>
                    <li
                        className={`flex w-full cursor-pointer gap-5 px-4 py-3 tracking-widest text-txt-two hover:bg-hover ${window.location.href && window.location.href.includes('bookkeeping') && 'bg-bg-light'}`}
                    >
                        <span
                            className={`material-symbols-outlined scale-95 ${window.location.href && window.location.href.includes('bookkeeping') && 'text-accent'}`}
                        >
                            book_2
                        </span>{' '}
                        <h1 className="text-lg">Boekhouden</h1>
                    </li>
                </Link>
            </ul>
            <div className="my-2 flex flex-col gap-2">
                <Link href={route('dashboard.settings.index')}>
                    <li
                        className={`flex w-full cursor-pointer gap-5 px-4 py-3 tracking-widest text-txt-two hover:bg-hover ${window.location.href && window.location.href.includes('settings') && 'bg-bg-light'}`}
                    >
                        <span
                            className={`material-symbols-outlined scale-95 ${window.location.href && window.location.href.includes('settings') && 'text-accent'}`}
                        >
                            settings
                        </span>{' '}
                        <h1 className="text-lg">Instellingen</h1>
                    </li>
                </Link>
                <button
                    type="button"
                    className="flex w-full cursor-pointer gap-5 rounded px-4 py-3 text-lg tracking-widest text-txt-two hover:bg-hover"
                    onClick={() =>
                        setTheme((theme) =>
                            theme === 'dark' ? 'light' : 'dark',
                        )
                    }
                >
                    <span className="material-symbols-outlined scale-95">
                        contrast
                    </span>{' '}
                    <span className="text-nowrap">Dark / Light mode</span>
                </button>
                <button
                    type="button"
                    onClick={() => InertiaReact.router.post(route('logout'))}
                    className="flex w-full cursor-pointer gap-5 rounded px-4 py-3 text-lg tracking-widest text-txt-two hover:bg-hover"
                >
                    <span className="material-symbols-outlined scale-95">
                        logout
                    </span>{' '}
                    Logout
                </button>
            </div>
        </FramerMotion.motion.nav>
    );
}
