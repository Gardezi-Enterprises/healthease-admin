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
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const { toast } = useToast();

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
    setServices(getServices());
    setJobs(getJobs());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication (in production, use proper auth)
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin-logged-in', 'true');
      loadData();
      toast({
        title: "Login Successful",
        description: "Welcome to the admin portal!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-logged-in');
    setLoginForm({ username: '', password: '' });
  };

  const handleSaveTeam = (member: TeamMember) => {
    const updated = teamMembers.find(t => t.id === member.id)
      ? teamMembers.map(t => t.id === member.id ? member : t)
      : [...teamMembers, { ...member, id: Date.now().toString() }];
    
    setTeamMembers(updated);
    saveTeamMembers(updated);
    setEditingTeam(null);
    toast({ title: "Team member saved successfully!" });
  };

  const handleDeleteTeam = (id: string) => {
    const updated = teamMembers.filter(t => t.id !== id);
    setTeamMembers(updated);
    saveTeamMembers(updated);
    toast({ title: "Team member deleted successfully!" });
  };

  const handleSaveService = (service: Service) => {
    const updated = services.find(s => s.id === service.id)
      ? services.map(s => s.id === service.id ? service : s)
      : [...services, { ...service, id: Date.now().toString() }];
    
    setServices(updated);
    saveServices(updated);
    setEditingService(null);
    toast({ title: "Service saved successfully!" });
  };

  const handleDeleteService = (id: string) => {
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    saveServices(updated);
    toast({ title: "Service deleted successfully!" });
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
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  placeholder="admin"
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
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="mt-4 text-xs text-muted-foreground text-center">
              Demo credentials: admin / admin123
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
                  </CardHeader>
                  {member.bio && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  )}
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
                  <Button onClick={() => setEditingService({ id: '', title: '', description: '', features: [], benefits: [] })}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
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
                          <DialogContent className="max-w-2xl">
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
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <Button type="submit" className="w-full">Save</Button>
    </form>
  );
}

function ServiceForm({ service, onSave }: { service: Service | null, onSave: (service: Service) => void }) {
  const [formData, setFormData] = useState(service || { 
    id: '', title: '', description: '', features: [], benefits: [] 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <Label htmlFor="features">Features (one per line)</Label>
        <Textarea
          id="features"
          value={formData.features.join('\n')}
          onChange={(e) => setFormData({...formData, features: e.target.value.split('\n').filter(f => f.trim())})}
          rows={5}
          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
        />
      </div>
      <div>
        <Label htmlFor="benefits">Benefits (one per line)</Label>
        <Textarea
          id="benefits"
          value={formData.benefits?.join('\n') || ''}
          onChange={(e) => setFormData({...formData, benefits: e.target.value.split('\n').filter(b => b.trim())})}
          rows={4}
          placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
        />
      </div>
      <Button type="submit" className="w-full">Save</Button>
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