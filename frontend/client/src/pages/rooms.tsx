import { useQuery } from "@tanstack/react-query";
import { type Room, type Student } from "@shared/schema";
import RoomForm from "@/components/forms/room-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DoorOpen, CheckCircle, Bed, Edit } from "lucide-react";

export default function Rooms() {
  const { data: rooms, isLoading, error } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const { data: students } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const getStudentName = (studentId: number | null | undefined) => {
    if (!studentId) return "Unassigned";
    const student = students?.find(s => s.id === studentId);
    return student?.fullName || "Unknown Student";
  };

  const getRoomStats = () => {
    if (!rooms) return { available: 0, occupied: 0 };
    
    const available = rooms.filter(r => r.status === "available").length;
    const occupied = rooms.filter(r => r.status === "booked").length;
    
    return { available, occupied };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case "booked":
        return <Badge className="bg-red-100 text-red-800">Occupied</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <RoomForm />
        </div>
        <div className="lg:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <RoomForm />
        </div>
        <div className="lg:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600">Failed to load rooms</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const roomStats = getRoomStats();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Room Management Form */}
      <div className="lg:w-1/2">
        <RoomForm />
      </div>

      {/* Room Status Overview */}
      <div className="lg:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-indigo-600">
              <DoorOpen className="mr-3" />
              Room Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-100 p-4 rounded-lg text-center">
                <CheckCircle className="text-2xl text-green-600 mb-2 mx-auto" />
                <p className="text-2xl font-bold text-green-600">{roomStats.available}</p>
                <p className="text-sm text-green-700">Available</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg text-center">
                <Bed className="text-2xl text-red-600 mb-2 mx-auto" />
                <p className="text-2xl font-bold text-red-600">{roomStats.occupied}</p>
                <p className="text-sm text-red-700">Occupied</p>
              </div>
            </div>
            <div className="space-y-3">
              {rooms && rooms.length > 0 ? (
                rooms.map((room) => (
                  <div key={room.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Bed className="text-purple-600 text-xs" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{room.roomNumber}-{room.bedNumber}</p>
                        <p className="text-sm text-gray-600">{room.roomType} Room</p>
                        <p className="text-sm text-gray-600">{getStudentName(room.assignedStudentId)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(room.status)}
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <DoorOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p>No rooms created yet</p>
                  <p className="text-sm">Add your first room using the form on the left</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
