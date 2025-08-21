import { forwardRef } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

// Mock PosterData interface for demo
interface PosterData {
  department?: string;
  title?: string;
  image?: string;
  resourcePersonName?: string;
  designation?: string;
  date?: string;
  time?: string;
  venue?: string;
}

interface PosterPreviewProps {
  data: PosterData;
}

export const PosterPreview = forwardRef<HTMLDivElement, PosterPreviewProps>(
  ({ data }, ref) => {
    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };

    const formatTime = (timeString: string) => {
      if (!timeString) return '';
      const [hours, minutes] = timeString.split(':');
      const time = new Date();
      time.setHours(parseInt(hours), parseInt(minutes));
      return time.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    };

    return (
      <div className="flex flex-col items-center p-4">
        <div 
          ref={ref}
          className="w-[600px] min-h-[800px] shadow-2xl rounded-lg overflow-hidden relative bg-gradient-to-br from-blue-50 to-indigo-100"
          style={{ 
            fontFamily: 'Inter, system-ui, sans-serif'
          }}
        >
          {/* Institution Header */}
          <div className="bg-white text-gray-800 p-6 text-center border-b-4 border-blue-600">
            <div className="flex items-center justify-center mb-2">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4  p-2">
                  <img 
                    src="/ajlogo.jpeg" 
                    alt="AJ Institute Logo" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
              <div className="text-left">
                <h1 className="text-lg font-bold text-blue-800 uppercase">
                  AJ INSTITUTE OF ENGINEERING AND TECHNOLOGY
                </h1>
                <p className="text-xs text-gray-600">NH-66, Kottara Chowki, Mangaluru -575006, Karnataka, INDIA</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">A Unit of Laxmi Memorial Education Trust</p>
            <p className="text-xs text-gray-600">(Approved by AICTE, New Delhi. Affiliated to Visvesvaraya Technological University, Belagavi)</p>
            <p className="text-xs text-gray-600 font-semibold">Accredited by NBA (BE: CV, CSE, ECE, ISE, ME)</p>
          </div>

          {/* Department Section */}
          <div className="text-center text-gray-800 py-4">
            <h2 className="text-xl font-bold uppercase">
              {data.department || 'DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING'}
            </h2>
            <h3 className="text-lg font-semibold mt-1">(ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)</h3>
            <p className="text-lg mt-2 font-medium">Presents</p>
            <p className="text-base mt-1">One day hands on Workshop on</p>
          </div>

          {/* Workshop Title */}
          <div className="text-center px-6 mb-6">
            <h1 className="text-2xl font-bold text-blue-800 leading-tight">
              "{data.title || 'From AI Agents to Agentic AI: Evolution, Opportunities, and Challenges of Intelligent Systems'}"
            </h1>
          </div>

          {/* Main content with two columns */}
          <div className="px-8 pb-4">
            <div className="grid grid-cols-2 gap-8 items-start">
              {/* Left Column - Resource Person */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    {data.image ? (
                      <img
                        src={data.image}
                        alt="Resource Person"
                        className="w-40 h-40 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                      />
                    ) : (
                      <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg border-4 border-blue-600">
                        <User className="h-16 w-16 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-gray-800">
                  <p className="text-lg font-bold text-red-500 mb-2">Resource Person</p>
                  <h2 className="text-xl font-bold mb-1">
                    {data.resourcePersonName || 'Mrs.Jamuna K M'}
                  </h2>
                  <p className="text-base font-semibold">
                    {data.designation || 'Assistant Professor, CSE-ICB.'}
                  </p>
                </div>
              </div>

              {/* Right Column - Event Details */}
              <div className="text-gray-800 space-y-6 mt-8">
                <div className="flex items-center space-x-4">
                  <div className="text-blue-600">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {data.date ? data.date.split('-').reverse().join('/') : '23/08/2025'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-blue-600">
                    <Clock className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {data.time ? `${formatTime(data.time)} to 4:30 PM` : '10:00AM to 4:30 PM'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-blue-600">
                    <MapPin className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {data.venue || 'A 423'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizers Section */}
            <div className="mt-8 pt-6 border-t-2 border-gray-300">
              <div className="grid grid-cols-3 gap-4 text-center text-gray-800 text-sm">
                <div>
                  <p className="font-bold">Dr. Shantharama Rai C</p>
                  <p>Principal</p>
                </div>
                <div>
                  <p className="font-bold">Dr. P.Mahabaleshwarappa</p>
                  <p>Dean academics</p>
                </div>
                <div>
                  <p className="font-bold">Dr.Antony P J</p>
                  <p>Vice Principal & HOD-CSE</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center text-gray-800 text-sm mt-4">
                <div>
                  <p className="font-bold">Dr.Chanchal Antony</p>
                  <p>HOD-CSE(AIML)</p>
                </div>
                <div>
                  <p className="font-bold">Mr. Sharad Shandhi Ravi</p>
                  <p>Association Coordinator</p>
                </div>
              </div>
            </div>

            {/* Patrons Section - Made more visible */}
            <div className="mt-6 pt-4 border-t-2 border-gray-300 bg-white/50 rounded-lg p-4 mx-2">
              <h3 className="text-center text-blue-600 font-bold text-lg mb-4">Our Patrons</h3>
              <div className="grid grid-cols-3 gap-3 text-center text-gray-800 text-sm">
                <div className="bg-white/70 p-2 rounded">
                  <p className="font-bold">Dr.A J Shetty</p>
                  <p className="text-xs">President,LMET</p>
                </div>
                <div className="bg-white/70 p-2 rounded">
                  <p className="font-bold">Mrs.Sharada J Shetty</p>
                  <p className="text-xs">Director,LMET</p>
                </div>
                <div className="bg-white/70 p-2 rounded">
                  <p className="font-bold">Mr.Prasanth Shetty</p>
                  <p className="text-xs">Vice President,LMET</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center text-gray-800 text-sm mt-3">
                <div className="bg-white/70 p-2 rounded">
                  <p className="font-bold">Mrs. Arshitha P Shetty</p>
                  <p className="text-xs">Director,LMET</p>
                </div>
                <div className="bg-white/70 p-2 rounded">
                  <p className="font-bold">Dr.Prasanth Marla</p>
                  <p className="text-xs">Director,LMET</p>
                </div>
                <div className="bg-white/70 p-2 rounded">
                  <p className="font-bold">Dr.Amitha P Marla</p>
                  <p className="text-xs">Director,LMET</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PosterPreview.displayName = 'PosterPreview';

// Demo component to show the poster
export default function Demo() {
  const sampleData: PosterData = {
    department: 'DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING',
    title: 'From AI Agents to Agentic AI: Evolution, Opportunities, and Challenges of Intelligent Systems',
    resourcePersonName: 'Mrs.Jamuna K M',
    designation: 'Assistant Professor, CSE-ICB.',
    date: '2025-08-23',
    time: '10:00',
    venue: 'A 423'
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <PosterPreview data={sampleData} />
    </div>
  );
}