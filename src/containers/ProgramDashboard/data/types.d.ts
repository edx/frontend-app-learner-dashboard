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
    program_listing_url: string | null,
    track_selection_url: string | null,
    commerce_api_url: string | null,
    buy_button_url: string | null,
    program_record_url: string | null
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
