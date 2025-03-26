import { Button } from "../ui/button";

const filters = ["Brooklyn", "For her", "Master Classes", "Romance", "$50 - $100"];

export default function CategoryTags() {
  return (
   <>
    <div className="flex flex-wrap gap-3 mt-6">
      {filters.map((filter, index) => (
        <Button
          key={index}
          variant="outline"
          className="bg-pink-100 text-primary px-4 py-2 rounded-full hover:bg-pink-200 transition"
        >
          {filter} ✕
        </Button>
      ))}
      <Button variant="ghost" className="text-red-500 hover:underline">
        Clear All
      </Button>
    </div>
   </>
  );
}
