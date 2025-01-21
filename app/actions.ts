"use server"

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { AddToFavoriteButton } from "./components/SubmitButtons";
import { revalidatePath } from "next/cache";
import path from "path";


export async function createAlgaliHome({userId}: {userId: string}) {
    const data = await prisma.home.findFirst ({
        where: {
            userId: userId,
        },
        orderBy: {
        createdAT: "desc",
        },
    });

   if (data === null) {
    const data = await prisma.home.create({
        data: {
            userId: userId,
        },
    });

        return redirect(`/create/${data.id}/structure`)
    } else if(!data.addedCategory &&
              !data.addedDescription &&
              !data.addedLocation) {
        return redirect(`/create/${data.id}/structure`)
    } else if(data.addedCategory && !data.addedDescription) {
        return redirect(`/create/${data.id}/description`)
    } else if(data.addedCategory && 
              data.addedDescription && 
              !data.addedLocation) {
        return redirect(`/create/${data.id}/address`);
    } else if (data.addedCategory && 
               data.addedDescription && 
               data.addedLocation) {
        const data = await prisma.home.create({
            data: {
                userId: userId,
            },
        });
        return redirect(`/create/${data.id}/structure`)
    }
}

export async function createCategoryPage(formData: FormData) {
    const categoryName = formData.get("categoryName") as string;
    const homeId = formData.get("homeId") as string;
    
    const data = await prisma.home.update ({
        where: {
            id: homeId,
        },
        data: {
            categoryName: categoryName,
            addedCategory: true,
        },
    });

    return redirect (`/create/${homeId}/description`)
}

export async function CreateDescription(formData: FormData){
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price");
        const imageFile = formData.get("image") as File;
        const homeId = formData.get("homeId") as string;

        const guestNumber = formData.get("guest") as string;
        const roomNumber = formData.get("room") as string;
        const bathroomNumber = formData.get("bathroom") as string;
        

        const { data: imageData} = await supabase.storage
        .from("images")
        .upload(`${imageFile.name}-${new Date()}`, imageFile, {
            cacheControl: "2592000",
            contentType: "image/png",
         });

         const data = await prisma.home.update({
            where: {
                id: homeId,
            },
            data: {
                title: title,
                descryption: description,
                price: Number(price),
                bedrooms: roomNumber,
                bathrooms: bathroomNumber,
                guests: guestNumber,
                photo: imageData?.path,
                addedDescription: true,
            }
         })
         

         return redirect(`/create/${homeId}/address`)
}


export async function createLocation(formData: FormData) {
    const homeId = formData.get("homeId") as string;
    const cityValue = formData.get("cityValue") as string;
    const data = await prisma.home.update({
        where:{
            id: homeId,
        },
        data: {
            
            addedLocation: true,
            city: cityValue,
        },
    })

    return redirect("/")
}

export async function addToFavorite(FormData: FormData) {
    const homeId = FormData.get("homeId") as string;
    const userId = FormData.get("userId") as string;
    const pathName = FormData.get("pathName") as string;

    const data = await prisma.favorite.create({
        data: {
            homeId: homeId,
            userId: userId,
        },
    });

    revalidatePath(pathName);
}

export async function DeleteFromFavorite(FormData: FormData) {
    const favoriteId = FormData.get("favoriteId") as string;
    const pathName = FormData.get("pathName") as string;
    const userId = FormData.get("userId") as string;

    const data = await prisma.favorite.delete({
        where: {
            id: favoriteId,
            userId: userId,
        },
    });

    revalidatePath(pathName);
}

export async function createReservation(formData: FormData){
    const userId = formData.get("userId") as string;
    const homeId = formData.get("homeId") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    const data = await prisma.reservation.create({
        data: {
            userId: userId,
            homeId: homeId,
            startDate: startDate,
            endDate: endDate,
        },
    });

    return redirect("/")
}