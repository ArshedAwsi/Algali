import { Button } from "@/components/ui/button"
import { CreationSubmit } from "./SubmitButtons"
import Link from "next/link"

const CreationBottomBar = () => {
  return (
    <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
    <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">

        <Button variant="secondary" size="lg" asChild >
            <Link href="/"> الغاء</Link>
        </Button>
        <CreationSubmit/>
    </div>
</div>
  )
}

export default CreationBottomBar