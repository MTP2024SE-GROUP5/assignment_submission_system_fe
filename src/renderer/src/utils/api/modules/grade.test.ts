import { describe, it, expect, vi } from 'vitest';
import { GradeApi } from './grade';
import apiClient from '@/utils/api/client';

vi.mock('@/utils/api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  }
}));

describe('GradeApi', () => {
  it('calls correct endpoints', () => {
    GradeApi.gradeSubmission('1', { score: 100 });
    expect(apiClient.post).toHaveBeenCalledWith('/grades?submissionId=1', { score: 100 });

    GradeApi.studentGetGrade('1');
    expect(apiClient.get).toHaveBeenCalledWith('/grades/submission/1');

    GradeApi.updateGrade('1', { score: 90 });
    expect(apiClient.put).toHaveBeenCalledWith('/grades/1', { score: 90 });
  });
});
