import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MenuIcon } from "lucide-react"
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createAlgaliHome } from "../actions";




export async function UserNav() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    const createHomewithId = createAlgaliHome.bind(null, {
        userId: user?.id as string,
    });


  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />

                <img src={user?.picture?? "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
                 alt="image of the user" className="rounded-full h-8 w-8 hidden lg:block"/>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
            {user ? (
                <>
                <DropdownMenuItem>
                    <form action={createHomewithId} className="w-full" >
                        <button type="submit" className="w-full text-start">
                             قم بتسجيل عقارك
                        </button>
                    </form>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/my-homes" className="w-full">
                    عقاراتي
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/favorites" className="w-full">
                    المفضلات
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/reservations" className="w-full">
                    حجوزاتي
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator/>
               
            <DropdownMenuItem>
                <LogoutLink className="w-full">تسجيل خروج</LogoutLink>
            </DropdownMenuItem>
                </>
            ):
            <>
                <DropdownMenuItem>
                <RegisterLink className="w-full">انشاء حساب</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <LoginLink className="w-full">تسجيل دخول</LoginLink>
            </DropdownMenuItem>
            </>}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav