import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useRef } from "react";

export interface PosterData {
  title: string;
  date: string;
  time: string;
  venue: string;
  resourcePersonName: string;
  designation: string;
  image?: string;
  department?: string;
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

  // Handle form changes
  const onSubmit = (data: PosterData) => {
    onDataChange(data);
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setValue('image', imageUrl);
        onDataChange({ ...watchedData, image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  // Update parent component whenever form data changes
  const handleFieldChange = (field: keyof PosterData, value: string) => {
    setValue(field, value);
    onDataChange({ ...watchedData, [field]: value });
  };

  return (
    <Card className="p-6 h-fit">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Poster Details</h2>
          <p className="text-sm text-muted-foreground">Fill in the details to generate your poster</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium">Department</Label>
            <Input
              id="department"
              {...register("department")}
              onChange={(e) => handleFieldChange('department', e.target.value)}
              placeholder="Enter department name"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Workshop/Event Title</Label>
            <Input
              id="title"
              {...register("title")}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Enter workshop title"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">Date</Label>
              <Input
                id="date"
                type="date"
                {...register("date")}
                onChange={(e) => handleFieldChange('date', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium">Time</Label>
              <Input
                id="time"
                type="time"
                {...register("time")}
                onChange={(e) => handleFieldChange('time', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue" className="text-sm font-medium">Venue</Label>
            <Input
              id="venue"
              {...register("venue")}
              onChange={(e) => handleFieldChange('venue', e.target.value)}
              placeholder="Enter venue location"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resourcePersonName" className="text-sm font-medium">Resource Person Name</Label>
            <Input
              id="resourcePersonName"
              {...register("resourcePersonName")}
              onChange={(e) => handleFieldChange('resourcePersonName', e.target.value)}
              placeholder="Enter speaker name"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation" className="text-sm font-medium">Designation</Label>
            <Input
              id="designation"
              {...register("designation")}
              onChange={(e) => handleFieldChange('designation', e.target.value)}
              placeholder="Enter speaker designation"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Resource Person Photo</Label>
            <div 
              className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                {watchedData.image ? 'Image uploaded' : 'Click to upload image'}
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 5MB
              </p>
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