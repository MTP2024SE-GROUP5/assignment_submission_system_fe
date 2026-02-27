import apiClient from "@/utils/api/client";

interface CourseQueryParams{
  _page?: number;
  _limit?: number;
  course_code?: string;
  is_archived?: boolean;
}

export interface Course {
  course_id: number;
  courseName: string;
  courseCode: string;
  isArchived: boolean;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}

export const CourseAPI = {
  list: (params?: CourseQueryParams) => apiClient.get<Course[]>('/courses', { params }),

  listMyEnrolled: (userId: number) =>
      apiClient.get(`/courseEnrollments`, {
        params: {
          userId: userId,
          _embed: 'course'
        }
      }),

  getDetail: (id: number)=> apiClient.get<Course>(`/courses/${id}`),

  create: (data: Partial<Course>)=> apiClient.post<Course>('/courses',data),

  modify: (id: number, data:Partial<Course>) => apiClient.patch<Course>(`/courses/${id}`,data)
}