import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-medical.jpg';

const Index = () => {
  const features = [
    {
      icon: CheckCircle,
      title: 'Accurate Coding',
      description: 'ICD-10, CPT, and HCPCS coding with 99%+ accuracy rates'
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: 'Claims processed within 24-48 hours of submission'
    },
    {
      icon: Award,
      title: 'Compliance Assured',
      description: 'HIPAA compliant with latest industry standards'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Certified professionals with years of experience'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Family Practice',
      content: 'MediBilling Pro transformed our revenue cycle. Claims are processed faster and our denial rate dropped significantly.'
    },
    {
      name: 'James Thompson',
      role: 'Practice Manager',
      content: 'Outstanding service and attention to detail. They handle our billing so we can focus on patient care.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-primary to-secondary py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge variant="secondary" className="mb-4">
                Trusted by 500+ Healthcare Providers
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Professional Medical Billing Services
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Maximize your revenue with our expert medical billing, coding, and revenue cycle management services. 
                Let us handle the complexity while you focus on patient care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/services">
                    Book Consultation <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white hover:text-primary">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Medical billing professionals" 
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MediBilling Pro?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We deliver results that matter to your practice's bottom line
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader className="text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Services</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive medical billing solutions tailored to your practice
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Medical Coding</CardTitle>
                <CardDescription>
                  Accurate ICD-10, CPT, and HCPCS coding services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Diagnosis & Procedure Coding</li>
                  <li>• Modifier Application</li>
                  <li>• Coding Audits & Reviews</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Claims Processing</CardTitle>
                <CardDescription>
                  End-to-end claims management and submission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Electronic Claims Submission</li>
                  <li>• Denial Management</li>
                  <li>• Payment Posting</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Revenue Cycle Management</CardTitle>
                <CardDescription>
                  Complete RCM optimization and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Patient Registration</li>
                  <li>• Insurance Verification</li>
                  <li>• Collections Management</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <p className="text-lg mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Optimize Your Revenue Cycle?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of healthcare providers who trust us with their medical billing needs.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
