"use client"

import { useParams } from "next/navigation"
import { createLocation } from "@/app/actions"
import CreationBottomBar from "@/app/components/CreationBottomBar"
import { useCountries } from "@/app/lib/getCountries"
import { Select, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import dynamic from "next/dynamic"
import { useState } from "react"

const AddressRoute = () => {
    const {getAllCountries} = useCountries()
    const [locationValue, setLocationValue] = useState("");

    const LazyMap = dynamic(() => import('@/app/components/Map'), {
        ssr: false,
        loading: () => <Skeleton className="h-[50vh] w-full"/>
    
    })
    const  params  = useParams()
    console.log("❤",params.id)
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          اين يقع العقاري الخاص بك؟
        </h2>
      </div>

      <form action={createLocation}>
        
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="cityValue" value={locationValue} />
        <div className="w-3/5 mx-auto mb-36">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر دولة" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                       {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <LazyMap locationValue={locationValue} />
        </div>

        <CreationBottomBar />
      </form>
    </>
  )
}

export default AddressRoute