"use client"

import Link from "next/link";
import { categoryItems } from "../lib/CatgegoryItems";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

export const experimental_ppr = false

export function ItemsFilter() {
    
    const searchParams = useSearchParams()
    const search =  searchParams.get("filter") 
    const pathname = usePathname()
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
        return params.toString();
        
        }, [searchParams]
    );
    return (
        <div className="flex lg:gap-x-44 gap-x-[48px] mt-5 w-full overflow-x-scroll no-scrollbar ">
            {categoryItems.map((item) =>(
                <Link key={item.id} 
                href={pathname + "?" + createQueryString("filter", item.name)}
                className={cn(
                    search === item.name ? "border-b-2 border-black pb-2 flex-shrink-0 " : "opacity-70 flex-shrink-0", 
                    "flex flex-col gap-y-3 items-center"
                )}
                >
                    
                    <div className="relative w-6 h-6">
                    <Image src={item.imageUrl} alt="Category image" className="w-6 h-6" width={24} height={24} />
                    </div>
                    <p className="text-xs font-medium">{item.title}</p>
                </Link>
            ))}
        </div>
    )
}