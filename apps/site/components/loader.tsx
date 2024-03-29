"use client";

import * as Dialog from "@radix-ui/react-dialog";

export const Loader = ({ loading }: { loading: boolean }) => {
  return (
    <Dialog.Root open={loading}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-64 w-64 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg">
          <svg className="text-primary-500 h-16 w-16 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="mt-4 text-lg font-semibold text-gray-700">Chargement...</p>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
