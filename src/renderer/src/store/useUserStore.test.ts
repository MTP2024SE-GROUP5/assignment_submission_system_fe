import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserStore } from './useUserStore';

describe('useUserStore', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('sets user correctly', () => {
        const { result } = renderHook(() => useUserStore());
        act(() => {
            result.current.setUser({ userId: 1, username: 'test' });
        });
        expect(result.current.user).toEqual({ userId: 1, username: 'test' });
    });

    it('sets auth and local storage', () => {
        const { result } = renderHook(() => useUserStore());
        act(() => {
            result.current.setAuth({ userId: 2 }, 'my-token');
        });
        expect(result.current.user).toEqual({ userId: 2 });
        expect(result.current.token).toBe('my-token');
        expect(localStorage.getItem('token')).toBe('my-token');
        expect(localStorage.getItem('user')).toBe('{"userId":2}');
    });

    it('clears profile correctly', () => {
        localStorage.setItem('token', 'old');
        const { result } = renderHook(() => useUserStore());
        act(() => {
            result.current.clearUserProfile();
        });
        expect(result.current.user).toBeNull();
        expect(result.current.token).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
    });
});
