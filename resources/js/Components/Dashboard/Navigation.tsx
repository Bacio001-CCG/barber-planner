import { React, MobileNavigation } from '@/index.js';

const Navigation = () => {

    const [open, setOpen] = React.useState(false)

    return (
        <>
        <nav className="bg-bg-normal border-b border-border/10">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 relative">
                    <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="590.000000pt"
                        height="410.000000pt"
                        viewBox="0 0 590.000000 410.000000"
                        className='h-12 w-12 absolute top-1/2 -translate-y-1/2 left-2 text-txt-one'
                        preserveAspectRatio="xMidYMid meet">
                        <g
                            transform="translate(0.000000,410.000000) scale(0.100000,-0.100000)"
                            fill="currentColor"
                            stroke="none">
                            <path
                                d="M1160 3974 c-232 -35 -429 -114 -590 -235 -210 -159 -358 -366 -434
                                    -609 -64 -200 -61 -127 -61 -1655 l0 -1390 190 -3 c105 -2 218 0 252 3 l63 7
                                    3 1391 c3 1299 4 1397 21 1467 62 258 231 441 481 520 107 34 335 39 467 11
                                    153 -32 258 -93 335 -196 103 -135 146 -307 122 -480 -27 -194 -137 -337 -336
                                    -436 -128 -64 -223 -79 -495 -79 l-228 0 0 -230 0 -230 329 0 c359 0 424 -7
                                    548 -56 166 -66 276 -178 334 -340 30 -84 38 -289 15 -405 -48 -242 -188 -381
                                    -445 -441 -27 -6 -234 -13 -496 -17 l-450 -6 0 -240 0 -240 85 -3 c47 -2 267
                                    1 490 7 415 11 481 17 648 62 287 77 511 256 617 494 101 229 123 569 54 839
                                    -76 297 -266 502 -569 614 -55 20 -100 42 -100 47 0 6 42 33 93 60 72 39 113
                                    71 189 146 83 83 103 109 142 190 73 150 89 225 89 414 0 140 -3 172 -26 257
                                    -45 169 -108 290 -216 415 -166 192 -399 305 -706 342 -83 10 -358 13 -415 5z"
                            />
                            <path
                                d="M4357 3964 c-264 -41 -475 -144 -652 -318 -174 -171 -284 -381 -339
                                    -646 -34 -166 -36 -253 -36 -1581 l0 -1326 110 -6 c61 -3 176 -3 255 0 l145 6
                                    0 1326 c0 1415 1 1434 49 1573 68 196 205 362 361 436 128 61 212 76 389 69
                                    192 -7 287 -35 409 -117 126 -86 239 -255 279 -415 24 -99 24 -336 -1 -425
                                    -80 -293 -285 -494 -561 -551 -76 -16 -136 -19 -381 -19 l-291 0 -7 -61 c-3
                                    -34 -6 -142 -6 -240 l0 -179 270 0 c149 0 314 5 368 11 235 25 498 118 694
                                    244 244 158 407 432 459 770 18 116 15 361 -5 475 -83 466 -388 815 -816 933
                                    -201 56 -491 73 -693 41z"
                            />
                        </g>
                    </svg>

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
