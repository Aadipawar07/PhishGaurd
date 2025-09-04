import React, { useState } from 'react';
import { ArrowRight, Check, Shield, AlertCircle } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export const Monitor = () => {
  const [autoMonitoring, setAutoMonitoring] = useState(false);
  const [reportText, setReportText] = useState('');
  const [recentDetections, setRecentDetections] = useState([
    { id: 1, message: "Your account has been locked. Click here to verify: http://suspicious-link.com", date: "Today, 2:30 PM", status: "Blocked" },
    { id: 2, message: "Claim your prize now! You've won $5000. Click: http://claim-prize.net", date: "Yesterday, 4:15 PM", status: "Reported" }
  ]);
  const { toast } = useToast();

  const handleAutoMonitoringToggle = () => {
    setAutoMonitoring(!autoMonitoring);
    toast({
      title: !autoMonitoring ? "Auto monitoring enabled" : "Auto monitoring disabled",
      description: !autoMonitoring 
        ? "We'll monitor your SMS messages in real-time for phishing attempts." 
        : "Real-time SMS monitoring has been turned off.",
      variant: !autoMonitoring ? "default" : "destructive",
    });
  };

  const handleManualReport = () => {
    if (reportText.trim()) {
      // In a real app, this would send the report to a backend service
      toast({
        title: "Report submitted",
        description: "Thank you for helping keep our community safe.",
        variant: "default",
      });
      
      // Add to recent detections for demo purposes
      const newDetection = {
        id: Date.now(),
        message: reportText,
        date: "Just now",
        status: "Reported"
      };
      
      setRecentDetections([newDetection, ...recentDetections]);
      setReportText('');
    } else {
      toast({
        title: "Empty report",
        description: "Please enter the suspicious message content.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-6 space-y-6 pb-24">
      <h1 className="text-2xl font-bold">Phishing Monitor</h1>
      
      {/* Auto Monitoring Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Auto SMS Monitoring</span>
            <Switch 
              checked={autoMonitoring} 
              onCheckedChange={handleAutoMonitoringToggle} 
              className="ml-2"
            />
          </CardTitle>
          <CardDescription>
            When enabled, we'll automatically scan incoming SMS messages and protect you from phishing attempts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`p-4 border rounded-lg transition-all duration-300 ${autoMonitoring ? 'bg-primary/5 border-primary' : 'bg-muted/20 border-muted'}`}>
            <div className="flex items-center">
              <Shield className={`mr-3 ${autoMonitoring ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
              <div>
                <h4 className="font-medium">Protection Status</h4>
                <p className="text-sm text-muted-foreground">
                  {autoMonitoring 
                    ? "Actively monitoring for suspicious SMS messages" 
                    : "Protection is currently disabled"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Manual Reporting Section */}
      <Card>
        <CardHeader>
          <CardTitle>Report a Suspicious Message</CardTitle>
          <CardDescription>
            Help protect the community by reporting phishing attempts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label htmlFor="report">Suspicious message content</Label>
            <Textarea 
              id="report" 
              placeholder="Paste the suspicious message here..." 
              className="min-h-[100px]"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleManualReport} className="w-full sm:w-auto">
            Submit Report <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      {/* Recent Detections */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Recent Detections</h2>
        {recentDetections.length > 0 ? (
          <div className="space-y-3">
            {recentDetections.map((item) => (
              <Alert key={item.id} variant={item.status === "Blocked" ? "destructive" : "default"}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="flex items-center justify-between">
                  <span>Phishing Attempt</span>
                  <Badge variant={item.status === "Blocked" ? "destructive" : "outline"}>
                    {item.status}
                  </Badge>
                </AlertTitle>
                <AlertDescription>
                  <p className="mt-2 text-sm text-muted-foreground">{item.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <Check className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-center text-muted-foreground">No phishing attempts detected yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
