export const progressiveProfilingFields = {
  fields: {
    gender: {
      name: 'gender',
      type: 'select',
      label: 'Gender',
      options: [
        ['f', 'Female'],
        ['m', 'Male'],
        ['o', 'Other'],
      ],
    },
    level_of_education: {
      name: 'level_of_education',
      type: 'select',
      label: 'Level of Education',
      options: [
        ['p', 'Doctorate'],
        ['m', 'Master\'s or professional degree'],
        ['b', 'Bachelor\'s Degree'],
        ['a', 'Associate Degree'],
        ['hs', 'Secondary/High School'],
        ['jhs', 'Junior secondary/junior high/middle school'],
        ['el', 'Elementary/primary school'],
        ['none', 'No formal education'],
        ['other', 'Other education'],
      ],
    },
  },
  extendedProfile: [],
  redirectUrl: '',
};
