import { Logo, React } from '@/index.js';

export default function TopNavigation({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <>
            <nav className="border-b border-border bg-bg-normal">
                {/* Primary Navigation Menu */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 justify-between">
                        <Logo className="absolute left-2 top-1/2 h-12 w-12 -translate-y-1/2 text-txt-one" />

                        {/* Hamburger */}
                        <div className="absolute right-2 top-1/2 -mr-2 flex -translate-y-1/2 items-center sm:hidden">
                            <button
                                onClick={() => setOpen((open) => !open)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-txt-one transition duration-150 ease-in-out hover:bg-bg-extra-light hover:text-txt-one/50 focus:bg-bg-light focus:text-txt-one/50 focus:outline-none"
                            >
                                <svg
                                    className="h-8 w-8"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    {open ? (
                                        <path
                                            className="inline-flex"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            className="inline-flex"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
