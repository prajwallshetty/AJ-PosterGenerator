import { forwardRef } from 'react';
import { PosterData } from './PosterForm';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

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
      <div className="flex flex-col items-center">
        <div 
          ref={ref}
          className="w-[600px] h-[800px] shadow-poster rounded-lg overflow-hidden relative"
          style={{ 
            fontFamily: 'Inter, system-ui, sans-serif',
            background: 'var(--poster-gradient)'
          }}
        >
          {/* Institution Header */}
          <div className="bg-poster-header text-gray-800 p-6 text-center border-b-4 border-poster-accent">
            <div className="flex items-center justify-center mb-2">
              <div className="w-16 h-16 bg-gradient-academic rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">AJ</span>
              </div>
              <div className="text-left">
                <h1 className="text-lg font-bold text-primary uppercase">
                  AJ INSTITUTE OF ENGINEERING AND TECHNOLOGY
                </h1>
                <p className="text-xs text-muted-foreground">NH-66, Kottara Chowki, Mangaluru -575006, Karnataka, INDIA</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">A Unit of Laxmi Memorial Education Trust</p>
            <p className="text-xs text-muted-foreground">(Approved by AICTE, New Delhi. Affiliated to Visvesvaraya Technological University, Belagavi)</p>
            <p className="text-xs text-muted-foreground font-semibold">Accredited by NBA (BE: CV, CSE, ECE, ISE, ME)</p>
          </div>

          {/* Department Section */}
          <div className="text-center text-poster-text py-4">
            <h2 className="text-xl font-bold uppercase">
              {data.department || 'DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING'}
            </h2>
            <h3 className="text-lg font-semibold mt-1">(ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)</h3>
            <p className="text-lg mt-2 font-medium">Presents</p>
            <p className="text-base mt-1">One day hands on Workshop on</p>
          </div>

          {/* Workshop Title */}
          <div className="text-center px-6 mb-6">
            <h1 className="text-2xl font-bold text-poster-title leading-tight">
              "{data.title || 'From AI Agents to Agentic AI: Evolution, Opportunities, and Challenges of Intelligent Systems'}"
            </h1>
          </div>

          {/* Main content with two columns */}
          <div className="px-8 pb-8 flex-1">
            <div className="grid grid-cols-2 gap-8 items-start">
              {/* Left Column - Resource Person */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    {data.image ? (
                      <img
                        src={data.image}
                        alt="Resource Person"
                        className="w-40 h-40 rounded-full object-cover border-4 border-poster-accent shadow-lg"
                      />
                    ) : (
                      <div className="w-40 h-40 rounded-full bg-gradient-academic flex items-center justify-center shadow-lg border-4 border-poster-accent">
                        <User className="h-16 w-16 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-poster-text">
                  <p className="text-lg font-bold text-red-400 mb-2">Resource Person</p>
                  <h2 className="text-xl font-bold mb-1">
                    {data.resourcePersonName || 'Mrs.Jamuna K M'}
                  </h2>
                  <p className="text-base font-semibold">
                    {data.designation || 'Assistant Professor, CSE-ICB.'}
                  </p>
                </div>
              </div>

              {/* Right Column - Event Details */}
              <div className="text-poster-text space-y-6 mt-8">
                <div className="flex items-center space-x-4">
                  <div className="text-poster-accent">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {data.date ? data.date.split('-').reverse().join('/') : '23/08/2025'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-poster-accent">
                    <Clock className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {data.time ? `${formatTime(data.time)} to 4:30 PM` : '10:00AM to 4:30 PM'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-poster-accent">
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
            <div className="mt-12 pt-6 border-t border-white/30">
              <div className="grid grid-cols-3 gap-4 text-center text-poster-text text-sm">
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
              
              <div className="grid grid-cols-2 gap-4 text-center text-poster-text text-sm mt-4">
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

            {/* Patrons Section */}
            <div className="mt-6 pt-4 border-t border-white/30">
              <h3 className="text-center text-poster-accent font-bold text-base mb-3">Our Patrons</h3>
              <div className="grid grid-cols-3 gap-2 text-center text-poster-text text-xs">
                <div>
                  <p className="font-bold">Dr.A J Shetty</p>
                  <p>President,LMET</p>
                </div>
                <div>
                  <p className="font-bold">Mrs.Sharada J Shetty</p>
                  <p>Director,LMET</p>
                </div>
                <div>
                  <p className="font-bold">Mr.Prasanth Shetty</p>
                  <p>Vice President,LMET</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center text-poster-text text-xs mt-2">
                <div>
                  <p className="font-bold">Mrs. Arshitha P Shetty</p>
                  <p>Director,LMET</p>
                </div>
                <div>
                  <p className="font-bold">Dr.Prasanth Marla</p>
                  <p>Director,LMET</p>
                </div>
                <div>
                  <p className="font-bold">Dr.Amitha P Marla</p>
                  <p>Director,LMET</p>
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