import { describe, it, expect, vi } from 'vitest';
import { AssignmentsApi } from './assignment';
import apiClient from '@/utils/api/client';

vi.mock('@/utils/api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  }
}));

describe('AssignmentsApi', () => {
  it('calls correct endpoints', () => {
    AssignmentsApi.getDetail('1');
    expect(apiClient.get).toHaveBeenCalledWith('/assignments/1');

    AssignmentsApi.modify('1', { title: 'New' });
    expect(apiClient.put).toHaveBeenCalledWith('/assignments/1', { title: 'New' });

    AssignmentsApi.create({ title: 'New' });
    expect(apiClient.post).toHaveBeenCalledWith('assignments', { title: 'New' });

    AssignmentsApi.publish('1');
    expect(apiClient.put).toHaveBeenCalledWith('/assignments/1/publish');

    AssignmentsApi.delete('1');
    expect(apiClient.delete).toHaveBeenCalledWith('/assignments/1');

    AssignmentsApi.getAll();
    expect(apiClient.get).toHaveBeenCalledWith('/assignments/student');

    AssignmentsApi.getUrgent();
    expect(apiClient.get).toHaveBeenCalledWith('/assignments/student/urgent');
  });
});
