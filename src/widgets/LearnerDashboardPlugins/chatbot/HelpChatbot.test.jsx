import React from 'react';
import {
  render,
} from '@testing-library/react';

import HelpChatbot from './HelpChatbot';
import {
  XPERT_KEY,
} from './data/five9';

describe('Five9 Chatbot loads', () => {
  it('should render the xpert chatbot key and scripts', () => {
    render(<HelpChatbot />);
    const script = document.getElementsByTagName('script')[0];
    const link = document.getElementsByTagName('link')[0];

    expect(script).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(window.XpertChatbotFrontend).toBeTruthy();
    expect(window.XpertChatbotFrontend.clientId).toBe(XPERT_KEY);
  });
});
