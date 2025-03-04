import { Suspense } from "react";
import { ItemsFilter } from "./components/ItemsFilter";
import { ListingCard } from "./components/ListingsCard";
import prisma from "./lib/db";
import { SkeletionCard } from "./components/SkeletionCard";
import { NoItems } from "./components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore} from "next/cache";

async function getData({searchParams, userId}: 
  {userId: string | undefined; searchParams?: 
    {
   filter?: string;
   city?: string;
   guest?: string;
   room?: string;
   bathroom?: string
   }
 })
 { 
  noStore();
  const {filter, city, guest, room, bathroom} = await searchParams ?? {};
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: filter ?? undefined,
      city: city ?? undefined,
      guests: guest ?? undefined,
      bedrooms: room ?? undefined, 
      bathrooms: bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      descryption: true,
      city: true,
      Favorite : {
        where: {
          userId: userId ?? undefined,
        }
      }
    },
  });

  return data;
}

export default  function Home({
  searchParams
}: { searchParams?: {
   filter?: string;
   city?: string;
   guest?: string;
   room?: string;
   bathroom?: string } })
 {
  
  return (
    <>
      <div className="container mx-auto px-5 lg:px-10">
       <Suspense>
        
        <ItemsFilter />

       </Suspense>
        
        <Suspense  fallback={<SkeletionLoading/>}>
           <ShowItems searchParams={searchParams} />
        </Suspense>
       
      </div>
    </>
  );
}

async function ShowItems({
  searchParams,
}: { searchParams?: { 
  filter?: string;
  city?: string;
  guest?: string;
  room?: string;
  bathroom?: string
 } }) {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const data = await getData({searchParams, userId: user?.id});
  return (
    <>
    {data.length === 0 ? (
        <NoItems description="!يرجى القاء نظرة على بقية القوائم او قم بادراج العقاري الخاص بك" 
        title=" ): ..لا يوجد عقاري في هذ الحقل"/>
    ): (
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.descryption as string}
              imagePath={item.photo as string}
              location={item.city as string}
              price={item.price as number}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInfavoriteList={item.Favorite.length > 0 ? true : false} 
              homeId={item.id}
              pathName="/"
            />
          ))}
        </div>
    )
    }
    </>
  )
}

function SkeletionLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletionCard />
      <SkeletionCard />
      <SkeletionCard />
      <SkeletionCard />
      <SkeletionCard />
      <SkeletionCard />
      <SkeletionCard />
      <SkeletionCard />
      <SkeletionCard />
    </div>
  );
}