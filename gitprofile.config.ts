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
    display: true,
    header: 'Academic projects',
    mode: 'manual',
    manual: {
      projects: [
        'romrchp/personalised-reminders-rct',
        'romrchp/utae-cell-segmentation',
        'romrchp/csa-journey-planner',
        'romrchp/chambolle-denoising',
        'romrchp/directors-analysis',
        'romrchp/pully-weather-forecast'
        ],
    },
    automatic: {
      sortBy: 'stars',
      limit: 8,
      exclude: {
        forks: true,
        projects: ['romrchp/graded-exs', 'romrchp/optml-project', 'romrchp/dgrpool-pipeline'],
      },
    },
    images: {
      'directors-analysis': 'https://i.postimg.cc/grFxCtVj/director.jpg',
      'csa-journey-planner': 'https://i.postimg.cc/q7hSDmvb/zurich.jpg',
      'personalised-reminders-rct': 'https://i.postimg.cc/PqYK80xH/food-tracking.jpg',
      'chambolle-denoising': 'https://i.postimg.cc/3RyS993r/image-denoising.png',
      'pully-weather-forecast': 'https://i.postimg.cc/15zgddLc/high-angle-closeup-shot-isolated-green-leaf-puddle-rainy-day.jpg',
      'utae-cell-segmentation': 'https://i.postimg.cc/V6yGGnv5/cell-segmentation.png',
    },
  },
  external: {
    header: 'Others',
    projects: [
      {
        title: 'DGRPool',
        description:
          'Functional web tool of the DGRPool project I participated in. Code for the automated data retrieval pipeline can be provided upon request.',
        imageUrl: 'https://i.postimg.cc/Lsc0tGpY/DGRPool.png',
        link: 'https://dgrpool.epfl.ch/',
      },
    ],
  },
},

  seo: {
    title: 'Romain Rochepeau\'s portfolio',
    description: '',
    imageURL: '',
  },
  social: {
    linkedin: '',
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
    email: 'romain.rochepeau@gmail.com',
  },
  resume: {
    fileUrl:
      '', // Empty fileUrl will hide the `Download Resume` button.
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
    //{
    //  company: 'Médecins sans Frontières / Doctors Without Borders ',
    //  position: 'Junior Engineer - Technical Logistics',
    //  from: 'August 2024',
    //  to: 'Present',
    //  companyLink: 'https://www.msf.ch/?_gl=1*z8n1k4*_up*MQ..&gclid=CjwKCAjw3624BhBAEiwAkxgTOoEVENrOogS1JxEe8R8pT7KGIubRStGW9sepfY062z2xhlJ9ge_fIRoCRjQQAvD_BwE',
    //},
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
    //{
    //  institution: 'École Polytechnique Fédérale de Lausanne (EPFL)',
    //  degree: 'Master in Life Sciences Engineering, Minoring in Data Science',
    //  from: '2022',
    //  to: 'Present',
    //},
    //{
    //  institution: 'École Polytechnique Fédérale de Lausanne (EPFL)',
    //  degree: 'Bachelor in Life Sciences Engineering',
    //  from: '2018',
    //  to: '2022',
    //},
    //{
    //  institution: 'Lycée Polyvalent Jeanne d\'Arc',
    //  degree: 'Baccaulauréat Scientifique',
    //  from: '2015',
    //  to: '2018',
    //},
  ],
  publications: [
    {
      title: 'DGRPool: A web tool leveraging harmonized Drosophila Genetic Reference Panel phenotyping data for the study of complex traits',
      conferenceName: '',
      journalName: 'eLife Sciences Publications, Ltd',
      authors: 'Vincent Gardeux, Roel Bevers, Fabrice David, Emily Rosschaert, Romain Rochepeau, Bart Deplancke',
      link: 'https://elifesciences.org/articles/88981',
      description:
        'The web tool DGRPool presented in this paper makes data and results from the Drosophila Genetic Reference Panel accessible that will enable downstream analyses of genetic association.'
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
