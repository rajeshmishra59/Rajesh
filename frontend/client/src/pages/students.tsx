import { useQuery } from "@tanstack/react-query";
import { type Student } from "@shared/schema";
import StudentForm from "@/components/forms/student-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Edit } from "lucide-react";

export default function Students() {
  const { data: students, isLoading, error } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <StudentForm />
        </div>
        <div className="lg:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
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
          <StudentForm />
        </div>
        <div className="lg:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600">Failed to load students</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Student Enrollment Form */}
      <div className="lg:w-1/2">
        <StudentForm />
      </div>

      {/* Student List */}
      <div className="lg:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <Users className="mr-3" />
              Current Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students && students.length > 0 ? (
                students.map((student) => (
                  <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{student.fullName}</h3>
                        <p className="text-sm text-gray-600">{student.email}</p>
                        <p className="text-sm text-gray-600">{student.course} - {student.admissionYear}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">
                          {student.status}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p>No students enrolled yet</p>
                  <p className="text-sm">Add your first student using the form on the left</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
