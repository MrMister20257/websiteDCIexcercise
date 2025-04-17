import Link from "next/link";


export default function NavBar() {
    return (
        <nav className="h-fit w-full flex items-center justify-center gap-3 p-5 z-10">
            <Link href={"/"} className="border-2 rounded-md bg-sky-900 hover:bg-sky-700 p-1 text-white font-semibold transition-all w-25 text-center shadow-md shadow-pink-300">Home</Link>
            <Link href={"/browser"} className="border-2 rounded-md bg-sky-900 hover:bg-sky-700 p-1 text-white font-semibold transition-all w-25 text-center shadow-md shadow-pink-300">Browser</Link>
            <Link href={"/filme"} className="border-2 rounded-md bg-sky-900 hover:bg-sky-700 p-1 text-white font-semibold transition-all w-25 text-center shadow-md shadow-pink-300">Filme</Link>
            <Link href={"/gallerie"} className="border-2 rounded-md bg-sky-900 hover:bg-sky-700 p-1 text-white font-semibold transition-all w-25 text-center shadow-md shadow-pink-300">Gallerie</Link>
        </nav>
    )
}