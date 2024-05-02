import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function Root(props: PropsWithChildren) {
  return (
    <div className="padding flex flex-col gap-8 pb-8 print:gap-0" {...props} />
  );
}

export function Header({
  className,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <header className=" sticky top-0 z-50 flex w-full grow flex-col items-center print:hidden">
      <div className="flex w-full grow justify-center bg-slate-800 py-4 text-white ">
        <div className="flex max-w-[1024px] grow justify-center p-4 text-center text-2xl font-bold ">
          SISCOAF XML BUILDER for REGISTER
        </div>
      </div>
      <nav
        className={cn(
          "background-color:snow flex w-full max-w-[1024px] grow flex-col flex-wrap gap-2 bg-[#fffafa] p-4 sm:flex-row print:hidden",
          className,
        )}
        {...rest}
      />
    </header>
  );
}

export function Main({ children }: PropsWithChildren) {
  return (
    <main className="flex grow justify-center">
      <div className="flex max-w-[1024px] grow p-4">{children}</div>
    </main>
  );
}
