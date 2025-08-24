import { Button } from "@/components/ui/button";
import { Download, FileImage, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import { toast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

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
      toast({
        title: "Generating...",
        description: "Creating PNG image, please wait...",
      });

      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: "#ffffff",
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: 600,
        height: 1175,
      });

      const link = document.createElement("a");
      link.download = `poster-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Success!",
        description: "PNG downloaded successfully",
      });
    } catch (error) {
      console.error("Error generating PNG:", error);
      toast({
        title: "Error",
        description: "Failed to generate PNG. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadPDF = async () => {
    if (!posterRef.current) {
      toast({
        title: "Error",
        description: "Poster preview not found",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Generating...",
        description: "Creating PDF, please wait...",
      });

      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: "#ffffff",
        scale: 3, // higher quality for PDF
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      // Create PDF matching the canvas size
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height], // Keep exact poster size
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`poster-${Date.now()}.pdf`);

      toast({
        title: "Success!",
        description: "PDF downloaded successfully",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
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
        className="w-full bg-gradient-academic hover:opacity-90 transition-opacity"
        size="lg"
      >
        <FileText className="mr-2 h-5 w-5" />
        Download PDF
      </Button>
    </div>
  );
};
