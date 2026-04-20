import { describe, it, expect, vi } from 'vitest';
import { SubmissionApi } from './submission';
import apiClient from '@/utils/api/client';

vi.mock('@/utils/api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  }
}));

describe('SubmissionApi', () => {
  it('calls correct endpoints', () => {
    SubmissionApi.createDraft('1', 'desc');
    expect(apiClient.post).toHaveBeenCalledWith('/submissions?assignmentId=1', { description: 'desc' });

    SubmissionApi.studentGetSubmission('1');
    expect(apiClient.get).toHaveBeenCalledWith('/submissions/my?assignmentId=1');

    SubmissionApi.updateDescription('1', 'new desc');
    expect(apiClient.put).toHaveBeenCalledWith('/submissions/1/description', { description: 'new desc' });

    SubmissionApi.submitDraft('1');
    expect(apiClient.put).toHaveBeenCalledWith('/submissions/1/submit');

    SubmissionApi.teacherGetSubmission('1');
    expect(apiClient.get).toHaveBeenCalledWith('submissions?assignmentId=1');

    SubmissionApi.getSingleSubmission('1');
    expect(apiClient.get).toHaveBeenCalledWith('submissions/1');
  });
});
