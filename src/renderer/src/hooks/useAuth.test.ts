import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAuth } from './useAuth';

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns unauthenticated when empty', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('returns authenticated when user exists', () => {
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test' }));
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.userId).toBe(1);
    expect(result.current.user.name).toBe('Test');
  });
});
