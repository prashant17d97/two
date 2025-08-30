import Image from "next/image";
import logo from "../../public/deepcarve_logo.svg";

export default function OTPlayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50">
      <div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col p-12">
        <header className="flex items-center">
          <Image src={logo} alt="Deepcarve Logo" width={200} height={150} priority />
        </header>

        <main className="flex-1 overflow-auto">
          <div className="flex min-h-[80vh] flex-col gap-6 md:flex-row">
            {/* Left column: hero text */}
            <div className="flex items-center justify-start sm:items-start sm:justify-start md:items-center md:justify-center md:pt-12 md:pb-16 lg:flex-1 lg:items-center lg:justify-center">
              <div className="font-archivo text-3xl font-normal text-emerald-950 sm:text-4xl md:text-5xl lg:text-6xl">
                We&apos;re on a mission to
                <br />
                help memorialist
              </div>
            </div>

            {/* Right column: OTP card */}
            <div className="flex min-h-fit sm:items-start sm:justify-start md:items-center md:justify-center lg:flex-1 lg:items-center lg:justify-center">
              {children}
            </div>
          </div>
        </main>
        <footer>
          <div className="font-archivo justify-start self-stretch text-lg leading-tight font-medium text-emerald-950/60">
            Change your life to be better
          </div>
        </footer>
      </div>
    </div>
  );
}
