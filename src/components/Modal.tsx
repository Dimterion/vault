import type { ReactNode } from "react";
import Button from "./Button";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-zinc-900 p-6 text-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <Button onClick={onClose} className="mb-4">
            X
          </Button>
        </div>
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
}
