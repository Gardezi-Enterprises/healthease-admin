import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useServices } from '@/contexts/ServicesContext';

export default function Services() {
  const { services } = useServices();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-4">
              Our Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Comprehensive Medical Billing Solutions
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              From coding to collections, we provide end-to-end revenue cycle management 
              services designed to maximize your practice's financial performance.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={service.id} className={`overflow-hidden hover:shadow-xl transition-shadow ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } lg:flex`}>
                <div className="lg:w-1/2 p-8">
                  <CardHeader className="px-0 pt-0">
                    <Badge variant="outline" className="w-fit mb-4">
                      Service {index + 1}
                    </Badge>
                    <CardTitle className="text-2xl md:text-3xl mb-4">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="px-0 pb-0">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button asChild className="mt-6">
                        <Link to={`/services/${service.id}`}>
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </div>
                
                <div className={`lg:w-1/2 bg-gradient-to-br ${
                  index % 2 === 0 
                    ? 'from-primary/10 to-secondary/10' 
                    : 'from-secondary/10 to-primary/10'
                } p-8 flex items-center justify-center min-h-[300px]`}>
                  <div className="text-center">
                    <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${
                      index % 2 === 0 
                        ? 'from-primary to-secondary' 
                        : 'from-secondary to-primary'
                    } flex items-center justify-center`}>
                      <span className="text-2xl font-bold text-white">
                        {service.title.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Professional {service.title.toLowerCase()} services
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A streamlined approach to medical billing that delivers results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: '01', title: 'Assessment', description: 'We analyze your current billing processes and identify optimization opportunities.' },
              { step: '02', title: 'Setup', description: 'Quick onboarding with seamless integration into your existing workflow.' },
              { step: '03', title: 'Processing', description: 'Expert coding, claim submission, and follow-up using best practices.' },
              { step: '04', title: 'Reporting', description: 'Regular reports and analytics to track performance and revenue growth.' }
            ].map((item, index) => (
              <Card key={index} className="text-center border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
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
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to discuss your medical billing needs and learn how we can help optimize your revenue cycle.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">
              Book Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}