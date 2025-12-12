export default function LeftAuth() {
    return (
        <div className="hidden md:flex w-1/2 bg-primary items-center justify-center">
            <div className="w-[75%] h-[93%] rounded-3xl relative overflow-hidden">
                <img
                    src="/Leftlogin.bg.png"
                    alt="Background"
                    className="absolute  w-full h-full rounded-3xl"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-[#aaa6c7]/30 via-[#f8d9e8]/30 to-[#f57a27]/30 z-30"></div>

                {/* Logo */}
                <div className="absolute top-6 left-6 z-40">
                    <img src="/productrLogo.png" alt="logo" className="h-8 w-auto" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-40">
                    <div>
                        <img
                            src="/Uplist.png"
                            alt="Uplist"
                            className="w-[150px] lg:w-[250px] rounded-[32px] shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
