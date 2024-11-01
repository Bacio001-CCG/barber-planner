import { FramerMotion } from "@/index";
export default function Modal({ onClose, children, title, isOpen, zIndex = 50 }: {
    onClose: () => void,
    children: React.ReactNode,
    title?: string,
    isOpen: boolean,
    zIndex?: number
}) {
    return (
      <FramerMotion.motion.div 
        animate={{ opacity: isOpen ? 1 : 0, display: isOpen ? 'flex' : 'none' }}
        initial={{ opacity: 0, display: 'none' }}
        style={{
          zIndex: zIndex
        }}
        className={` fixed top-0 h-screen w-screen flex items-center justify-center bg-bg-extra-light/30 border border-border/10`} onMouseDown={onClose}>
        <div className="bg-bg-normal p-5 rounded-lg border border-border/10 w-[90%] max-w-[30rem] relative" onMouseDown={(e) => e.stopPropagation()}>
          <span className="absolute top-2 right-2 text-txt-one material-symbols-outlined cursor-pointer" onClick={() => onClose()}>close</span>
          {title && <h2 className="text-xl font-bold mb-5 text-txt-one tracking-widest border-b border-border/10 pb-4">{title}</h2>}
          {children}
        </div>
      </FramerMotion.motion.div>
    );
  }
  