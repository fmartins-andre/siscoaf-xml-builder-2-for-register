import { PropsWithChildren } from "react";

export function SimpleLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-8 ">
      <header className="bg-slate-800 text-white py-4 flex grow justify-center">
        <div className="max-w-[1024px] flex grow font-bold text-2xl justify-center text-center p-4">
          SISCOAF XML BUILDER for REGISTER
        </div>
      </header>

      <main className="flex grow justify-center">
        <div className="max-w-[1024px] flex grow p-4">{children}</div>
      </main>
    </div>
  );
}
