import { render, fireEvent } from '@testing-library/react-native';
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
    const { getByText } = render(<PostContent {...defaultProps} />);
    expect(getByText('Test content')).toBeTruthy();
  });

  test('should truncate long text content', () => {
    const longContent = 'a'.repeat(300);
    const { getByText } = render(
      <PostContent
        {...defaultProps}
        content={longContent}
      />
    );
    
    expect(getByText(`${longContent.slice(0, 280)}...`)).toBeTruthy();
  });

  test('should render markdown content correctly', () => {
    const markdownContent = '# Title\n\nThis is **bold** text';
    const { getByText } = render(
      <PostContent
        {...defaultProps}
        content={markdownContent}
      />
    );

    expect(getByText('Title')).toBeTruthy();
    expect(getByText('This is bold text')).toBeTruthy();
  });

  test('should toggle content expansion', () => {
    const longContent = 'a'.repeat(300);
    const setIsExpanded = jest.fn();

    const { getByText } = render(
      <PostContent
        {...defaultProps}
        content={longContent}
        setIsExpanded={setIsExpanded}
      />
    );

    const expandButton = getByText('もっと見る');
    fireEvent.press(expandButton);
    expect(setIsExpanded).toHaveBeenCalledWith(true);
  });
});
