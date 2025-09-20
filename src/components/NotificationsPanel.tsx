import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, AlertCircle, Info, Clock } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "bug",
    message: "You have a bug that needs....",
    status: "urgent",
    time: "2m ago",
    icon: AlertCircle,
  },
  {
    id: 2,
    type: "user",
    message: "New user registered",
    status: "info",
    time: "5m ago", 
    icon: Info,
  },
  {
    id: 3,
    type: "bug",
    message: "You have a bug that needs....",
    status: "urgent",
    time: "10m ago",
    icon: AlertCircle,
  },
  {
    id: 4,
    type: "system",
    message: "Andi Lake subscribed to you",
    status: "success",
    time: "15m ago",
    icon: CheckCircle,
  },
  {
    id: 5,
    type: "info",
    message: "Modified a data in Page X",
    status: "info", 
    time: "20m ago",
    icon: Info,
  },
  {
    id: 6,
    type: "info",
    message: "Deleted a page in Project X",
    status: "info",
    time: "25m ago",
    icon: Info,
  },
];

const activities = [
  { name: "Hanty Carfy", action: "Submitted a bug", priority: "high" },
  { name: "Brian Carty", action: "Submitted a bug", priority: "high" },
  { name: "Orfynda Oyen", action: "Submitted a bug", priority: "high" },
  { name: "Andi Lake", action: "Submitted a bug", priority: "high" },
  { name: "Peri Mersion", action: "Submitted a bug", priority: "medium" },
  { name: "Eric", action: "Submitted a bug", priority: "medium" },
];

export function NotificationsPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            Notifications
            <Badge variant="secondary" className="text-xs">6</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div key={notification.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <Icon className={`h-4 w-4 mt-0.5 ${
                      notification.status === 'urgent' ? 'text-destructive' :
                      notification.status === 'success' ? 'text-success' :
                      'text-primary'
                    }`} />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {activity.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.name}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <Badge 
                    variant={activity.priority === 'high' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {activity.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}