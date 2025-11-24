import { create } from "zustand";
type ModalType = "cart" | null;

interface ModalStore {
  openModal: ModalType;
  onOpen: (value: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  openModal: null,
  onOpen: (value) => set({ openModal: value }),
  onClose: () => set({ openModal: null }),
}));
