import apiClient from "@/utils/api/client";

export interface User {
  id: number;
  role: 'teacher' | 'student';
  username: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const UserApi = {
  getDetail: (id: number) => apiClient.get<Partial<User>>(`/users/${id}`),
  modify: (id: number, data:Partial<User>) => apiClient.patch<User>(`/users/${id}`,data),
  register: (data: Partial<User>) => apiClient.post<Partial<User>>(`/users/register`,data),
  login: (data: Partial<User>) => apiClient.post<Partial<User>>(`/users/login`,data)


}