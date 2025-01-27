import { FramerMotion, InertiaReact, Link } from '@/index';
export default function MobileNavigation({ open }: { open: boolean }) {
    return (
        <FramerMotion.motion.nav
            initial={{ width: 0 }}
            animate={{ width: open ? 'calc(100% - 80px)' : 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 z-[99999] flex h-[calc(100vh-64px)] flex-col overflow-hidden border-r border-border/10 bg-bg-normal"
        >
            <ul className="flex w-full flex-1 flex-col gap-3 p-4">
                <Link href={route('dashboard.agenda.index')}>
                    <li
                        className={`flex w-full cursor-pointer gap-2 rounded p-2 py-3 tracking-widest text-txt-two hover:bg-bg-extra-light ${window.location.href && window.location.href.includes('agenda') && 'bg-bg-light'}`}
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
                        className={`flex w-full cursor-pointer gap-2 rounded p-2 py-3 tracking-widest text-txt-two hover:bg-bg-extra-light ${window.location.href && window.location.href.includes('customers') && 'bg-bg-light'}`}
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
                        className={`flex w-full cursor-pointer gap-2 rounded p-2 py-3 tracking-widest text-txt-two hover:bg-bg-extra-light ${window.location.href && window.location.href.includes('treatments') && 'bg-bg-light'}`}
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
                        className={`flex w-full cursor-pointer gap-2 rounded p-2 py-3 tracking-widest text-txt-two hover:bg-bg-extra-light ${window.location.href && window.location.href.includes('lookup') && 'bg-bg-light'}`}
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
                        className={`flex w-full cursor-pointer gap-2 rounded p-2 py-3 tracking-widest text-txt-two hover:bg-bg-extra-light ${window.location.href && window.location.href.includes('bookkeeping') && 'bg-bg-light'}`}
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
            <div className="flex flex-col gap-3 p-4">
                <Link href={route('dashboard.settings.index')}>
                    <li
                        className={`flex w-full cursor-pointer gap-2 rounded p-2 py-3 tracking-widest text-txt-two hover:bg-bg-extra-light ${window.location.href && window.location.href.includes('settings') && 'bg-bg-light'}`}
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
                    onClick={() => InertiaReact.router.post(route('logout'))}
                    className="flex w-full cursor-pointer gap-2 rounded p-2 py-3 text-lg tracking-widest text-txt-two hover:bg-bg-extra-light"
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
