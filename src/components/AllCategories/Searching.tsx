import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";

export default function Searching() {
  return (
    <div className="flex  items-center justify-center gap-3">
      {/* Dropdown Filters */}
      {["Location", "For whom", "Categories", "Price (from... to...)"].map((placeholder, index) => (
        <Select key={index}>
          <SelectTrigger className="w-full max-w-[250px] md:max-w-[300px] lg:max-w-[340px]">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      ))}

      {/* Search Button */}
      <Button
        variant="outline"
        className="border border-primary p-3 rounded-lg bg-primary text-white hover:bg-opacity-80 transition"
      >
        <FaArrowRight />
      </Button>
    </div>
  );
}
