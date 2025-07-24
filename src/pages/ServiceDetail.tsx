import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getServices, type Service } from '@/lib/localStorage';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

export default function ServiceDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practice: '',
    message: ''
  });

  useEffect(() => {
    const services = getServices();
    const foundService = services.find(s => s.id === id);
    setService(foundService || null);
  }, [id]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // EmailJS configuration would go here
      // For demo purposes, we'll simulate the email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Consultation Request Sent!",
        description: "We'll contact you within 24 hours to discuss your needs.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        practice: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
      </div>

      {/* Service Detail */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Badge variant="outline" className="mb-4">
                Service Details
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-8">
                {/* Features */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">What's Included</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardContent className="pt-4">
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                            <span className="text-sm font-medium">{feature}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                {service.benefits && service.benefits.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {service.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <Star className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Process */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">How It Works</h2>
                  <div className="space-y-4">
                    {[
                      'Initial consultation to understand your specific needs',
                      'Customized setup and integration with your existing systems',
                      'Ongoing service delivery with regular quality checks',
                      'Monthly reporting and performance optimization'
                    ].map((step, index) => (
                      <div key={index} className="flex items-center p-4 bg-muted/30 rounded-lg">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Contact Form */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Book Consultation</CardTitle>
                  <CardDescription>
                    Get a free consultation for {service.title.toLowerCase()} services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                      <label className="text-sm font-medium mb-2 block">Practice Name</label>
                      <input
                        type="text"
                        value={formData.practice}
                        onChange={(e) => setFormData({...formData, practice: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Your practice name"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder="Tell us about your needs..."
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Sending...' : 'Request Consultation'}
                    </Button>
                  </form>
                  
                  <Separator className="my-6" />
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Or call us directly:</p>
                    <p className="font-semibold text-foreground">(555) 123-4567</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}