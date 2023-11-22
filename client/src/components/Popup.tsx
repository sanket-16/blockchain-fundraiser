import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

const usePopup = () => {
  const [open, setOpen] = useState<boolean>(false);

  const Popup = ({ children }: { children: ReactNode }) => {
    if (!open) return null;
    return (
      <>
        {createPortal(
          <div
            className="h-[100vh] w-[100vw] bg-black/50 fixed flex items-center justify-center"
            onClick={(event) => {
              if (event.currentTarget === event.target) {
                setOpen(false);
              } else {
                event.stopPropagation();
              }
            }}
          >
            <div className="bg-background p-4 rounded-md border border-muted">
              {children}
            </div>
          </div>,
          document.body
        )}
      </>
    );
  };

  return { open, setOpen, Popup };
};

export default usePopup;
