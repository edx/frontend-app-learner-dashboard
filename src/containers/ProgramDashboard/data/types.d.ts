// Program List types
export interface ProgramData {
  uuid: string,
  title: string,
  type: string,
  bannerImage: {
    small: ImageData,
    medium: ImageData,
    large: ImageData,
    xSmall: ImageData,
  },
  authoringOrganizations?: AuthoringOrganization[],
  progress: Progress,
  discountData: any,
}

export interface ImageData {
  height: number,
  width: number,
  url: string,
}

export interface AuthoringOrganization {
  uuid: string,
  key: string,
  name: string,
  logoImageUrl: string,
  certificateLogoImageUrl: string | null,
}

export interface Progress {
  inProgress: number,
  notStarted: number,
  completed: number,
}

export interface ProgramCardProps {
  program: ProgramData,
}

// Program Progress types
export interface ProgramProgressData {
  urls: {
    programListingUrl: string | undefined,
    trackSelectionUrl: string | undefined,
    commerceApiUrl: string | undefined,
    buyButtonUrl: string | undefined,
    programRecordUrl: string | undefined
  },
  courseData: any,
  programData: any
}

interface ProgramProgressHeaderProps {
  programTitle: string,
  programType: string,
  authoringOrganizations?: Array<AuthoringOrganization>
}

interface ProgramProgressCoursesProps {
  courseData: any
}

interface ProgramProgressInfoProps {
  allCoursesCompleted: Boolean,
  totalCoursesInProgram: number,
}
