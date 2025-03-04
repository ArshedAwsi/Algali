import { CreateDescription } from "@/app/actions";
import { Counter } from "@/app/components/Counter";
import CreationBottomBar from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectLabel } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default async function DescriptionPage({params}) {
    const { id } = await params
    
    return (
        <>
        <div className="w-3/5 mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight transition-colors mt-10">
                !يرجى اعطاء افضل وصف للعقاري الخاص بك
           </h2>
        </div>


        <form action={CreateDescription}>
            <input type="hidden" name="homeId" value={id}/>
            <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
                <div className="flex flex-col gap-y-2">
                    <Label>عنوان</Label>
                    <Input name="title" type="text" required placeholder="...اجعل عنوانك قصير" />
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>الوصف</Label>
                    <Textarea name="description" required placeholder="...يرجى اعطاء افضل وصف للعقاري الخاص بك"/>
                </div>
                <div>
                    <Label>السعر</Label>
                    <Input name="price" type="number" required placeholder="سعر الاجار" min={10}/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>ارفق صورة</Label>
                    <Input name="image" type="file" required />
                </div>
                <Card>
                   <CardHeader className="flex flex-col gap-y-5">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col ">
                                <h3 className="underline font-medium">الضيوف</h3>
                                <p className="text-muted-foreground text-sm">كم هو الحد الاعلى للضيوف؟</p>
                            </div>
                            <Counter name="guest"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col ">
                                <h3 className="underline font-medium">الغرف</h3>
                                <p className="text-muted-foreground text-sm">كم عدد الغرف؟</p>
                            </div>
                            <Counter name="room"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col ">
                                <h3 className="underline font-medium">الحمامات</h3>
                                <p className="text-muted-foreground text-sm">كم عدد الحمامات؟</p>
                            </div>
                            <Counter name="bathroom"/>
                        </div>
                   </CardHeader>
                </Card>
            </div>

            <CreationBottomBar/>

        </form>
        </>
    )
}