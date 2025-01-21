import { createCategoryPage } from "@/app/actions";
import CreationBottomBar from "@/app/components/CreationBottomBar";
import { SelectCategory } from "@/app/components/SelectedCategory";


export default async function StructureRoute({params}: {params: {id: string}}) {
    const { id } = await params
    return(
        <>
        <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
            اي من الاختيارت توصف العقاري الخاص بك؟
        </h2>
        </div>

        <form action={createCategoryPage}>
            
            <input type="hidden" name="homeId" value={id} />

            <SelectCategory/>

            <CreationBottomBar/>
        </form>

        </>
    )
}