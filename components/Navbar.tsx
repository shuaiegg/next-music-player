import Link from "next/link"
import { Avatar } from "@/components/ui/avatar"

const Navbar = () => {
    return (
        <nav className="bg-black text-white flex gap-4 md:gap-0 items-start md:items-center justify-between flex-wrap md:flex-row py-4 px-16">
            <div className="flex items-center gap-4">
                <Avatar name="Startup" size="md" />
            <div className="flex gap-4">
                <Link href="/" className="navLink">Home</Link>
                <Link href="/about" className="navLink">About</Link>
                <Link href="/contact" className="navLink">Contact</Link>
                <Link href="/contact" className="navLink">Shop</Link>
                <Link href="/preview" className="navLink">Preview</Link>
            </div>
            </div>
            <div className="flex gap-4 items-center">
                 <Link href="/help" className="navLink">Help</Link>
                <Link href="/login" className="navLink">Login</Link>
                <Link href="/signup" className="bg-white text-black py-2 px-3 rounded-full font-medium text-sm cursor-pointer hover:bg-zinc-200">Signup</Link>
            </div>
            
        </nav> 
    )
}

export default Navbar