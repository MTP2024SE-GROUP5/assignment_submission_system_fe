import React, { ReactElement } from 'react';
import { render, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter } from 'react-router-dom';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

export const renderWithProviders = (ui: ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <HashRouter>
        {ui}
      </HashRouter>
    </QueryClientProvider>
  );
};

export const renderHookWithProviders = <Result, Props>(
  render: (initialProps: Props) => Result
) => {
  const testQueryClient = createTestQueryClient();
  return renderHook(render, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    )
  });
};
