import { Logo } from "../logo/Logo"

export const Navbar = () => {
    return (
        <nav className="relative flex flex-wrap items-center justify-between  px-2 py-8 mb-3 shadow">
            <div className="container px-4 mx-auto flex flex-wrap items-center lg:justify-between md:justify-center sm:justify-center">

                <Logo />

                <div className="w-full flex-wrap relative flex justify-between sm:justify-center lg:w-auto lg:static lg:block lg:justify-start ">
                    <a
                        className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 text-black text-center"
                        href="#pablo"
                    >
                        Customerio Full Stack Developer Challenge
                    </a>

                </div>

            </div>
        </nav>
    )
}