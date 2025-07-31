import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, Star, Phone, Mail, Clock, Users, Shield, Zap, Target, FileText, MessageSquare, BookOpen, Award, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useServices } from '@/contexts/ServicesContext';
import { useToast } from '@/hooks/use-toast';
import type { Service } from '@/lib/localStorage';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { services } = useServices();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadService = () => {
      try {
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
  }, [id, services]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Message Sent Successfully!",
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

  const getRelatedServices = () => {
    if (!service) return [];
    return services.filter(s => s.id !== service.id).slice(0, 3);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Target className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Loading Service Details</h3>
            <p className="text-muted-foreground">Preparing comprehensive information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center space-y-6 max-w-md">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Service Not Found</h1>
            <p className="text-muted-foreground">The service you're looking for doesn't exist or has been moved.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse All Services
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const relatedServices = getRelatedServices();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-b">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative container mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" asChild className="hover:bg-background/80">
              <Link to="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </Button>
          </div>
          <div className="max-w-5xl mx-auto text-center space-y-6 px-4">
            <div className="flex justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                {service.title}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight break-words">
              {service.detailedTitle || service.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              {service.detailedDescription || service.description}
            </p>
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>500+ Clients Served</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4" />
                <span>99.8% Accuracy Rate</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>24hr Turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Content Area */}
          <div className="space-y-8">
            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="process">Process</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-8">
                {/* Service Summary */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {service.title} Overview
                    </CardTitle>
                    <CardDescription className="text-lg text-muted-foreground max-w-3xl mx-auto">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Key Highlights */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="text-center p-6 hover:shadow-md transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
                    <div className="w-12 h-12 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Compliance & Security</h3>
                    <p className="text-sm text-muted-foreground">HIPAA-compliant processes with enterprise-grade security</p>
                  </Card>
                  
                  <Card className="text-center p-6 hover:shadow-md transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20">
                    <div className="w-12 h-12 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Fast Turnaround</h3>
                    <p className="text-sm text-muted-foreground">24-48 hour processing with real-time status updates</p>
                  </Card>
                  
                  <Card className="text-center p-6 hover:shadow-md transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20">
                    <div className="w-12 h-12 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Expert Team</h3>
                    <p className="text-sm text-muted-foreground">Certified professionals with 10+ years average experience</p>
                  </Card>
                </div>

                {/* Service Details */}
                {service.details && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-primary-foreground" />
                        </div>
                        Service Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="advanced-text-content text-foreground leading-relaxed text-base"
                        dangerouslySetInnerHTML={{ __html: service.details }}
                        style={{
                          lineHeight: '1.6',
                          fontSize: '16px'
                        }}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Comprehensive Information */}
                {service.detailedContent && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-secondary-foreground" />
                        </div>
                        Comprehensive Information
                      </CardTitle>
                      <CardDescription className="text-base">
                        Detailed breakdown of our {service.title.toLowerCase()} service
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="advanced-text-content text-foreground leading-relaxed text-base"
                        dangerouslySetInnerHTML={{ __html: service.detailedContent }}
                        style={{
                          lineHeight: '1.6',
                          fontSize: '16px'
                        }}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Service Statistics */}
                <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">Why Choose Our {service.title} Service?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6 text-center">
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">99.8%</div>
                        <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">24hr</div>
                        <div className="text-sm text-muted-foreground">Average Turnaround</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">500+</div>
                        <div className="text-sm text-muted-foreground">Happy Clients</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">10+</div>
                        <div className="text-sm text-muted-foreground">Years Experience</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="features" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      What's Included
                    </CardTitle>
                    <CardDescription>
                      Comprehensive features and capabilities included in this service
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="process" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      How It Works
                    </CardTitle>
                    <CardDescription>
                      Our streamlined process ensures efficiency and accuracy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {service.processSteps && (
                      <div className="space-y-6">
                        {service.processSteps.map((step, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              {index < service.processSteps!.length - 1 && (
                                <div className="w-0.5 h-12 bg-border mt-2" />
                              )}
                            </div>
                            <div className="flex-1 pb-6">
                              <h4 className="font-semibold mb-2">{step}</h4>
                              <Progress value={((index + 1) / service.processSteps!.length) * 100} className="w-full" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="benefits" className="space-y-6">
                {service.benefits && service.benefits.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Key Benefits
                      </CardTitle>
                      <CardDescription>
                        Discover the advantages of choosing our service
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {service.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                            <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
            {/* Related Services */}
            {relatedServices.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Related Services</CardTitle>
                  <CardDescription>Explore other services that might interest you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {relatedServices.map((relatedService) => (
                      <Link key={relatedService.id} to={`/services/${relatedService.id}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">{relatedService.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {relatedService.description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Get Started Today Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge variant="secondary" className="w-fit">
                    Get Started Today
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Ready to Optimize Your {service.title}?
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Join hundreds of healthcare providers who trust us with their medical billing needs. 
                    Get a free consultation and discover how our {service.title.toLowerCase()} service can 
                    transform your revenue cycle.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Free Consultation</p>
                      <p className="text-sm text-muted-foreground">No obligation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Secure & Confidential</p>
                      <p className="text-sm text-muted-foreground">HIPAA compliant</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Quick Setup</p>
                      <p className="text-sm text-muted-foreground">24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Expert Team</p>
                      <p className="text-sm text-muted-foreground">10+ years experience</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="shadow-xl border-0">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-xl">
                    <MessageSquare className="h-5 w-5" />
                    Request Free Consultation
                  </CardTitle>
                  <CardDescription>
                    Get started with our {service.title.toLowerCase()} service today
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
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
                          className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject *</label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="consultation">Request Consultation</option>
                        <option value="services">Service Information</option>
                        <option value="general">General Inquiry</option>
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
                        rows={4}
                        className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us about your needs and how we can help..."
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={formLoading}>
                      {formLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        'Request Free Consultation'
                      )}
                    </Button>
                  </form>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-3" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 mr-3" />
                      <span>info@billfillrcm.com</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-3" />
                      <span>24/7 Support Available</span>
                    </div>
                  </div>
                  
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Your information is secure and will only be used to contact you about our services.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}