import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Star, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getServices, type Service } from '@/lib/localStorage';
import { useToast } from '@/hooks/use-toast';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const loadService = () => {
      try {
        const services = getServices();
        const foundService = services.find(s => s.id === id);
        setService(foundService || null);
      } catch (error) {
        console.error('Error loading service:', error);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      // EmailJS configuration would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">The service you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>
          
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-4">
              {service.title}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {service.detailedTitle || service.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {service.detailedDescription || service.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12" style={{ maxWidth: '1200px' }}>
        {/* Centered Title and Description */}
        

        {/* Service Overview */}
        {service.details && (
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Service Overview</h2>
            <div className="whitespace-pre-line text-muted-foreground leading-relaxed text-lg">
              {service.details}
            </div>
          </div>
        )}

        {/* Detailed Content */}
        {service.detailedContent && (
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Comprehensive Details</h2>
            <div className="whitespace-pre-line text-muted-foreground leading-relaxed text-lg">
              {service.detailedContent}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">What's Included</h2>
          <ul className="list-disc space-y-2 inline-block text-left">
            {service.features.map((feature, index) => (
              <li key={index} className="text-base font-medium text-foreground">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        {service.benefits && service.benefits.length > 0 && (
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Key Benefits</h2>
            <ul className="list-disc space-y-2 inline-block text-left">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="text-base text-muted-foreground">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Process Steps */}
        {service.processSteps && service.processSteps.length > 0 && (
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">How It Works</h2>
            <ol className="list-decimal space-y-2 inline-block text-left">
              {service.processSteps.map((step, index) => (
                <li key={index} className="text-base text-foreground">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

          {/* Contact Form at the bottom */}
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get Started Today</CardTitle>
                <CardDescription>
                  Request a free consultation for {service.title.toLowerCase()} services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Company/Practice</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Your practice name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="consultation">Request Consultation</option>
                      <option value="services">Service Information</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="support">Customer Support</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={6}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      placeholder="Tell us about your needs, current challenges, or any questions you have..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={formLoading}>
                    {formLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
                <Separator />
                <div className="flex flex-wrap gap-6 justify-center mt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-3" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-3" />
                    <span>info@medibilling.com</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-3" />
                    <span>24/7 Support Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      
    </div>
  );
}