
import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Bug, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Layout from "../components/Layout";
import GoogleMap from "../components/GoogleMap";
import SocialMediaButtons from "../components/SocialMediaButtons";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "support@campusconnect.edu",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 98765 43210",
      description: "Mon-Fri 9:00 AM - 6:00 PM"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "IIM Rohtak, Haryana",
      description: "Visit us on campus"
    }
  ];

  const subjectOptions = [
    { value: "bug", label: "Bug Report", icon: Bug },
    { value: "feedback", label: "Feedback", icon: MessageCircle },
    { value: "partnership", label: "Partnership", icon: Users },
    { value: "other", label: "Other", icon: Mail }
  ];

  const faqs = [
    {
      question: "How do I upload resources?",
      answer: "Navigate to the Resources page and click the 'Upload Resource' button. Make sure your file meets our guidelines for size and format."
    },
    {
      question: "Can I connect with students from other campuses?",
      answer: "Currently, Campus Connect is focused on IIM Rohtak, but we plan to expand to other campuses in the future."
    },
    {
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password?' on the login page and follow the instructions sent to your email address."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take privacy seriously. Your personal information is encrypted and never shared with third parties without your consent."
    }
  ];

  return (
    <Layout>
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from you. 
            Your input helps us make Campus Connect better for everyone.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center text-foreground">
                  <Send className="h-6 w-6 mr-2 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={errors.name ? "border-destructive" : ""}
                        required
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">College Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@college.edu"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                        required
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(value) => handleInputChange("subject", value)}
                      required
                    >
                      <SelectTrigger className={errors.subject ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select a subject..." />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center">
                              <option.icon className="h-4 w-4 mr-2" />
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={errors.message ? "border-destructive" : ""}
                      maxLength={500}
                      required
                    />
                    <div className="flex justify-between items-center">
                      {errors.message ? (
                        <p className="text-sm text-destructive">{errors.message}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {formData.message.length}/500 characters
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & FAQ */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <info.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-foreground">{info.value}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-muted-foreground mb-4">
                    Stay connected with us on social media for updates and news.
                  </p>
                  <SocialMediaButtons />
                </div>
              </CardContent>
            </Card>

            {/* Quick FAQ */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Quick FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.slice(0, 3).map((faq, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0">
                    <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All FAQs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Google Map */}
        <section className="mt-12 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Find Us</h2>
            <p className="text-muted-foreground">Located at IIM Rohtak campus</p>
          </div>
          <GoogleMap className="rounded-lg shadow-lg" height="350px" />
        </section>

        {/* Response Time */}
        <section className="mt-12">
          <Card className="glass border border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-center text-center">
                <CheckCircle className="h-8 w-8 text-primary mr-3" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Quick Response Guarantee</h3>
                  <p className="text-muted-foreground">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </Layout>
  );
};

export default Contact;
