import { redirect } from "next/navigation"
import prisma from "../lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NoItems } from "../components/NoItems"
import { ListingCard } from "../components/ListingsCard"
import { unstable_noStore as noStore} from "next/cache";


async function getData(userId: string) {
    noStore();
    const data = await prisma.home.findMany({
        where: {
            userId: userId,
            addedCategory: true,
            addedLocation: true,
            addedDescription: true
        },
        select: {
            photo: true,
            id: true,
            price: true,
            descryption: true,
            city: true,
            Favorite: {
                where: {
                    userId: userId
                },
            },
        },
        orderBy: {
            createdAT: "desc",
        }
    })
    return data
}

export default async function MyHomes() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if (!user) {
        return redirect("/")

    }
    const data = await getData(user.id)
    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
         <h2 className="text-3xl font-semibold tracking-tight">العقاري الذي قمت بعرضه</h2>

            {data.length === 0 ? (
                <NoItems title="لم تقم بنشر اي ممتلك عقاري" description="!يرجى القيام بمنشور حتى تظهر لك النتائج"/>
            ) : (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
                {data.map((item) => (
                <ListingCard 
                key={item.id}
                imagePath={item.photo as string}
                homeId={item.id}
                price={item.price as number}
                description={item.descryption as string}
                location={item.city as string}
                userId={user.id}
                pathName="/my-homes"
                favoriteId={item.Favorite[0]?.id}
                isInfavoriteList={item.Favorite.length > 0 ? true : false}
                />
                ))}
                </div>
            )}
        </section>
    )
}