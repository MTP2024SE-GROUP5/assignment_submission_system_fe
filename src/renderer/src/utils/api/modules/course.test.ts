import { describe, it, expect, vi } from 'vitest';
import { CourseAPI } from './course';
import apiClient from '@/utils/api/client';

vi.mock('@/utils/api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  }
}));

describe('CourseAPI', () => {
  it('calls endpoints correctly', () => {
    CourseAPI.list({ _page: 1 });
    expect(apiClient.get).toHaveBeenCalledWith('/courses', { params: { _page: 1 } });

    CourseAPI.listMyEnrolled(123);
    expect(apiClient.get).toHaveBeenCalledWith('/enrollments/user/123');

    CourseAPI.getDetail('c1');
    expect(apiClient.get).toHaveBeenCalledWith('/courses/c1');

    CourseAPI.create({ courseName: 'Test' });
    expect(apiClient.post).toHaveBeenCalledWith('/courses', { courseName: 'Test' });

    CourseAPI.modify('c1', { courseName: 'New' });
    expect(apiClient.put).toHaveBeenCalledWith('/courses/c1', { courseName: 'New' });

    CourseAPI.getAssignments('c1');
    expect(apiClient.get).toHaveBeenCalledWith('/assignments?courseId=c1');

    CourseAPI.listMyCreated('t1');
    expect(apiClient.get).toHaveBeenCalledWith('/courses?teacherId=t1');

    CourseAPI.archive('c1');
    expect(apiClient.put).toHaveBeenCalledWith('/courses/c1/archive');

    CourseAPI.unarchive('c1');
    expect(apiClient.put).toHaveBeenCalledWith('/courses/c1/unarchive');

    CourseAPI.enroll('c1', 'u1');
    expect(apiClient.post).toHaveBeenCalledWith('/enrollments/course/c1/user/u1');

    CourseAPI.unenroll('c1', 'u1');
    expect(apiClient.delete).toHaveBeenCalledWith('/enrollments/course/c1/user/u1');

    CourseAPI.getEnrolled('c1');
    expect(apiClient.get).toHaveBeenCalledWith('/enrollments/course/c1');
  });
});
