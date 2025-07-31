import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Privacy() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-4">
              Legal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
              <CardDescription>
                Last updated: January 1, 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">
                    We collect information you provide directly to us, such as when you:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Request information about our services</li>
                    <li>Fill out contact forms or request consultations</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Apply for employment</li>
                    <li>Communicate with us via email or phone</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Respond to your inquiries and provide customer service</li>
                    <li>Send you information about our services</li>
                    <li>Process job applications</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
                  <p className="text-muted-foreground mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to 
                    outside parties except in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>With your explicit consent</li>
                    <li>To comply with legal requirements</li>
                    <li>To protect our rights and safety</li>
                    <li>With trusted service providers who assist us in operating our business</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">HIPAA Compliance</h2>
                  <p className="text-muted-foreground mb-4">
                    As a medical billing service provider, we are committed to maintaining the 
                    privacy and security of protected health information (PHI) in accordance 
                    with HIPAA regulations. We implement appropriate safeguards to protect 
                    PHI in all forms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                  <p className="text-muted-foreground mb-4">
                    We implement appropriate security measures to protect your personal 
                    information against unauthorized access, alteration, disclosure, or 
                    destruction. This includes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Encryption of sensitive data</li>
                    <li>Regular security assessments</li>
                    <li>Access controls and authentication</li>
                    <li>Employee training on privacy practices</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                  <p className="text-muted-foreground mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Access your personal information</li>
                    <li>Request corrections to your information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>File a complaint with regulatory authorities</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
                  <p className="text-muted-foreground mb-4">
                    Our website uses cookies to improve your experience. Cookies are small 
                    data files stored on your device that help us remember your preferences 
                    and understand how you use our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                  <p className="text-muted-foreground mb-4">
                    We may update this privacy policy from time to time. We will notify you 
                    of any changes by posting the new policy on this page and updating the 
                    "last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this privacy policy or our privacy 
                    practices, please contact us:
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="font-medium">BillFill RCM</p>
                    <p className="text-sm text-muted-foreground">123 Medical Plaza, Suite 100</p>
                    <p className="text-sm text-muted-foreground">Healthcare City, HC 12345</p>
                    <p className="text-sm text-muted-foreground">Email: privacy@billfillrcm.com</p>
                    <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}