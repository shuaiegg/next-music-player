import Link from "next/link"

const Navbar = () => {
    return (
        <nav>
            <div className="flex justify-between bg-amber-500 p-4 text-white text-xl">
            <div><Link href="/">MusicPlayer</Link> </div>
            <div className="flex gap-5">
                <Link href="/">All Songs</Link>
                <Link href="/playlists">PlayLists</Link>
            </div>
            </div>
        </nav>
    )
}

export default Navbar