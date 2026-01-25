import { useState } from "react";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectContent,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const PostQuestion = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");

  const defaultTags = [
    { label: "Tech", value: "tech" },
    { label: "React", value: "react" },
    { label: "UX", value: "ux" },
    { label: "Product", value: "product" },
  ];

  const handleAddCustomTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = customTag.trim().toLowerCase();
      if (!newTag) return;
      if (!tags.includes(newTag)) setTags([...tags, newTag]);
      setCustomTag("");
    }
  };

  return (
    <>
      <Header showHomeButton showSearchButton={false} />

      <div className="max-w-3xl mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-semibold mb-6">Post Your Question</h1>

        <Card className="shadow-md border rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Question Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* TITLE FIELD */}
            <div className="space-y-2">
              <label className="font-medium text-base">Title</label>
              <Input
                placeholder="Enter a clear question title..."
                name="title"
                className="h-11 rounded-xl"
              />
            </div>

            {/* DESCRIPTION FIELD */}
            <div className="space-y-2">
              <label className="font-medium text-base">Description</label>
              <Textarea
                placeholder="Describe your question in detail..."
                name="description"
                className="min-h-32 rounded-xl resize-none"
              />
            </div>

            {/* Department Select */}
            <div className="space-y-2">
              <label className="font-medium text-base">Department</label>

              <Select name="department" defaultValue="My Questions">
                <SelectTrigger className="w-full md:w-64 h-11 rounded-xl">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Departments</SelectLabel>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Initiative Y">Initiative Y</SelectItem>
                    <SelectItem value="My Questions">My Questions</SelectItem>
                    <SelectItem value="Project">Project</SelectItem>
                    <SelectItem value="Unanswered">Unanswered</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Tags Section */}
            <div className="space-y-3">
              <label className="font-medium text-base">Tags</label>

              <ToggleGroup
                type="multiple"
                value={tags}
                onValueChange={(val) => setTags(val)}
                className="flex flex-wrap gap-3"
              >
                {defaultTags.map((tag) => (
                  <ToggleGroupItem
                    key={tag.value}
                    value={tag.value}
                    className="
                      px-4 py-1.5 rounded-full border shadow-sm text-sm 
                      hover:bg-muted/60 transition-all 
                      data-[state=on]:bg-primary data-[state=on]:text-white
                    "
                  >
                    {tag.label}
                  </ToggleGroupItem>
                ))}

                {/* Custom tags */}
                {tags
                  .filter((t) => !defaultTags.some((d) => d.value === t))
                  .map((tag) => (
                    <ToggleGroupItem
                      key={tag}
                      value={tag}
                      className="
                        px-4 py-1.5 rounded-full border bg-secondary/70 
                        shadow-sm text-sm hover:bg-secondary transition-all
                        data-[state=on]:bg-primary data-[state=on]:text-white
                      "
                    >
                      {tag}
                    </ToggleGroupItem>
                  ))}
              </ToggleGroup>

              {/* Custom Tag Input */}
              <div className="flex items-center gap-3 mt-2">
                <div className="relative w-full md:w-72">
                  <Input
                    placeholder="Create a new tag..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyDown={handleAddCustomTag}
                    className="
                      h-10 pl-4 pr-9 rounded-full border-2 bg-muted/40 
                      focus-visible:ring-2 focus-visible:ring-primary/40 
                      shadow-inner transition-all
                    "
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                    ↵
                  </span>
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    if (!customTag.trim()) return;
                    const newTag = customTag.trim().toLowerCase();
                    if (!tags.includes(newTag)) setTags([...tags, newTag]);
                    setCustomTag("");
                  }}
                  className="h-10 px-6 rounded-full shadow-sm"
                >
                  + Add
                </Button>
              </div>

              <input type="hidden" name="tags" value={tags.join(",")} />

              <p className="text-sm text-muted-foreground">
                Selected Tags: {tags.length ? tags.join(", ") : "None"}
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button className="w-full md:w-auto h-11 px-6 rounded-xl shadow-md">
                Submit Question
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </>
  );
};
