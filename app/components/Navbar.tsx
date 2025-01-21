import Image from "next/image"
import Link from "next/link"
import DesktopLogo from '../../public/logo.png'
import MobileLogo from '../../public/AlGali.jpg'
import UserNav from "./UserNav"
import { SearchModelComponent } from "./SearchComponent"

export function Navbar() {
  return (
    <nav className="w-full border-b">
        <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
            <Link href="/">
                <Image src={DesktopLogo} alt="Desktop Logo" className="w-21 hidden lg:block" />
                <Image src={MobileLogo} alt="Desktop Logo" className="block lg:hidden w-12"/>
            </Link> 

        <SearchModelComponent/>

        <UserNav/>

        </div>
    </nav>
  )
}

export default Navbar
