import { useState, useEffect } from 'react';
import { FIVE9_CHATBOT_CSS, FIVE9_CHATBOT_JS, XPERT_KEY } from './data/five9';

const HelpChatbot = () => {
  const [isBotLoaded, setBotLoaded] = useState(false);

  useEffect(() => {
    if (isBotLoaded) {
      return;
    }

    const body = document.getElementsByTagName('body')[0];

    window.XpertChatbotFrontend = {};
    window.XpertChatbotFrontend.clientId = XPERT_KEY;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FIVE9_CHATBOT_CSS;

    const script = document.createElement('script');
    script.src = FIVE9_CHATBOT_JS;
    script.defer = true;

    body.appendChild(link);
    body.appendChild(script);
    setBotLoaded(true);
  }, [isBotLoaded]);
  return null;
};

export default HelpChatbot;
