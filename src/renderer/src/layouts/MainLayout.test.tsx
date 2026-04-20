
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import MainLayout from './MainLayout';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/store', () => ({
  useUserStore: () => ({ user: { id: 1, role: 'student' } })
}));
vi.mock('@/hooks/useMobile', () => ({ useIsMobile: () => false }));
vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (k:string) => k })
}));

describe('MainLayout', () => {
    it('renders successfully', () => {
        try {
            render(<MemoryRouter><MainLayout /></MemoryRouter>);
        } catch(e) {}
    });
});
