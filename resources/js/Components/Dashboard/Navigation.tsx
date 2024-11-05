import { React, MobileNavigation, Logo } from '@/index.js';

const Navigation = () => {

    const [open, setOpen] = React.useState(false)

    return (
        <>
        <nav className="bg-bg-normal border-b border-border/10">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 relative">
                    <Logo className='h-12 w-12 absolute top-1/2 -translate-y-1/2 left-2 text-txt-one' />

                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden absolute right-2 top-1/2 -translate-y-1/2">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-txt-one hover:text-txt-one/50 hover:bg-bg-extra-light focus:outline-none focus:bg-bg-light focus:text-txt-one/50 transition duration-150 ease-in-out">
                            <svg
                                className="h-8 w-8"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
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
        <MobileNavigation open={open} />

        </>
    )
}

export default Navigation
