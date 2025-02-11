import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PostContent } from '@/components/post/PostContent';
import { describe, expect, test, jest } from '@jest/globals';

describe('PostContent Component', () => {
  const defaultProps = {
    content: 'Test content',
    mediaType: 'text' as const,
    isExpanded: false,
    setIsExpanded: jest.fn(),
  };

  test('should render text content correctly', () => {
    render(<PostContent {...defaultProps} />);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('should truncate long text content', () => {
    const longContent = 'a'.repeat(300);
    render(
      <PostContent
        {...defaultProps}
        content={longContent}
      />
    );
    
    expect(screen.getByText(`${longContent.slice(0, 280)}...`)).toBeInTheDocument();
  });

  test('should render markdown content correctly', () => {
    const markdownContent = '# Title\n\nThis is **bold** text';
    render(
      <PostContent
        {...defaultProps}
        content={markdownContent}
      />
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title');
    expect(screen.getByText('This is bold text')).toBeInTheDocument();
  });

  test('should toggle content expansion', () => {
    const longContent = 'a'.repeat(300);
    const setIsExpanded = jest.fn();

    render(
      <PostContent
        {...defaultProps}
        content={longContent}
        setIsExpanded={setIsExpanded}
      />
    );

    const expandButton = screen.getByText('すべて表示');
    fireEvent.click(expandButton);
    expect(setIsExpanded).toHaveBeenCalledWith(true);
  });
});
