import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButtons";
import { addToFavorite, DeleteFromFavorite } from "../actions";


interface iAppProps {
    imagePath: string;
    description: string;
    location: string;
    price: number;
    userId?: string | undefined;
    isInfavoriteList: boolean;
    favoriteId?: string;
    homeId: string;
    pathName: string;
}


export function ListingCard({
    description,
    imagePath,
    location,
    price,
    userId,
    homeId,
    pathName,
    favoriteId,
    isInfavoriteList,
}: iAppProps) {
    const { getCountryByValue } = useCountries();
    const country = getCountryByValue(location);
    
    return (
        <div className="flex flex-col">
            <div className="relative h-72">
                <Image
                 src={`https://yamlnoydeoywybtdwozh.supabase.co/storage/v1/object/public/images/${imagePath}`} 
                 alt="image of property" 
                 fill
                 className="rounded-lg h-full object-cover "/> 

                {userId && (
                    <div className="z-10 absolute top-2 right-2">
                        {isInfavoriteList ? (
                           <form action={DeleteFromFavorite}>
                            <input type="hidden" name="favoriteId" value={favoriteId} />
                             <input type="hidden" name="userId" value={userId} />
                             <input type="hidden" name="pathName" value={pathName} />
                             <DeleteFromFavoriteButton/>
                           </form>
                        ): (
                           <form action={addToFavorite}>
                             <input type="hidden" name="homeId" value={homeId} />
                             <input type="hidden" name="userId" value={userId} />
                             <input type="hidden" name="pathName" value={pathName} />
                             <AddToFavoriteButton/>
                            </form>
                        )}
                        
                    </div>
                )}
            </div>
            <Link href={`/home/${homeId}`} className="mt-2">
                <h3 className="font-medium text-base ">
                     {country?.label} 
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
                <p className="p-2 text-muted-foreground">
                <span className="font-medium text-black">${price}</span> Night
                </p>
            </Link>
        </div>
    )
}