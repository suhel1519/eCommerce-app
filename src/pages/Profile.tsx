import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { animations } from "@/lib/animations";

// Profile Overview Component
const ProfileOverview: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className={`mb-6 ${animations.entrance.slideDown}`}>
        <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
        <p className="text-gray-600 mt-1">Manage your profile information and settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className={`md:col-span-1 ${animations.entrance.fadeIn}`}>
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src="/user-avatar.png" alt="User" />
              <AvatarFallback className="bg-gray-200 text-gray-700 text-xl">A</AvatarFallback>
            </Avatar>
            <CardTitle>John Doe</CardTitle>
            <p className="text-gray-600">Product Manager</p>
            <div className="mt-2">
              <Badge variant="secondary">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className={`md:col-span-2 ${animations.entrance.fadeIn}`}>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <p className="text-gray-900">John Doe</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">john.doe@example.com</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <p className="text-gray-900">+1 (555) 123-4567</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <p className="text-gray-900">San Francisco, CA</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Profile Projects Component
const ProfileProjects: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className={`mb-6 ${animations.entrance.slideDown}`}>
        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
        <p className="text-gray-600 mt-1">View and manage your projects</p>
      </div>
      <Card className={animations.entrance.fadeIn}>
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">No projects found. Start by creating your first project.</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Profile Campaigns Component
const ProfileCampaigns: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className={`mb-6 ${animations.entrance.slideDown}`}>
        <h1 className="text-2xl font-bold text-gray-900">My Campaigns</h1>
        <p className="text-gray-600 mt-1">Track your marketing campaigns</p>
      </div>
      <Card className={animations.entrance.fadeIn}>
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">No campaigns found. Create your first campaign to get started.</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Profile Documents Component
const ProfileDocuments: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className={`mb-6 ${animations.entrance.slideDown}`}>
        <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
        <p className="text-gray-600 mt-1">Access and manage your documents</p>
      </div>
      <Card className={animations.entrance.fadeIn}>
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">No documents found. Upload your first document to get started.</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Profile Followers Component
const ProfileFollowers: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className={`mb-6 ${animations.entrance.slideDown}`}>
        <h1 className="text-2xl font-bold text-gray-900">My Followers</h1>
        <p className="text-gray-600 mt-1">View your followers and connections</p>
      </div>
      <Card className={animations.entrance.fadeIn}>
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">No followers yet. Start connecting with others to build your network.</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Profile Component with Routing
const Profile: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfileOverview />} />
      <Route path="/overview" element={<ProfileOverview />} />
      <Route path="/projects" element={<ProfileProjects />} />
      <Route path="/campaigns" element={<ProfileCampaigns />} />
      <Route path="/documents" element={<ProfileDocuments />} />
      <Route path="/followers" element={<ProfileFollowers />} />
      <Route path="*" element={<Navigate to="/profile" replace />} />
    </Routes>
  );
};

export default Profile;
