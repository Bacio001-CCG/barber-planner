import { FramerMotion, ThemeContext } from '@/index';
export default function Modal({
    onClose,
    children,
    title,
    isOpen,
    zIndex = 50,
}: {
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    isOpen: boolean;
    zIndex?: number;
}) {
    const { theme } = ThemeContext.useThemes();

    return (
        <FramerMotion.motion.div
            id="theme"
            data-theme={theme}
            animate={{
                opacity: isOpen ? 1 : 0,
                display: isOpen ? 'flex' : 'none',
            }}
            initial={{ opacity: 0, display: 'none' }}
            style={{
                zIndex: zIndex,
            }}
            className={`fixed top-0 flex h-screen w-screen items-center justify-center border border-border bg-hover`}
            onMouseDown={onClose}
        >
            <div
                className="relative max-h-[90%] w-[90%] max-w-[30rem] overflow-y-auto rounded-lg border border-border bg-bg-normal p-5"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <span
                    className="material-symbols-outlined absolute right-2 top-2 cursor-pointer text-txt-one"
                    onClick={() => onClose()}
                >
                    close
                </span>
                {title && (
                    <h2 className="mb-5 border-b border-border pb-4 text-xl font-bold tracking-widest text-txt-one">
                        {title}
                    </h2>
                )}
                {children}
            </div>
        </FramerMotion.motion.div>
    );
}
