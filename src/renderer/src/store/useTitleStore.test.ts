import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTitleStore } from './useTitleStore';

describe('useTitleStore', () => {
    it('sets title correctly', () => {
        const { result } = renderHook(() => useTitleStore());
        expect(result.current.title).toBe('Title');
        act(() => {
            result.current.setTitle('New Title');
        });
        expect(result.current.title).toBe('New Title');
    });
});
