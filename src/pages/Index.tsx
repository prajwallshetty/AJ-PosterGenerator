import { useState, useRef } from "react";
import { PosterForm, PosterData } from "@/components/PosterForm";
import { PosterPreview } from "@/components/PosterPreview";
import { ExportButtons } from "@/components/ExportButtons";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";

const Index = () => {
  const posterRef = useRef<HTMLDivElement>(null);
  
  const [posterData, setPosterData] = useState<PosterData>({
    title: "From AI Agents to Agentic AI: Evolution, Opportunities, and Challenges of Intelligent Systems",
    date: "2025-08-23",
    time: "10:00",
    venue: "A 423",
    resourcePersonName: "Mrs.Jamuna K M",
    designation: "Assistant Professor, CSE-ICB.",
    department: "DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING",
    image: undefined,
  });

  const handleDataChange = (data: PosterData) => {
    setPosterData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10 shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-academic rounded-lg">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ARTIFEX AI</h1>
                <p className="text-sm text-muted-foreground">Professional Poster Creator</p>
              </div>
            </div>
            <div className="hidden md:block">
              <p className="text-sm text-muted-foreground">Create • Preview • Download</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Section - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            <PosterForm 
              onDataChange={handleDataChange} 
              initialData={posterData} 
            />
            
            {/* Export Buttons */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Export Options</h3>
              <ExportButtons posterRef={posterRef} />
            </Card>
          </div>

          {/* Preview Section - Right Side */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Live Preview</h2>
                <p className="text-sm text-muted-foreground">Your poster updates in real-time</p>
              </div>
              
              <div className="flex justify-center">
                <PosterPreview 
                  ref={posterRef}
                  data={posterData} 
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-8 p-6 text-center bg-primary-soft border-primary/20">
          <h3 className="text-lg font-semibold text-primary mb-2">How to Use Artifex AI</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-primary/80">
            <div>
              <strong>1. Fill Details</strong>
              <p>Enter your workshop information in the form on the left</p>
            </div>
            <div>
              <strong>2. Upload Photo</strong>
              <p>Add a professional photo of the resource person</p>
            </div>
            <div>
              <strong>3. Download</strong>
              <p>Export your poster as PNG or PDF for printing</p>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Artifex AI - Creating professional posters made easy
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
