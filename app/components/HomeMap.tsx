"use client"
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

export function HomeMap({locationValue}: {locationValue: string}) {
    const LazyMap = dynamic(() => import('@/app/components/Map'), {
        
        loading: () => <Skeleton className="h-[50vh] w-full"/>,
        ssr: false
    })
    return <LazyMap locationValue={locationValue}/>
}