import { describe, it, expect, vi, beforeEach } from 'vitest';
import apiClient, { SERVER_CONFIGS } from './client';
import axios from 'axios';

vi.mock('i18next', () => ({
  default: {
    language: 'en-US'
  }
}));

describe('apiClient', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should use default config when local storage is empty', () => {
    expect(apiClient.defaults.baseURL).toBe(SERVER_CONFIGS.production);
    expect(apiClient.defaults.timeout).toBe(10000);
  });

  it('interceptor should add authorization header if token exists', async () => {
    localStorage.setItem('token', 'test-token');
    
    // Simulate axios interceptor execution
    const interceptor = (apiClient.interceptors.request as any).handlers[0].fulfilled;
    const config = { headers: {}, params: {} };
    const result = await interceptor(config);
    
    expect(result.headers.Authorization).toBe('Bearer test-token');
    expect(result.params.locale).toBe('en');
  });

  it('interceptor should return data directly', async () => {
      const interceptor = (apiClient.interceptors.response as any).handlers[0].fulfilled;
      const data = { message: 'success' };
      const response = await interceptor({ data });
      expect(response).toEqual(data);
  });

  it('interceptor should catch error status codes', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const interceptor = (apiClient.interceptors.response as any).handlers[0].rejected;
      
      try {
          await interceptor({ response: { status: 401 } });
      } catch (e) {}
      expect(consoleSpy).toHaveBeenCalledWith('Error 401; Invalid login session');
      
      try {
          await interceptor({ response: { status: 403 } });
      } catch (e) {}
      expect(consoleSpy).toHaveBeenCalledWith('Error 403; Invalid user permissions');
      
      try {
          await interceptor({ response: { status: 500 } });
      } catch (e) {}
      expect(consoleSpy).toHaveBeenCalledWith('Error 500; Internal error');
  });
});
