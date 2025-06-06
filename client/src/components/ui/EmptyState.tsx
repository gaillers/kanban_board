import type { ReactNode } from 'react';

type EmptyStateProps = {
  message: string;
  children?: ReactNode;
};

export const EmptyState = ({ message, children }: EmptyStateProps) => {
  return (
    <div className="text-center text-gray-500">
      {message}
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};
