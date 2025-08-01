import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Clock, Briefcase, Calendar } from 'lucide-react';
import { getJobs } from '@/lib/supabaseServices';
import { type Job } from '@/lib/localStorage';
import { useToast } from '@/hooks/use-toast';

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: ''
  });

  const [showResumeForm, setShowResumeForm] = useState(false);
  const [resumeFormData, setResumeFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    message: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: "Error",
          description: "Failed to load jobs. Please refresh the page.",
          variant: "destructive",
        });
      }
    };
    
    fetchJobs();
  }, []);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplication(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // EmailJS would be configured here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      
      setApplicationData({
        name: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: ''
      });
      setShowApplication(false);
      setSelectedJob(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitResume = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // EmailJS would be configured here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Resume Submitted!",
        description: "We'll review your resume and contact you if there's a suitable opportunity.",
      });
      
      setResumeFormData({
        name: '',
        email: '',
        phone: '',
        resume: null,
        message: ''
      });
      setShowResumeForm(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showApplication && selectedJob) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button 
            variant="ghost" 
            onClick={() => setShowApplication(false)}
            className="mb-6"
          >
            ← Back to Jobs
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>Apply for {selectedJob.title}</CardTitle>
              <CardDescription>
                {selectedJob.department} • {selectedJob.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applicationData.name}
                    onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <input
                    type="email"
                    required
                    value={applicationData.email}
                    onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Resume/CV *</label>
                  <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setApplicationData({...applicationData, resume: file});
                      }}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {applicationData.resume ? applicationData.resume.name : 'Click to upload or drag and drop'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, DOC, DOCX, or TXT (max 10MB)
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                  {applicationData.resume && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      File selected: {applicationData.resume.name}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Cover Letter</label>
                  <textarea
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Why are you interested in this position?"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-4">
              Join Our Team
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build Your Career in Medical Billing
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              Join a growing team of healthcare professionals making a difference in the industry. 
              We offer competitive benefits, growth opportunities, and a collaborative work environment.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-xl text-muted-foreground">
              We invest in our team members' success and well-being
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Career Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Clear advancement paths, professional development opportunities, and mentorship programs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle>Work-Life Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Flexible schedules, remote work options, and generous PTO to maintain healthy work-life balance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Badge className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Great Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive health insurance, retirement plans, continuing education support, and more.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-muted-foreground">
              Find your next opportunity with us
            </p>
          </div>

          {jobs.length === 0 ? (
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="pt-12 pb-12">
                <h3 className="text-xl font-semibold mb-4">No Open Positions</h3>
                <p className="text-muted-foreground mb-6">
                  We don't have any open positions at the moment, but we're always looking for talented individuals.
                </p>
                <Button onClick={() => setShowResumeForm(true)}>Send Us Your Resume</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline">
                            <Briefcase className="h-3 w-3 mr-1" />
                            {job.department}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {job.type}
                          </Badge>
                          <Badge variant="outline">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </Badge>
                          <Badge variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            Posted {new Date(job.postedDate).toLocaleDateString()}
                          </Badge>
                        </div>
                      </div>
                      <Button onClick={() => handleApply(job)}>
                        Apply Now
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {job.description}
                    </CardDescription>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {job.requirements.map((req, index) => (
                          <li key={index}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Don't See the Right Position?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Button size="lg" variant="secondary" onClick={() => setShowResumeForm(true)}>
            Submit Resume
          </Button>
        </div>
              </section>

      {/* Resume Submission Dialog */}
      <Dialog open={showResumeForm} onOpenChange={setShowResumeForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit Your Resume</DialogTitle>
            <DialogDescription>
              Send us your resume and we'll keep you in mind for future opportunities.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitResume} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Full Name *</label>
              <input
                type="text"
                required
                value={resumeFormData.name}
                onChange={(e) => setResumeFormData({...resumeFormData, name: e.target.value})}
                className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Email *</label>
              <input
                type="email"
                required
                value={resumeFormData.email}
                onChange={(e) => setResumeFormData({...resumeFormData, email: e.target.value})}
                className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Phone</label>
              <input
                type="tel"
                value={resumeFormData.phone}
                onChange={(e) => setResumeFormData({...resumeFormData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Resume/CV *</label>
              <div className="border-2 border-dashed border-input rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setResumeFormData({...resumeFormData, resume: file});
                  }}
                  className="hidden"
                  id="resume-upload-general"
                />
                <label htmlFor="resume-upload-general" className="cursor-pointer">
                  <div className="space-y-2">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {resumeFormData.resume ? resumeFormData.resume.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC, DOCX, or TXT (max 10MB)
                      </p>
                    </div>
                  </div>
                </label>
              </div>
              {resumeFormData.resume && (
                <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  File selected: {resumeFormData.resume.name}
                </div>
              )}
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Message (Optional)</label>
              <textarea
                value={resumeFormData.message}
                onChange={(e) => setResumeFormData({...resumeFormData, message: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Tell us about your background, interests, or any specific roles you're looking for..."
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Resume'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}