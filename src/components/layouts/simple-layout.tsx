import { PropsWithChildren } from "react";

export function SimpleLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-8 print:gap-2">
      <header className="flex grow justify-center bg-slate-800 py-4 text-white">
        <div className="flex max-w-[1024px] grow justify-center p-4 text-center text-2xl font-bold">
          SISCOAF XML BUILDER for REGISTER
        </div>
      </header>

      <main className="flex grow justify-center">
        <div className="flex max-w-[1024px] grow p-4">{children}</div>
      </main>
    </div>
  );
}
