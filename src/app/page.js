import logo from "../../public/deepcarve_logo.svg";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-50">
            <div className="flex p-12 flex-col min-h-screen w-full max-w-screen-xl mx-auto">

                <header className=" text-white flex items-center content-center">
                    <Image
                        src={logo}
                        alt="Deepcarve Logo"
                        width={200}
                        height={150}
                        priority={true}
                    />
                </header>

                <main className="flex-1 overflow-auto ">
                    <div className="flex flex-col md:flex-row  gap-4 h-[80vh]">

                        <div className="flex min-h-fit lg:flex-1 items-center justify-start sm:pt-12 sm:pb-16 md:py-0">
                            <div
                                className="text-emerald-950 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-archivo">We&apos;re
                                on a mission to<br/>help memorialist
                            </div>
                        </div>

                        <div className="flex min-h-fit lg:flex-1 sm:items-start sm:justify-start md:items-center md:justify-center lg:items-center lg:justify-center">
                            <div className="flex flex-col bg-white p-5 items-start justify-center rounded-xl gap-3">
                                <div
                                    className="self-stretch justify-start text-zinc-900 text-3xl font-medium font-Inter">Enter
                                    OTP Code
                                </div>
                                <div className="self-stretch justify-start">
                                    <span className="text-zinc-900/70 text-lg font-medium font-Inter leading-none">Enter code that has been sent to </span>
                                    <span
                                        className="text-zinc-900 text-lg font-medium font-Inter leading-none">email</span>
                                </div>
                                <div
                                    className="justify-center text-zinc-500 text-base font-medium font-Inter pt-2">Enter
                                    Code
                                </div>
                                {/*    OTP Input Field*/}
                                <div className="self-stretch h-14 inline-flex justify-start items-start gap-1">
                                    <div
                                        className="flex-1 self-stretch px-4 py-2 bg-white rounded-xl outline outline-1 outline-offset-[-1px] text-neutral-700 flex justify-start items-center gap-3 overflow-hidden">
                                        <div className="flex-1 inline-flex flex-col justify-center items-start gap-1">
                                            <div
                                                className="self-stretch text-center justify-center text-neutral-700 text-base font-normal font-Inter">1
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex-1 self-stretch px-4 py-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] text-neutral-700 flex justify-start items-center gap-3 overflow-hidden">
                                        <div className="flex-1 inline-flex flex-col justify-center items-start gap-1">
                                            <div
                                                className="self-stretch text-center justify-center text-neutral-700 text-base font-normal font-Inter">2
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex-1 self-stretch px-4 py-2 bg-white rounded-xl outline outline-1 outline-offset-[-1px] text-neutral-700 flex justify-start items-center gap-3 overflow-hidden">
                                        <div className="flex-1 inline-flex flex-col justify-center items-start gap-1">
                                            <div
                                                className="self-stretch text-center justify-center text-neutral-700 text-base font-normal font-Inter">3
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex-1 self-stretch px-4 py-2 bg-white rounded-xl outline outline-1 outline-offset-[-1px] text-neutral-700 flex justify-start items-center gap-3 overflow-hidden">
                                        <div className="flex-1 inline-flex flex-col justify-center items-start gap-1">
                                            <div
                                                className="self-stretch text-center justify-center text-neutral-700 text-base font-normal font-Inter">4
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="self-stretch text-center justify-start text-zinc-900 text-base font-medium font-Inter">02:20
                                </div>
                                <div
                                    className="self-stretch text-center justify-start text-neutral-400 text-base font-medium font-Inter">Resend
                                    Code
                                </div>
                                <div
                                    className="self-stretch px-7 py-3 bg-sky-700 rounded-lg inline-flex justify-center items-center gap-2 overflow-hidden">
                                    <div
                                        className="justify-start text-white text-base font-medium font-Inter leading-tight">Confirm
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
