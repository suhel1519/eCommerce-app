import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, User, Bug } from "lucide-react";
import { animations } from "@/lib/animations";

interface NotificationItem {
  id: string;
  type: "bug" | "user" | "activity" | "system";
  title: string;
  time: string;
}

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  time: string;
  avatar: string;
  avatarImage?: string;
  color: string;
}

interface ContactItem {
  id: string;
  name: string;
  avatar: string;
  avatarImage?: string;
  color: string;
  status?: "online" | "offline";
}

const notifications: NotificationItem[] = [
  {
    id: "1",
    type: "bug",
    title: "You have a bug that needs...",
    time: "Just now"
  },
  {
    id: "2",
    type: "user",
    title: "New user registered",
    time: "59 minutes ago"
  },
  {
    id: "3",
    type: "bug",
    title: "You have a bug that needs...",
    time: "12 hours ago"
  },
  {
    id: "4",
    type: "system",
    title: "Andi Lane subscribed to you",
    time: "Today, 11:59 AM"
  }
];

const activities: ActivityItem[] = [
  {
    id: "1",
    user: "You",
    action: "have a bug that needs...",
    time: "Just now",
    avatar: "Y",
    avatarImage: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=You&backgroundColor=transparent",
    color: "bg-green-500"
  },
  {
    id: "2",
    user: "Released a new version",
    action: "",
    time: "59 minutes ago",
    avatar: "R",
    avatarImage: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Release&backgroundColor=transparent",
    color: "bg-orange-500"
  },
  {
    id: "3",
    user: "Submitted a bug",
    action: "",
    time: "12 hours ago",
    avatar: "S",
    avatarImage: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Submit&backgroundColor=transparent",
    color: "bg-blue-500"
  },
  {
    id: "4",
    user: "Modified A data in Page X",
    action: "",
    time: "Today, 11:59 AM",
    avatar: "M",
    avatarImage: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Modify&backgroundColor=transparent",
    color: "bg-purple-500"
  },
  {
    id: "5",
    user: "Deleted a page in Project X",
    action: "",
    time: "Feb 2, 2023",
    avatar: "D",
    avatarImage: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Delete&backgroundColor=transparent",
    color: "bg-gray-500"
  }
];

const contacts: ContactItem[] = [
  {
    id: "1",
    name: "Natali Craig",
    avatar: "NC",
    avatarImage: "https://api.dicebear.com/7.x/adventurer/svg?seed=NataliCraig&backgroundColor=transparent",
    color: "bg-gray-400"
  },
  {
    id: "2",
    name: "Drew Cano",
    avatar: "DC",
    avatarImage: "https://api.dicebear.com/7.x/adventurer/svg?seed=DrewCano&backgroundColor=transparent",
    color: "bg-red-500"
  },
  {
    id: "3",
    name: "Orlando Diggs",
    avatar: "OD",
    avatarImage: "https://api.dicebear.com/7.x/adventurer/svg?seed=OrlandoDiggs&backgroundColor=transparent",
    color: "bg-gray-400"
  },
  {
    id: "4",
    name: "Andi Lane",
    avatar: "AL",
    avatarImage: "https://api.dicebear.com/7.x/adventurer/svg?seed=AndiLane&backgroundColor=transparent",
    color: "bg-gray-400"
  },
  {
    id: "5",
    name: "Kate Morrison",
    avatar: "KM",
    avatarImage: "https://api.dicebear.com/7.x/adventurer/svg?seed=KateMorrison&backgroundColor=transparent",
    color: "bg-gray-400"
  },
  {
    id: "6",
    name: "Koray Okumus",
    avatar: "KO",
    avatarImage: "https://api.dicebear.com/7.x/adventurer/svg?seed=KorayOkumus&backgroundColor=transparent",
    color: "bg-blue-500"
  }
];

export const NotificationsPanel: React.FC = () => {
  return (
    <div className="w-72 bg-card border-l border-border p-4 overflow-y-auto h-full flex-shrink-0 transition-colors duration-150">
      {/* Notifications Section */}
      <div className={`mb-6 ${animations.entrance.slideLeft}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground">Notifications</h2>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
              <div className="flex-shrink-0">
                {notification.type === "bug" ? (
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Bug className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                ) : notification.type === "user" ? (
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <Bell className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground truncate">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities Section */}
      <div className={`mb-6 ${animations.entrance.slideLeft}`}>
        <h2 className="text-lg font-semibold text-card-foreground mb-4">Activities</h2>

        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
              <Avatar className="h-8 w-8 flex-shrink-0">
                {activity.avatarImage ? (
                  <AvatarImage src={activity.avatarImage} alt={activity.user} />
                ) : (
                  <AvatarFallback className={`${activity.color} text-white text-xs`}>
                    {activity.avatar}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground">
                  {activity.user} {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts Section */}
      <div className={animations.entrance.slideLeft}>
        <h2 className="text-lg font-semibold text-card-foreground mb-4">Contacts</h2>

        <div className="space-y-3">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
              <Avatar className="h-8 w-8 flex-shrink-0">
                {contact.avatarImage ? (
                  <AvatarImage src={contact.avatarImage} alt={contact.name} />
                ) : (
                  <AvatarFallback className={`${contact.color} text-white text-xs`}>
                    {contact.avatar}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground truncate">{contact.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};