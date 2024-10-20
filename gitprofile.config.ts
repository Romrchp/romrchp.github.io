// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'romrchp', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: true, // Forked projects will not be displayed if set to true.
          projects: ['romrchp/graded-exs', 'romrchp/optml-project'], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: ['arifszn/gitprofile', 'arifszn/pandora'], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: '',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        //{
        //  title: 'Project Name',
        //  description:
        //    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
        //  imageUrl:
        //    'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
        //  link: 'https://example.com',
       // },
       // {
       //   title: 'Project Name',
        //  description:
        //    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
        //  imageUrl:
        //    'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
        //  link: 'https://example.com',
       // },
      ],
    },
  },
  seo: {
    title: 'Romain Rochepeau\'s portfolio',
    description: '',
    imageURL: '',
  },
  social: {
    linkedin: 'Romain Rochepeau',
    twitter: '',
    mastodon: '',
    researchGate: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '', // example: 'pewdiepie'
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '', // example: '1/jeff-atwood'
    skype: '',
    telegram: '',
    website: '',
    phone: '+33 6 47 87 35 73',
    email: 'romain.rochepeau@epfl.ch',
  },
  resume: {
    fileUrl:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'Python',
    'R / RStudio',
    'HTML',
    'CSS',
    'Julia',
    'C++',
    'PostgreSQL',
    'Git',
    'JavaScript',
  ],
  experiences: [
    {
      company: 'Médecins sans Frontières / Doctors Without Borders ',
      position: 'Junior Engineer - Technical Logistics',
      from: 'August 2024',
      to: 'Present',
      companyLink: 'https://www.msf.ch/?_gl=1*z8n1k4*_up*MQ..&gclid=CjwKCAjw3624BhBAEiwAkxgTOoEVENrOogS1JxEe8R8pT7KGIubRStGW9sepfY062z2xhlJ9ge_fIRoCRjQQAvD_BwE',
    },
  ],
//  certifications: [
//    {
//      name: 'Bachelor in',
//     body: 'Lorem ipsum dolor sit amet',
//      year: 'March 2022',
//      link: 'https://example.com',
//    },
//  ],
  educations: [
    {
      institution: 'École Polytechnique Fédérale de Lausanne (EPFL)',
      degree: 'Master in Life Sciences Engineering, Minoring in Data Science',
      from: '2022',
      to: 'Present',
    },
    {
      institution: 'École Polytechnique Fédérale de Lausanne (EPFL)',
      degree: 'Bachelor in Life Sciences Engineering',
      from: '2018',
      to: '2022',
    },
    {
      institution: 'Lycée Polyvalent Jeanne d\'Arc',
      degree: 'Baccaulauréat Scientifique',
      from: '2015',
      to: '2018',
    },
  ],
  publications: [
    {
      title: 'DGRPool: A web tool leveraging harmonized Drosophila Genetic Reference Panel phenotyping data for the study of complex traits',
      conferenceName: '',
      journalName: 'eLife Sciences Publications, Ltd',
      authors: 'Vincent Gardeux, Roel Bevers, Fabrice David, Emily Rosschaert, Romain Rochepeau, Bart Deplancke',
      link: 'https://elifesciences.org/reviewed-preprints/88981v2#x-1553089916',
      description:
        'The web tool DGRPool presented in this paper makes data and results from the Drosophila Genetic Reference Panel accessible that will enable downstream analyses of genetic association.                 The webtool is available at https://dgrpool.epfl.ch/',
    },
  ],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: '', // to hide blog section, keep it empty
    limit: 2, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'lofi',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: true,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'procyon',
    ],

    // Custom theme, applied to `procyon` theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },


  enablePWA: true,
};

export default CONFIG;
