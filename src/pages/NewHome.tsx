import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, Users, TrendingUp, Download, Eye, Clock, User, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "../components/Layout";
import { useAuth } from "../App";

const Home = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "Student";

  const quickActions = [
    {
      title: "Find Resources",
      description: "Browse study materials and notes",
      icon: BookOpen,
      href: "/resources",
      gradient: "from-blue-500 to-blue-600",
      color: "text-blue-600",
    },
    {
      title: "Browse Events",
      description: "Discover campus events and activities",
      icon: Calendar,
      href: "/events",
      gradient: "from-emerald-500 to-emerald-600",
      color: "text-emerald-600",
    },
    {
      title: "Find Peers",
      description: "Connect with fellow students",
      icon: Users,
      href: "/matching",
      gradient: "from-purple-500 to-purple-600",
      color: "text-purple-600",
    },
  ];

  const recentActivity = [
    {
      type: "resource",
      title: "Financial Management Notes - Semester 1",
      author: "Sarah Johnson",
      time: "2 hours ago",
      views: 234,
      downloads: 45,
    },
    {
      type: "event",
      title: "Tech Talk: AI in Business",
      author: "Computer Science Club",
      time: "4 hours ago",
      date: "Dec 15, 2024",
    },
    {
      type: "student",
      title: "New Student: Mike Chen joined",
      author: "Marketing - Batch 2024",
      time: "6 hours ago",
    },
    {
      type: "resource",
      title: "Marketing Strategy Case Studies",
      author: "Prof. David Miller",
      time: "1 day ago",
      views: 189,
      downloads: 67,
    },
  ];

  const stats = [
    { label: "Resources Shared", value: "1,234", icon: BookOpen, color: "text-blue-600" },
    { label: "Events This Month", value: "28", icon: Calendar, color: "text-emerald-600" },
    { label: "Active Students", value: "456", icon: Users, color: "text-purple-600" },
    { label: "Downloads Today", value: "89", icon: Download, color: "text-orange-600" },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section with Gradient Background */}
        <div className="relative bg-gradient-hero text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 mr-3 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-bold animate-fade-in">
                Hello, {firstName}! 👋
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in mb-8">
              What amazing things will you discover today?
            </p>
            <Button size="lg" variant="secondary" className="animate-scale-in font-semibold">
              Explore Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="glass glass-hover border-0 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-white/20 to-white/10 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href} className="group">
                  <Card className="h-full glass glass-hover border-0 overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Recent Activity</h2>
              <Button variant="outline" className="glass-hover">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <Card key={index} className="glass glass-hover border-0 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {item.type === "resource" && (
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                        )}
                        {item.type === "event" && (
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-white" />
                          </div>
                        )}
                        {item.type === "student" && (
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-muted-foreground mb-3">{item.author}</p>
                        
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-2" />
                            {item.time}
                          </div>
                          
                          {item.views && (
                            <div className="flex items-center text-muted-foreground">
                              <Eye className="h-4 w-4 mr-2" />
                              {item.views} views
                            </div>
                          )}
                          
                          {item.downloads && (
                            <div className="flex items-center text-muted-foreground">
                              <Download className="h-4 w-4 mr-2" />
                              {item.downloads} downloads
                            </div>
                          )}
                          
                          {item.date && (
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2" />
                              {item.date}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button size="sm" variant="outline" className="glass-hover">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;