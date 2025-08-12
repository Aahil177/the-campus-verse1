import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Search, Grid, List, Heart, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Layout from "../components/Layout";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [likedEvents, setLikedEvents] = useState<number[]>([]);

  const events = [
    {
      id: 1,
      title: "Spring Music Festival",
      description: "Annual spring music festival with student bands, local artists, and food stalls.",
      date: "2025-03-22",
      time: "18:00",
      venue: "Campus Quad",
      category: "Cultural",
      club: "Riwaayat Club",
      attendees: 800,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
      organizer: {
        name: "Riwaayat Cultural Committee",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
      },
      views: 1250,
      downloads: 340,
      rating: 4.8
    },
    {
      id: 2,
      title: "Dance Night",
      description: "Showcase of campus dance crews and performances.",
      date: "2025-04-10",
      time: "19:00",
      venue: "Main Auditorium",
      category: "Cultural",
      club: "Riwaayat Club",
      attendees: 500,
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=400&fit=crop",
      organizer: {
        name: "Dance Society",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=32&h=32&fit=crop&crop=face"
      },
      views: 890,
      downloads: 210,
      rating: 4.6
    },
    {
      id: 3,
      title: "Basketball Championship Finals",
      description: "Championship finals between our Eagles and the State University Lions.",
      date: "2025-03-20",
      time: "19:30",
      venue: "Sports Center",
      category: "Sports",
      club: "Athlos Club",
      attendees: 1200,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop",
      organizer: {
        name: "Sports Committee",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
      },
      views: 2100,
      downloads: 450,
      rating: 4.9
    },
    {
      id: 4,
      title: "Athletics Meet 2025",
      description: "Track and field competitions for students across departments.",
      date: "2025-04-05",
      time: "09:00",
      venue: "Athletics Ground",
      category: "Sports",
      club: "Athlos Club",
      attendees: 900,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      organizer: {
        name: "Athletics Department",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
      },
      views: 1560,
      downloads: 320,
      rating: 4.5
    },
    {
      id: 5,
      title: "Poetry Slam Night",
      description: "Open mic poetry competition for budding writers.",
      date: "2025-03-28",
      time: "17:00",
      venue: "Literary Hall",
      category: "Literature",
      club: "Literati Club",
      attendees: 150,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      organizer: {
        name: "Literary Society",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face"
      },
      views: 780,
      downloads: 180,
      rating: 4.7
    },
    {
      id: 6,
      title: "Debate Championship",
      description: "Inter-college debate competition on current affairs.",
      date: "2025-04-02",
      time: "15:00",
      venue: "Seminar Room 4",
      category: "Literature",
      club: "Literati Club",
      attendees: 100,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      organizer: {
        name: "Debate Society",
        avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=32&h=32&fit=crop&crop=face"
      },
      views: 650,
      downloads: 140,
      rating: 4.4
    },
    {
      id: 7,
      title: "Tech Career Fair 2025",
      description: "Connect with top tech companies and explore internship & job opportunities.",
      date: "2025-03-15",
      time: "10:00",
      venue: "Main Auditorium",
      category: "Academic & Career",
      club: "Internship Committee",
      attendees: 450,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
      organizer: {
        name: "Career Services",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
      },
      views: 1890,
      downloads: 560,
      rating: 4.8
    },
    {
      id: 8,
      title: "Entrepreneurship Workshop",
      description: "Learn the basics of starting your own business from alumni entrepreneurs.",
      date: "2025-03-30",
      time: "13:00",
      venue: "Business Building",
      category: "Academic & Career",
      club: "Student Council",
      attendees: 90,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
      organizer: {
        name: "Entrepreneurship Cell",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
      },
      views: 1120,
      downloads: 280,
      rating: 4.6
    }
  ];

  const categories = ["All Events", "Cultural", "Sports", "Literature", "Academic & Career"];

  const toggleLike = (eventId: number) => {
    setLikedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Cultural": return "bg-cultural/10 text-cultural border-cultural/20";
      case "Sports": return "bg-sports/10 text-sports border-sports/20";
      case "Literature": return "bg-literature/10 text-literature border-literature/20";
      case "Academic & Career": return "bg-academic/10 text-academic border-academic/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Cultural": return "🎭";
      case "Sports": return "⚽";
      case "Literature": return "📚";
      case "Academic & Career": return "💼";
      default: return "📅";
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "All Events" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.views - a.views;
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "rating":
        return b.rating - a.rating;
      case "attendees":
        return b.attendees - a.attendees;
      default:
        return 0;
    }
  });

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Header with Gradient */}
        <div className="relative bg-gradient-hero text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-90 animate-gradient-shift bg-[length:200%_200%]"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
              Campus Events
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in">
              Stay updated with the latest events, workshops, and activities on campus
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-scale-in">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`${
                      selectedCategory === category 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-primary/10"
                    } transition-all duration-200`}
                  >
                    {getCategoryIcon(category)} {category}
                  </Button>
                ))}
              </div>

              {/* View Toggle and Sort */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="attendees">Most Attended</option>
                </select>
                
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid/List */}
          <div className={`${
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-6"
          }`}>
            {sortedEvents.map((event, index) => (
              <Card 
                key={event.id} 
                className={`group hover:shadow-xl transition-all duration-300 animate-fade-in overflow-hidden ${
                  viewMode === "list" ? "flex flex-row" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Event Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === "list" ? "w-48 flex-shrink-0" : "h-48"
                }`}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Date Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold text-primary">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>

                  {/* Like and Report buttons */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white ${
                        likedEvents.includes(event.id) ? "text-red-500" : "text-muted-foreground"
                      }`}
                      onClick={() => toggleLike(event.id)}
                    >
                      <Heart className={`h-4 w-4 ${likedEvents.includes(event.id) ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white text-muted-foreground"
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{event.views} views</span>
                        <span>⭐ {event.rating}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </CardTitle>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        <span>
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })} at {event.time}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        <span>{event.venue}</span>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>

                    {/* Organizer */}
                    <div className="flex items-center gap-2 mb-4">
                      <img 
                        src={event.organizer.avatar} 
                        alt={event.organizer.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs text-muted-foreground">
                        Organized by {event.organizer.name}
                      </span>
                    </div>

                    {/* Register Button */}
                    <Button 
                      className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold"
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* No Events Found */}
          {sortedEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Events;