import { SkeletionCard } from "../components/SkeletionCard";

export default function MyHomes() {
    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight">العقاري الذي قمت بعرضه</h2>

            <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
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
        </section>
    )
}