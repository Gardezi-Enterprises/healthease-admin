import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Terms() {
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
              Terms of Service
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              These terms govern your use of our services and website. 
              Please read them carefully.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
              <CardDescription>
                Last updated: January 1, 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    By accessing and using BillFill RCM's website and services, you accept 
                    and agree to be bound by the terms and provision of this agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Services Description</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    BillFill RCM provides medical billing, coding, and revenue cycle 
                    management services to healthcare providers. Our services include but 
                    are not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Medical coding (ICD-10, CPT, HCPCS)</li>
                    <li>Claims processing and submission</li>
                    <li>Revenue cycle management</li>
                    <li>Compliance consulting</li>
                    <li>Reporting and analytics</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Client Responsibilities</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Clients agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Provide accurate and complete patient information</li>
                    <li>Maintain current insurance verification processes</li>
                    <li>Comply with all applicable healthcare regulations</li>
                    <li>Pay fees according to the agreed-upon schedule</li>
                    <li>Notify us promptly of any changes to practice information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Payment terms are established in individual service agreements. 
                    Standard terms include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Monthly billing cycles</li>
                    <li>Net 30 payment terms</li>
                    <li>Late payment fees may apply</li>
                    <li>Services may be suspended for non-payment</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Confidentiality and HIPAA</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    We are committed to maintaining the confidentiality of all patient 
                    information and comply with HIPAA regulations. Both parties agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Maintain strict confidentiality of PHI</li>
                    <li>Implement appropriate safeguards</li>
                    <li>Report any security incidents immediately</li>
                    <li>Comply with all applicable privacy laws</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    BillFill RCM's liability is limited to the fees paid for services 
                    in the preceding 12 months. We are not liable for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Indirect or consequential damages</li>
                    <li>Claims denied due to inaccurate information provided</li>
                    <li>Changes in payer policies or regulations</li>
                    <li>System downtime beyond our control</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Termination</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Either party may terminate services with 30 days written notice. 
                    Upon termination:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>All outstanding claims will be processed</li>
                    <li>Final invoices will be issued</li>
                    <li>Client data will be returned or destroyed as requested</li>
                    <li>Confidentiality obligations continue indefinitely</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    All proprietary systems, processes, and materials remain the property 
                    of BillFill RCM. Clients retain ownership of their patient data 
                    and practice information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Dispute Resolution</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Any disputes will be resolved through binding arbitration in accordance 
                    with the rules of the American Arbitration Association.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    We may update these terms from time to time. Clients will be notified 
                    of significant changes with 30 days advance notice.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    For questions about these terms, please contact us:
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="font-medium">BillFill RCM</p>
                    <p className="text-sm text-muted-foreground">123 Medical Plaza, Suite 100</p>
                    <p className="text-sm text-muted-foreground">Healthcare City, HC 12345</p>
                    <p className="text-sm text-muted-foreground">Email: legal@billfillrcm.com</p>
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