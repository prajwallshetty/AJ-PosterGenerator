import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useRef } from "react";

export interface PosterData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  resourcePersonName: string;
  designation: string;
  image?: string;
  department?: string;
  specialization?: string;
}

interface PosterFormProps {
  onDataChange: (data: PosterData) => void;
  initialData: PosterData;
}

export const PosterForm = ({ onDataChange, initialData }: PosterFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setValue, watch } = useForm<PosterData>({
    defaultValues: initialData,
  });

  const watchedData = watch();

  const onSubmit = (data: PosterData) => {
    onDataChange(data);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setValue("image", imageUrl);
        onDataChange({ ...watchedData, image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFieldChange = (field: keyof PosterData, value: string) => {
    setValue(field, value);
    onDataChange({ ...watchedData, [field]: value });
  };

  return (
    <Card className="p-6 h-fit">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Poster Details</h2>
          <p className="text-sm text-muted-foreground">
            Fill in the details to generate your poster
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              {...register("department")}
              onChange={(e) => handleFieldChange("department", e.target.value)}
              placeholder="Enter department name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              {...register("specialization")}
              onChange={(e) => handleFieldChange("specialization", e.target.value)}
              placeholder="Enter specialization (e.g., AI & ML)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Workshop/Event Title</Label>
            <Input
              id="title"
              {...register("title")}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              placeholder="Enter workshop title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                {...register("date")}
                onChange={(e) => handleFieldChange("date", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                {...register("startTime")}
                onChange={(e) => handleFieldChange("startTime", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                {...register("endTime")}
                onChange={(e) => handleFieldChange("endTime", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <Input
              id="venue"
              {...register("venue")}
              onChange={(e) => handleFieldChange("venue", e.target.value)}
              placeholder="Enter venue location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resourcePersonName">Resource Person Name</Label>
            <Input
              id="resourcePersonName"
              {...register("resourcePersonName")}
              onChange={(e) => handleFieldChange("resourcePersonName", e.target.value)}
              placeholder="Enter speaker name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              {...register("designation")}
              onChange={(e) => handleFieldChange("designation", e.target.value)}
              placeholder="Enter speaker designation"
            />
          </div>

          <div className="space-y-2">
            <Label>Resource Person Photo</Label>
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-8 w-8 mb-2" />
              <p className="text-sm">
                {watchedData.image ? "Image uploaded" : "Click to upload image"}
              </p>
              <p className="text-xs">PNG, JPG up to 5MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </form>
      </div>
    </Card>
  );
};
