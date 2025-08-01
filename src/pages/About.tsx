import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Users, Target, Heart } from 'lucide-react';
import { getTeamMembers } from '@/lib/supabaseServices';
import { type TeamMember } from '@/lib/localStorage';
import { getImageSource } from '@/lib/utils';
import teamMember1 from '@/assets/team-member-1.jpg';
import teamMember2 from '@/assets/team-member-2.jpg';

export default function About() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const loadTeamMembers = async () => {
      const members = await getTeamMembers();
      setTeamMembers(members);
    };
    loadTeamMembers();
  }, []);

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in medical billing accuracy and compliance.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Transparent practices and honest communication in all our client relationships.'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Focused on maximizing your revenue and minimizing administrative burden.'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We work as an extension of your team, dedicated to your success.'
    }
  ];

  const getTeamImage = (index: number) => {
    const images = [teamMember1, teamMember2];
    return images[index % images.length];
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-4">
              About BillFill RCM
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About BillFill RCM</h1>
            <p className="text-xl leading-relaxed text-white/90">
              For over a decade, we've been helping healthcare providers optimize their revenue cycles 
              with professional, accurate, and compliant medical billing services.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2014, BillFill RCM emerged from a simple observation: healthcare providers 
                    were spending too much time on administrative tasks and not enough time caring for patients.
                  </p>
                  <p>
                    Our founders, experienced medical billing professionals, recognized the need for a service 
                    that could handle the complexities of medical billing while maintaining the highest standards 
                    of accuracy and compliance.
                  </p>
                  <p>
                    Today, we serve over 500 healthcare providers across the country, processing millions of 
                    dollars in claims annually while maintaining industry-leading accuracy rates.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Healthcare Providers</div>
                </div>
                <div className="text-center p-6 bg-secondary/5 rounded-lg">
                  <div className="text-3xl font-bold text-secondary mb-2">99%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">$50M+</div>
                  <div className="text-sm text-muted-foreground">Claims Processed</div>
                </div>
                <div className="text-center p-6 bg-secondary/5 rounded-lg">
                  <div className="text-3xl font-bold text-secondary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={getImageSource(member.image, getTeamImage(index))} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-semibold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                {member.bio && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help optimize your revenue cycle and improve your practice's financial performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">
                Schedule Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-black border-white hover:bg-white hover:text-primary dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-primary">
              <Link to="/services">
                View Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}