"use client"

import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom"

export function CreationSubmit() {
    const {pending} = useFormStatus();
    return <>
    {
        pending ? (
            <Button disabled size="lg">
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            يرجى الانتظار...
            </Button>

        ): (
            <Button type="submit" size="lg">التالي</Button>
        )}
    </>
}
export function AddToFavoriteButton() {
    const {pending} = useFormStatus();
    return (
        <>
        {pending ? (
          <Button variant="outline" size="icon" className="bg-primary-foreground" disabled>
            <Loader2 className="h-4 w-4 animate-spin text-primary"/>
          </Button>
        ): (
            <Button variant="outline" size="icon" className="bg-primary-foreground" type="submit">
                    <Heart className="w-4 h-4"/>
            </Button>
        )
        }
        </>
    )
}

export function DeleteFromFavoriteButton() {
    const {pending} = useFormStatus();
    return (
        <>
        {pending ? (
          <Button variant="outline" size="icon" className="bg-primary-foreground" disabled>
            <Loader2 className="h-4 w-4 animate-spin text-primary"/>
          </Button>
        ): (
            <Button variant="outline" size="icon" className="bg-primary-foreground" type="submit">
                    <Heart className="w-4 h-4 text-primary" fill="#E21C49"/>
            </Button>
        )
        }
        </>
    )
}

export function ReservationSubmitButton() {
    const {pending} = useFormStatus();
    
    return (
        <>
        {pending ? (
            <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/> ...يرجى الانتظار
        </Button>
        ): (
            <Button type="submit" className="w-full">
                  قم بانشاء حجز
            </Button>
        )}
        </>
    )
}