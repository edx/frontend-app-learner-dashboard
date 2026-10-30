/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from 'react-error-boundary';
import DynamicExperienceSlot from './DynamicExperienceSlot';

// Helper to catch the custom error signals thrown by the component
const ErrorFallback = ({ error }) => (
  <span>Fallback Triggered: {error.name}</span>
);

describe('DynamicExperienceSlot', () => {
  let mockUcl;

  beforeEach(() => {
    jest.useFakeTimers();
    // Reset window.UCL before each test
    delete window.UCL;

    mockUcl = {
      mount: jest.fn(),
      unmount: jest.fn(),
    };
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('waits for window.UCL and calls mount when available', async () => {
    render(<DynamicExperienceSlot widgetName="test-widget" />);

    // Initially UCL is undefined, so mount shouldn't be called
    expect(mockUcl.mount).not.toHaveBeenCalled();

    // Simulate UCL loading onto the window
    window.UCL = mockUcl;

    // Advance timers to trigger the setInterval in useUCL
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(mockUcl.mount).toHaveBeenCalledWith(
      'test-widget',
      expect.any(HTMLDivElement),
      expect.objectContaining({
        onFallbackShouldRender: expect.any(Function),
      }),
    );
  });

  test('passes additional props through to UCL.mount', () => {
    window.UCL = mockUcl;

    // We pass 'theme' and 'userId' which should end up in the 'rest' object
    render(
      <DynamicExperienceSlot
        widgetName="test-widget"
        theme="dark"
        userId="12345"
      />,
    );

    expect(mockUcl.mount).toHaveBeenCalledWith(
      'test-widget',
      expect.any(HTMLDivElement),
      expect.objectContaining({
        theme: 'dark',
        userId: '12345',
        onFallbackShouldRender: expect.any(Function),
      }),
    );
  });

  test('triggers fallback signal when requested by widget', () => {
    window.UCL = mockUcl;
    let triggerFallback;

    mockUcl.mount.mockImplementation((name, el, props) => {
      triggerFallback = props.onFallbackShouldRender;
    });

    render(
      // You use their component instead of writing your own class
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DynamicExperienceSlot widgetName="test-widget" />
      </ErrorBoundary>,
    );

    act(() => {
      triggerFallback(true);
    });

    expect(screen.getByText(/Fallback Triggered: RenderFallbackSignal/i)).toBeInTheDocument();
  });

  test('calls unmount on cleanup', () => {
    window.UCL = mockUcl;
    const { unmount } = render(<DynamicExperienceSlot widgetName="test-widget" />);

    unmount();

    expect(mockUcl.unmount).toHaveBeenCalled();
  });
});
