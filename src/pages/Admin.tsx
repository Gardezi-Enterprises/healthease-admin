import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Settings, 
  Briefcase, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  LogOut,
  Shield,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';
import {
  loadAdminData,
  saveAdminData,
  getTeamMembers,
  saveTeamMembers,
  getServices,
  saveServices,
  getJobs,
  saveJobs,
  type TeamMember,
  type Service,
  type Job
} from '@/lib/localStorage';
import { getImageSource } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useServices } from '@/contexts/ServicesContext';
import { AdvancedTextEditor } from '@/components/AdvancedTextEditor';


export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const { toast } = useToast();
  const { services, updateServices } = useServices();

  useEffect(() => {
    // Check if already logged in
    const loggedIn = localStorage.getItem('admin-logged-in');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setTeamMembers(getTeamMembers());
    setJobs(getJobs());
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Get user from database by email
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', loginForm.email)
        .single();

      // Debug output
      console.log('Supabase fetch result:', { data, error });

      if (error || !data) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return;
      }

      // Debug output before bcrypt
      console.log('About to compare password:', {
        entered: loginForm.password,
        hash: data.password_hash
      });
      let isPasswordValid = false;
      try {
        isPasswordValid = await bcrypt.compare(loginForm.password, data.password_hash);
        console.log('Password comparison result:', isPasswordValid);
      } catch (err) {
        console.log('Error during bcrypt.compare:', err);
      }
      
      if (!isPasswordValid) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return;
      }

      setIsAuthenticated(true);
      localStorage.setItem('admin-logged-in', 'true');
      loadData();
      toast({
        title: "Login Successful",
        description: "Welcome to the admin portal!",
      });
    } catch (error) {
      // Debug output
      console.log('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-logged-in');
    setLoginForm({ email: '', password: '' });
  };

  const handleSaveTeam = async (member: TeamMember) => {
    const updated = teamMembers.find(t => t.id === member.id)
      ? teamMembers.map(t => t.id === member.id ? member : t)
      : [...teamMembers, { ...member, id: Date.now().toString() }];
    
    setTeamMembers(updated);
    await saveTeamMembers(updated);
    setEditingTeam(null);
    toast({ title: "Team member saved successfully!" });
  };

  const handleDeleteTeam = async (id: string) => {
    const updated = teamMembers.filter(t => t.id !== id);
    setTeamMembers(updated);
    await saveTeamMembers(updated);
    toast({ title: "Team member deleted successfully!" });
  };

  const handleSaveService = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .upsert(service);

      if (error) {
        toast({ title: "Failed to save service", description: error.message, variant: "destructive" });
      } else {
        const { data } = await supabase.from('services').select('*');
        if (data) {
          updateServices(data);
          setEditingService(null);
          toast({ title: "Service saved successfully!" });
        }
      }
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while saving the service.", variant: "destructive" });
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) {
        toast({ title: "Failed to delete service", description: error.message, variant: "destructive" });
      } else {
        const { data } = await supabase.from('services').select('*');
        if (data) {
          updateServices(data);
          toast({ title: "Service deleted successfully!" });
        }
      }
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while deleting the service.", variant: "destructive" });
    }
  };

  const handleSaveJob = (job: Job) => {
    const updated = jobs.find(j => j.id === job.id)
      ? jobs.map(j => j.id === job.id ? job : j)
      : [...jobs, { ...job, id: Date.now().toString(), postedDate: new Date().toISOString().split('T')[0] }];
    
    setJobs(updated);
    saveJobs(updated);
    setEditingJob(null);
    toast({ title: "Job saved successfully!" });
  };

  const handleDeleteJob = (id: string) => {
    const updated = jobs.filter(j => j.id !== id);
    setJobs(updated);
    saveJobs(updated);
    toast({ title: "Job deleted successfully!" });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Portal</CardTitle>
            <CardDescription>
              Please log in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  placeholder="admin@medicalbilling.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  placeholder="admin123"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <div className="mt-4 text-xs text-muted-foreground text-center">
              Demo credentials: admin@medicalbilling.com / adminpass@123
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Admin Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <a href="/" target="_blank" rel="noopener">
                <Eye className="h-4 w-4 mr-2" />
                View Site
              </a>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="team" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="team" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Jobs
            </TabsTrigger>
          </TabsList>

          {/* Team Management */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Team Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingTeam({ id: '', name: '', role: '', bio: '', image: '' })}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                    <DialogDescription>
                      Add a new team member to display on the About page.
                    </DialogDescription>
                  </DialogHeader>
                  <TeamMemberForm member={editingTeam} onSave={handleSaveTeam} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id}>
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      {member.image && (
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={getImageSource(member.image)} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <CardTitle className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                          <div className="flex space-x-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setEditingTeam(member)}>
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Team Member</DialogTitle>
                                </DialogHeader>
                                <TeamMemberForm member={editingTeam} onSave={handleSaveTeam} />
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="outline" onClick={() => handleDeleteTeam(member.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardTitle>
                        {member.bio && (
                          <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Services Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingService({ id: '', title: '', description: '', details: '', detailedTitle: '', detailedDescription: '', detailedContent: '', processSteps: [], features: [], benefits: [] })}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add Service</DialogTitle>
                    <DialogDescription>
                      Add a new service to display on the Services page.
                    </DialogDescription>
                  </DialogHeader>
                  <ServiceForm service={editingService} onSave={handleSaveService} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                      <div className="flex space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setEditingService(service)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Service</DialogTitle>
                            </DialogHeader>
                            <ServiceForm service={editingService} onSave={handleSaveService} />
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteService(service.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline">{feature}</Badge>
                      ))}
                      {service.features.length > 3 && (
                        <Badge variant="outline">+{service.features.length - 3} more</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Jobs Management */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Jobs Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingJob({ 
                    id: '', title: '', department: '', type: '', location: '', 
                    description: '', requirements: [], postedDate: '' 
                  })}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add Job</DialogTitle>
                    <DialogDescription>
                      Add a new job posting to display on the Careers page.
                    </DialogDescription>
                  </DialogHeader>
                  <JobForm job={editingJob} onSave={handleSaveJob} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {job.title}
                          <Badge variant="outline">{job.type}</Badge>
                        </CardTitle>
                        <CardDescription>
                          {job.department} • {job.location} • Posted {new Date(job.postedDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setEditingJob(job)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Job</DialogTitle>
                            </DialogHeader>
                            <JobForm job={editingJob} onSave={handleSaveJob} />
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteJob(job.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.slice(0, 2).map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{req}</Badge>
                      ))}
                      {job.requirements.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{job.requirements.length - 2} more</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function TeamMemberForm({ member, onSave }: { member: TeamMember | null, onSave: (member: TeamMember) => void }) {
  const [formData, setFormData] = useState(member || { id: '', name: '', role: '', bio: '', image: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Input
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          required
        />
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="image">Profile Image</Label>
        
        {/* Current Image Preview */}
        {formData.image && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Current Image:</p>
            <div className="relative inline-block">
              <img 
                src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image} 
                alt="Preview" 
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={() => setFormData({...formData, image: null})}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        {/* File Upload Area */}
        <div className="border-2 border-dashed border-input rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              // When a new file is selected, it completely replaces the old image
              setFormData({...formData, image: file || null});
            }}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">
                  {formData.image ? 'Click to change image' : 'Click to upload image'}
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG, or GIF (max 5MB)
                </p>
              </div>
            </div>
          </label>
        </div>
        
        {/* File Selection Feedback */}
        {formData.image instanceof File && (
          <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            New file selected: {formData.image.name}
          </div>
        )}
      </div>
      <Button type="submit" className="w-full">Save</Button>
    </form>
  );
}

function ServiceForm({ service, onSave }: { service: Service | null, onSave: (service: Service) => void }) {
  const [formData, setFormData] = useState(service || { 
    id: '', title: '', description: '', details: '', detailedTitle: '', detailedDescription: '', detailedContent: '', processSteps: [], features: [], benefits: [] 
  });

  // Dynamic handlers for features, benefits, processSteps
  const handleArrayChange = (field: 'features' | 'benefits' | 'processSteps', idx: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) => i === idx ? value : item)
    }));
  };
  const handleAddItem = (field: 'features' | 'benefits' | 'processSteps') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
  const handleRemoveItem = (field: 'features' | 'benefits' | 'processSteps', idx: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_: string, i: number) => i !== idx)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <div>
        <Label htmlFor="title">Service Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={3}
          required
        />
      </div>
      <div>
        <AdvancedTextEditor
          value={formData.details || ''}
          onChange={(value) => setFormData({...formData, details: value})}
          label="Service Details"
          placeholder="Enter detailed information about the service here with advanced formatting options..."
          rows={8}
        />
      </div>
      
      <Separator />
      <div className="text-lg font-semibold">Detailed Page Content</div>
      
      <div>
        <Label htmlFor="detailedTitle">Detailed Page Title</Label>
        <Input
          id="detailedTitle"
          value={formData.detailedTitle || ''}
          onChange={(e) => setFormData({...formData, detailedTitle: e.target.value})}
          placeholder="Enter title for the detailed service page"
        />
      </div>
      <div>
        <Label htmlFor="detailedDescription">Detailed Page Description</Label>
        <Textarea
          id="detailedDescription"
          value={formData.detailedDescription || ''}
          onChange={(e) => setFormData({...formData, detailedDescription: e.target.value})}
          rows={3}
          placeholder="Enter detailed description for the service page"
        />
      </div>
      <div>
        <AdvancedTextEditor
          value={formData.detailedContent || ''}
          onChange={(value) => setFormData({...formData, detailedContent: value})}
          label="Detailed Content"
          placeholder="Enter comprehensive content about the service with advanced formatting options..."
          rows={10}
        />
      </div>
      <Separator />
      <div className="text-lg font-semibold">Features & Benefits</div>
      {/* Features */}
      <div>
        <Label>Features</Label>
        <div className="space-y-2">
          {formData.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input
                value={feature}
                onChange={e => handleArrayChange('features', idx, e.target.value)}
                placeholder={`Feature ${idx + 1}`}
                className="flex-1"
              />
              <Button type="button" size="icon" variant="ghost" onClick={() => handleRemoveItem('features', idx)} aria-label="Remove feature">
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => handleAddItem('features')}>
            <Plus className="w-4 h-4 mr-1" /> Add Feature
          </Button>
        </div>
      </div>
      {/* Benefits */}
      <div>
        <Label>Benefits</Label>
        <div className="space-y-2">
          {formData.benefits?.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input
                value={benefit}
                onChange={e => handleArrayChange('benefits', idx, e.target.value)}
                placeholder={`Benefit ${idx + 1}`}
                className="flex-1"
              />
              <Button type="button" size="icon" variant="ghost" onClick={() => handleRemoveItem('benefits', idx)} aria-label="Remove benefit">
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => handleAddItem('benefits')}>
            <Plus className="w-4 h-4 mr-1" /> Add Benefit
          </Button>
        </div>
      </div>
      {/* Process Steps */}
      <div>
        <Label>Process Steps</Label>
        <div className="space-y-2">
          {formData.processSteps?.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input
                value={step}
                onChange={e => handleArrayChange('processSteps', idx, e.target.value)}
                placeholder={`Step ${idx + 1}`}
                className="flex-1"
              />
              <Button type="button" size="icon" variant="ghost" onClick={() => handleRemoveItem('processSteps', idx)} aria-label="Remove step">
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => handleAddItem('processSteps')}>
            <Plus className="w-4 h-4 mr-1" /> Add Step
          </Button>
        </div>
      </div>
      <div className="pt-4">
        <Button type="submit" className="w-full">Save Service</Button>
      </div>
    </form>
  );
}

function JobForm({ job, onSave }: { job: Job | null, onSave: (job: Job) => void }) {
  const [formData, setFormData] = useState(job || { 
    id: '', title: '', department: '', type: '', location: '', 
    description: '', requirements: [], postedDate: '' 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            value={formData.department}
            onChange={(e) => setFormData({...formData, department: e.target.value})}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Job Type</Label>
          <Input
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            placeholder="Full-time, Part-time, Contract"
            required
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={4}
          required
        />
      </div>
      <div>
        <Label htmlFor="requirements">Requirements (one per line)</Label>
        <Textarea
          id="requirements"
          value={formData.requirements.join('\n')}
          onChange={(e) => setFormData({...formData, requirements: e.target.value.split('\n').filter(r => r.trim())})}
          rows={5}
          placeholder="Requirement 1&#10;Requirement 2&#10;Requirement 3"
        />
      </div>
      <Button type="submit" className="w-full">Save</Button>
    </form>
  );
}