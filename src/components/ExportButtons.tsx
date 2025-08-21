import { Button } from "@/components/ui/button";
import { Download, FileImage } from "lucide-react";
import html2canvas from "html2canvas";
import { toast } from "@/hooks/use-toast";

interface ExportButtonsProps {
  posterRef: React.RefObject<HTMLDivElement>;
}

export const ExportButtons = ({ posterRef }: ExportButtonsProps) => {
  const downloadPNG = async () => {
    if (!posterRef.current) {
      toast({
        title: "Error",
        description: "Poster preview not found",
        variant: "destructive",
      });
      return;
    }

    try {
      // Show loading state
      toast({
        title: "Generating...",
        description: "Creating PNG image, please wait...",
      });

      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: 600,
        height: 800,
      });

      const link = document.createElement('a');
      link.download = `poster-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Success!",
        description: "PNG downloaded successfully",
      });
    } catch (error) {
      console.error('Error generating PNG:', error);
      toast({
        title: "Error",
        description: "Failed to generate PNG. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadPDF = async () => {
    // For now, we'll use the PNG method and suggest PDF as a future enhancement
    toast({
      title: "PDF Export",
      description: "PDF export will be available soon. Using PNG for now...",
    });
    await downloadPNG();
  };

  return (
    <div className="flex flex-col space-y-3">
      <Button 
        onClick={downloadPNG}
        className="w-full bg-gradient-academic hover:opacity-90 transition-opacity"
        size="lg"
      >
        <FileImage className="mr-2 h-5 w-5" />
        Download PNG
      </Button>
      
      <Button 
        onClick={downloadPDF}
        variant="outline"
        size="lg"
        className="w-full border-primary text-primary hover:bg-primary-soft"
      >
        <Download className="mr-2 h-5 w-5" />
        Download PDF
      </Button>
    </div>
  );
};