import { render, fireEvent } from '@testing-library/react-native';
import { PostActions } from '../../components/post/PostActions';
import { describe, expect, test, jest } from '@jest/globals';

describe('PostActions Component', () => {
  const defaultProps = {
    likes: 10,
    comments: 5,
    onLike: jest.fn(),
    onComment: jest.fn(),
    shareUrl: 'https://example.com/post/1'
  };

  test('should render like and comment counts', () => {
    const { getByText } = render(<PostActions {...defaultProps} />);
    expect(getByText('10')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });

  test('should call onLike when like button is pressed', () => {
    const { getByTestId } = render(<PostActions {...defaultProps} />);
    fireEvent.press(getByTestId('like-button'));
    expect(defaultProps.onLike).toHaveBeenCalled();
  });

  test('should call onComment when comment button is pressed', () => {
    const { getByTestId } = render(<PostActions {...defaultProps} />);
    fireEvent.press(getByTestId('comment-button'));
    expect(defaultProps.onComment).toHaveBeenCalled();
  });

  test('should show share button when shareUrl is provided', () => {
    const { getByTestId } = render(<PostActions {...defaultProps} />);
    expect(getByTestId('share-button')).toBeTruthy();
  });

  test('should not show share button when shareUrl is not provided', () => {
    const { queryByTestId } = render(
      <PostActions {...defaultProps} shareUrl={undefined} />
    );
    expect(queryByTestId('share-button')).toBeNull();
  });
});
