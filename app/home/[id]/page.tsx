import { createReservation } from "@/app/actions"
import { CategoryShowCase } from "@/app/components/CategoryShowCase"
import { HomeMap } from "@/app/components/HomeMap"
import { SelectCalander } from "@/app/components/SelectCalander"
import { ReservationSubmitButton } from "@/app/components/SubmitButtons"
import prisma from "@/app/lib/db"
import { useCountries } from "@/app/lib/getCountries"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Image from "next/image"
import Link from "next/link"
import { unstable_noStore as noStore} from "next/cache";


async function getData(homeId: string) {
    noStore();
    const data = await prisma.home.findUnique({
        where: {
            id: homeId,
        },
        select: {
            photo: true,
            descryption: true,
            guests: true,
            bedrooms: true,
            bathrooms: true,
            title: true,
            categoryName: true,
            price: true,
            city: true,
            Reservation: {
                where: {
                    homeId: homeId,
                },
            },
            User: {
                select: {
                    profileImage: true,
                    firstName: true,
            },
        },
    },
})
    return data
}


export default async function HomeRoute({params,}) {
    const { id } = await params
    const data = await getData(id)
    const {getCountryByValue} = useCountries()
    const country = getCountryByValue(data?.city as string)
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    return (
       <div className="w-[75%] mx-auto mt-10 mb-12">
            <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
            <div className="relative h-[950px]">
                <Image
                src={`https://yamlnoydeoywybtdwozh.supabase.co/storage/v1/object/public/images/${data?.photo}`}
                 alt="Image of home" 
                fill
                className="rounded-lg h-full object-cover"
                />
            </div>
            <div className="flex justify-between  gap-x-24 mt-8">
                <div className="w-2/3">
                    <h3 className="text-xl font-medium">
                        {country?.label}
                    </h3>
                    <div className="flex gap-x-2 text-muted-foreground">
                        <p>{data?.guests} Guests</p>  <p>{data?.bedrooms} Bedrooms</p>  <p>{data?.bathrooms} Bathrooms</p>
                    </div>
                    <div className="flex item-center mt-6">
                     <img src={data?.User?.profileImage ||
                     "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"} 
                         alt="User Profile"
                         className="w-11 h-11 rounded-full"
                        />
                        <div className="flex flex-col ml-4">
                            <h3 className="font-medium">{data?.User?.firstName}</h3>
                            <p className="text-sm text-muted-foreground">Host since 2025</p>
                        </div>
                    </div>
                    <Separator className="my-7"/>

                    <CategoryShowCase categoryName={data?.categoryName as string}/>

                    <Separator className="my-7"/>

                    <p className="text-muted-forground">{data?.descryption}</p>

                    <Separator className="my-7"/>

                    <HomeMap locationValue={country?.value as string}/>
                
                </div>
                <form action={createReservation}>
                    <input type="hidden" name="homeId" value={id}/>
                    <input type="hidden" name="userId" value={user?.id}/>
                <SelectCalander reservation={data?.Reservation}/>

                {user?.id ? (
                       <ReservationSubmitButton/>
                ): (
                        <Button className="w-full" asChild>
                            <Link href="/api/auth/login">
                            Make a Reservation
                            </Link>
                        </Button>
                )
            }
                </form>
            </div>
       </div>
    )
}