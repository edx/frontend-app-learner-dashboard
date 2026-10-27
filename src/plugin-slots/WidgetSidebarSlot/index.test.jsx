import { render, screen } from '@testing-library/react';

import { IntlProvider } from '@edx/frontend-platform/i18n';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { reduxHooks } from 'hooks';
import WidgetSidebarSlot from '.';

jest.mock('@openedx/frontend-plugin-framework', () => ({
  PluginSlot: jest.fn(({ children }) => children),
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: jest.fn(),
    useRvPluginsData: jest.fn(),
  },
}));

const courseSearchUrl = 'mock-url';

describe('WidgetSidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders PluginSlot with correct children', () => {
    reduxHooks.usePlatformSettingsData.mockReturnValueOnce({ courseSearchUrl });
    reduxHooks.useRvPluginsData.mockReturnValueOnce({ isEnabled: false });
    render(<IntlProvider locale="en"><WidgetSidebarSlot /></IntlProvider>);
    const pluginSlot = screen.getByText('Looking for a new challenge?');
    expect(pluginSlot).toBeDefined();
    expect(PluginSlot).toHaveBeenCalled();
  });

  it('skips PluginSlot when the rvPlugins flag is enabled', () => {
    reduxHooks.usePlatformSettingsData.mockReturnValueOnce({ courseSearchUrl });
    reduxHooks.useRvPluginsData.mockReturnValueOnce({ isEnabled: true });
    render(<IntlProvider locale="en"><WidgetSidebarSlot /></IntlProvider>);
    expect(screen.queryByText('Looking for a new challenge?')).toBeNull();
    expect(PluginSlot).not.toHaveBeenCalled();
  });

  it('waits for the rvPlugins flag before rendering the slot', () => {
    reduxHooks.useRvPluginsData.mockReturnValueOnce(undefined);
    render(<IntlProvider locale="en"><WidgetSidebarSlot /></IntlProvider>);
    expect(PluginSlot).not.toHaveBeenCalled();
    expect(screen.queryByText('Looking for a new challenge?')).toBeNull();
  });
});
