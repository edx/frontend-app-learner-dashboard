import { render, screen, RenderResult } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import ProgramProgressHeader from './ProgramProgressHeader';
import { getProgramIcon } from '../data/util';

jest.mock('../data/util', () => ({
  getProgramIcon: jest.fn(),
}));

const mockProgramType = 'Degree';
const mockProgramTitle = 'Full Stack Development Degree';
const mockProgramIconUrl = 'icon-degree.svg';

const mockOrganizations = [
  {
    uuid: 'org-1-uuid',
    key: 'UniversityAx',
    name: 'University A',
    logoImageUrl: 'logo-a.png',
    certificateLogoImageUrl: 'cert-logo-a.png',
  },
  {
    uuid: 'org-2-uuid',
    key: 'TechInstituteBx',
    name: 'Tech Institute B',
    logoImageUrl: 'logo-b.png',
    certificateLogoImageUrl: null,
  },
];

const defaultProps = {
  programTitle: mockProgramTitle,
  programType: mockProgramType,
  authoringOrganizations: mockOrganizations,
};

const renderComponent = (props = {}): RenderResult => {
  (getProgramIcon as jest.Mock).mockReturnValue(mockProgramIconUrl);

  return render(
    <IntlProvider locale="en">
      <ProgramProgressHeader {...defaultProps} {...props} />;
    </IntlProvider>,
  );
};

describe('ProgramProgressHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the program title and uses getProgramIcon correctly', () => {
    renderComponent();

    expect(screen.getByRole('heading', { name: mockProgramTitle })).toBeInTheDocument();

    expect(getProgramIcon).toHaveBeenCalledWith(mockProgramType);

    const programIcon = screen.getByAltText(`${mockProgramType} icon`);
    expect(programIcon).toBeInTheDocument();
    expect(programIcon).toHaveAttribute('src', mockProgramIconUrl);
  });

  it('renders the institutions header text', () => {
    renderComponent();

    expect(screen.getByText('Institutions')).toBeInTheDocument();
  });

  it('renders all organization logos and uses certificateLogoImageUrl first', () => {
    renderComponent();

    const orgImages = screen.getAllByRole('img', { name: /logo/i });
    expect(orgImages).toHaveLength(mockOrganizations.length);

    const logoA = screen.getByAltText("University A's logo");
    expect(logoA).toHaveAttribute('src', mockOrganizations[0].certificateLogoImageUrl);

    const logoB = screen.getByAltText("Tech Institute B's logo");
    expect(logoB).toHaveAttribute('src', mockOrganizations[1].logoImageUrl);
  });

  it('does NOT render the institutions column if authoringOrganizations is empty', () => {
    renderComponent({ authoringOrganizations: [] });

    expect(screen.queryByText('Institutions')).not.toBeInTheDocument();
  });

  it('does NOT render the institutions column if authoringOrganizations is null', () => {
    renderComponent({ authoringOrganizations: null });

    expect(screen.queryByText('Institutions')).not.toBeInTheDocument();
  });
});
