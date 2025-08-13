
import { useState } from "react";
import { ChevronLeft, ChevronRight, Mail, Code, Smartphone, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "../components/Layout";
import GoogleMap from "../components/GoogleMap";
import SocialMediaButtons from "../components/SocialMediaButtons";
import aboutCampusImage from "../assets/about-campus.jpg";
import officeMapImage from "../assets/office-map.png";

const About = () => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const screenshots = [
    {
      title: "Dashboard Overview",
      description: "Clean, intuitive dashboard with quick actions and activity feed",
      image: aboutCampusImage
    },
    {
      title: "Resource Hub", 
      description: "Comprehensive search and filtering for academic resources",
      image: aboutCampusImage
    },
    {
      title: "Student Matching",
      description: "Connect with peers based on skills, interests, and goals",
      image: aboutCampusImage
    },
    {
      title: "Events Calendar",
      description: "Stay updated with campus events and announcements",
      image: aboutCampusImage
    }
  ];


  const teamMembers = [
    {
      name: "Built for IIM Rohtak",
      role: "Academic Excellence",
      bio: "Created specifically for the IIM Rohtak community to enhance student collaboration and learning.",
      avatar: aboutCampusImage,
      social: {
        linkedin: "#",
        email: "contact@campusconnect.edu"
      }
    }
  ];

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };


  return (
    <Layout>
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="mb-8">
            <img 
              src={aboutCampusImage} 
              alt="IIM Rohtak campus building with students"
              className="w-full h-64 object-cover rounded-lg shadow-lg mb-8"
            />
            <h1 className="text-4xl font-bold text-foreground mb-4">Campus Connect</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connecting students across campuses for better learning, collaboration, and growth. 
              Built for IIM Rohtak and beyond.
            </p>
          </div>
        </header>

        {/* Mission Statement */}
        <section className="mb-16">
          <Card className="glass border-none">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
                To create a unified platform where students can seamlessly share knowledge, 
                connect with peers, discover opportunities, and build meaningful relationships 
                that extend beyond their academic journey. We believe in the power of 
                collaboration and community-driven learning.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Screenshots Carousel */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Platform Overview</h2>
            <p className="text-lg text-muted-foreground">Explore our key features through these interactive screenshots</p>
          </div>
          
          <Card className="max-w-4xl mx-auto glass">
            <CardContent className="p-6">
              <div className="relative">
                <div className="rounded-lg aspect-video flex items-center justify-center mb-4 overflow-hidden">
                  <img 
                    src={screenshots[currentScreenshot].image}
                    alt={screenshots[currentScreenshot].description}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-semibold mb-2">
                        {screenshots[currentScreenshot].title}
                      </h3>
                      <p className="text-white/90">
                        {screenshots[currentScreenshot].description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={prevScreenshot} aria-label="Previous screenshot">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex space-x-2">
                    {screenshots.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentScreenshot ? "bg-primary" : "bg-muted"
                        }`}
                        onClick={() => setCurrentScreenshot(index)}
                        aria-label={`Go to screenshot ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <Button variant="outline" size="sm" onClick={nextScreenshot} aria-label="Next screenshot">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Office Map Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Office Layout</h2>
            <p className="text-lg text-muted-foreground">Visit us at our campus location</p>
          </div>
          
          <Card className="glass">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <img 
                    src={officeMapImage}
                    alt="Office layout map showing desk arrangements, meeting rooms, and common areas"
                    className="w-full rounded-lg shadow-sm"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Campus Connect Hub</h3>
                  <p className="text-muted-foreground mb-6">
                    Our dedicated space within the IIM Rohtak campus serves as the central hub for 
                    student collaboration, resource sharing, and community building. Drop by anytime 
                    to connect with our team or fellow students.
                  </p>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span>Student Help Desk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <span>Collaboration Spaces</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span>Resource Center</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Google Map Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Find Us</h2>
            <p className="text-lg text-muted-foreground">Located at IIM Rohtak campus</p>
          </div>
          <GoogleMap className="rounded-lg shadow-lg" height="400px" />
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Built for Excellence</h2>
            <p className="text-lg text-muted-foreground">Created with passion for the IIM Rohtak community</p>
          </div>
          
          <div className="max-w-md mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center glass">
                <CardContent className="p-8">
                  <img 
                    src={member.avatar}
                    alt="IIM Rohtak campus representing our team"
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground mb-6">{member.bio}</p>
                  
                  <SocialMediaButtons className="justify-center" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Summary */}
        <section className="mb-16">
          <Card className="glass border border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">What Makes Us Different</h2>
                <p className="text-xl text-muted-foreground">
                  Three core modules designed to enhance your academic journey
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Resource Hub</h3>
                  <p className="text-muted-foreground">Share and discover academic materials with intelligent search and filtering</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Events & Network</h3>
                  <p className="text-muted-foreground">Stay connected with campus activities and build meaningful relationships</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Smart Matching</h3>
                  <p className="text-muted-foreground">Connect with peers based on shared interests, skills, and academic goals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="glass">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Connect?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Join the Campus Connect community and start building meaningful connections today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </Layout>
  );
};

export default About;
