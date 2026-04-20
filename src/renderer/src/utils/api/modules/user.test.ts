import { describe, it, expect, vi } from 'vitest';
import { UserApi } from './user';
import apiClient from '@/utils/api/client';

vi.mock('@/utils/api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  }
}));

describe('UserApi', () => {
  it('calls correct endpoints', () => {
    UserApi.getDetail(1);
    expect(apiClient.get).toHaveBeenCalledWith('/users/1');

    UserApi.modify(1, { fullName: 'Test' });
    expect(apiClient.patch).toHaveBeenCalledWith('/users/1', { fullName: 'Test' });

    UserApi.register({ email: 'test@test.com' });
    expect(apiClient.post).toHaveBeenCalledWith('/users/register', { email: 'test@test.com' });

    UserApi.login({ email: 'test@test.com' });
    expect(apiClient.post).toHaveBeenCalledWith('/users/login', { email: 'test@test.com' });
  });
});
