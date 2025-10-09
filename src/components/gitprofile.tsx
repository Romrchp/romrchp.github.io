import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { formatDistance } from 'date-fns';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';

import '../assets/index.css';
import {
  CustomError,
  GENERIC_ERROR,
  INVALID_CONFIG_ERROR,
  INVALID_GITHUB_USERNAME_ERROR,
  setTooManyRequestError,
} from '../constants/errors';
import { getInitialTheme, getSanitizedConfig, setupHotjar } from '../utils';
import { SanitizedConfig } from '../interfaces/sanitized-config';
import { Profile } from '../interfaces/profile';
import { GithubProject } from '../interfaces/github-project';

import { DEFAULT_THEMES } from '../constants/default-themes';
import { BG_COLOR } from '../constants';

import ErrorPage from './error-page';
import HeadTagEditor from './head-tag-editor';
import ThemeChanger from './theme-changer';
import AvatarCard from './avatar-card';
import DetailsCard from './details-card';
import SkillCard from './skill-card';
import ExperienceCard from './experience-card';
import EducationCard from './education-card';
import CertificationCard from './certification-card';
import GithubProjectCard from './github-project-card';
import ExternalProjectCard from './external-project-card';
import BlogCard from './blog-card';
import PublicationCard from './publication-card';
import Footer from './footer';

const GitProfile = ({ config }: { config: Config }) => {
  const [sanitizedConfig] = useState<SanitizedConfig | Record<string, never>>(
    getSanitizedConfig(config)
  );
  const [theme, setTheme] = useState<string>(DEFAULT_THEMES[0]);
  const [error, setError] = useState<CustomError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [githubProjects, setGithubProjects] = useState<GithubProject[]>([]);

  /** Fetch GitHub Repositories */
  const getGithubProjects = useCallback(
    async (publicRepoCount: number): Promise<GithubProject[]> => {
      if (sanitizedConfig.projects.github.mode === 'automatic') {
        if (publicRepoCount === 0) return [];

        const excludeRepo = sanitizedConfig.projects.github.automatic.exclude.projects
          .map((project) => `+-repo:${project}`)
          .join('');

        const query = `user:${sanitizedConfig.github.username}+fork:${!sanitizedConfig.projects.github.automatic.exclude.forks}${excludeRepo}`;
        const url = `https://api.github.com/search/repositories?q=${query}&sort=${sanitizedConfig.projects.github.automatic.sortBy}&per_page=${sanitizedConfig.projects.github.automatic.limit}&type=Repositories`;

        const response = await axios.get(url, {
          headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        });
        return response.data.items;
      } else {
        if (sanitizedConfig.projects.github.manual.projects.length === 0) return [];

        const repos = sanitizedConfig.projects.github.manual.projects
          .map((project) => `+repo:${project}`)
          .join('');
        const url = `https://api.github.com/search/repositories?q=${repos}+fork:true&type=Repositories`;

        const response = await axios.get(url, {
          headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        });
        return response.data.items;
      }
    },
    [sanitizedConfig]
  );

  /** Fetch Profile + GitHub Projects */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://api.github.com/users/${sanitizedConfig.github.username}`
      );
      const data = response.data;

      setProfile({
        avatar: data.avatar_url,
        name: data.name || ' ',
        bio: data.bio || '',
        location: data.location || '',
        company: data.company || '',
      });

      if (sanitizedConfig.projects.github.display) {
        const repos = await getGithubProjects(data.public_repos);
        setGithubProjects(repos);
      }
    } catch (err) {
      handleError(err as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  }, [sanitizedConfig, getGithubProjects]);

  /** Error Handling */
  const handleError = (error: AxiosError | Error): void => {
    console.error('Error:', error);

    if (error instanceof AxiosError) {
      try {
        const reset = formatDistance(
          new Date((error.response?.headers?.['x-ratelimit-reset'] ?? 0) * 1000),
          new Date(),
          { addSuffix: true }
        );

        switch (error.response?.status) {
          case 403:
            setError(setTooManyRequestError(reset));
            break;
          case 404:
            setError(INVALID_GITHUB_USERNAME_ERROR);
            break;
          default:
            setError(GENERIC_ERROR);
        }
      } catch {
        setError(GENERIC_ERROR);
      }
    } else {
      setError(GENERIC_ERROR);
    }
  };

  /** Initial Setup */
  useEffect(() => {
    if (Object.keys(sanitizedConfig).length === 0) {
      setError(INVALID_CONFIG_ERROR);
    } else {
      setError(null);
      setTheme(getInitialTheme(sanitizedConfig.themeConfig));
      setupHotjar(sanitizedConfig.hotjar);
      loadData();
    }
  }, [sanitizedConfig, loadData]);

  /** Theme Switcher */
  useEffect(() => {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /** Motion Variants */
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <HelmetProvider>
      <div className="fade-in min-h-screen">
        {error ? (
          <ErrorPage status={error.status} title={error.title} subTitle={error.subTitle} />
        ) : (
          <>
            {/* Head Tag + Analytics */}
            <HeadTagEditor
              googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
              appliedTheme={theme}
            />

            <div className={`min-h-full ${BG_COLOR}`}>
              {/* ================= HERO SECTION ================= */}
              <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center relative">
                  {/* Theme Switch */}
                  <div className="absolute top-4 right-4">
                    {!sanitizedConfig.themeConfig.disableSwitch && (
                      <ThemeChanger
                        theme={theme}
                        setTheme={setTheme}
                        loading={loading}
                        themeConfig={sanitizedConfig.themeConfig}
                      />
                    )}
                  </div>

                  <div className="max-w-4xl mx-auto">
                    {profile && (
                      <div className="avatar mb-8">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={profile.avatar} alt={profile.name} />
                        </div>
                      </div>
                    )}

                    <h1 className="text-5xl font-bold mb-4 text-base-content">
                      Welcome to my Portfolio! 👋
                    </h1>

                    {profile && (
                      <>
                        <h2 className="text-3xl font-semibold mb-4 text-base-content opacity-80">
                          {profile.name}
                        </h2>
                        {profile.bio && (
                          <p className="text-xl mb-6 text-base-content opacity-70">
                            {profile.bio}
                          </p>
                        )}
                      </>
                    )}

                    <p className="text-lg mb-8 text-base-content opacity-60">
                      Feel free to explore my GitHub projects, publications, and other work below.
                    </p>

                    {/* Quick Links */}
                    <div className="flex justify-center gap-4 mb-8 flex-wrap">
                      {sanitizedConfig.social.email && (
                        <a
                          href={`mailto:${sanitizedConfig.social.email}`}
                          className="btn btn-outline btn-sm"
                        >
                          Email Me
                        </a>
                      )}
                      {sanitizedConfig.social.phone && (
                        <a
                          href={`tel:${sanitizedConfig.social.phone}`}
                          className="btn btn-outline btn-sm"
                        >
                          Call Me
                        </a>
                      )}
                      <a
                        href={`https://github.com/${sanitizedConfig.github.username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline btn-sm"
                      >
                        GitHub Profile
                      </a>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="mt-12">
                      <p className="text-sm text-base-content opacity-50 mb-2">
                        Scroll down to explore
                      </p>
                      <svg
                        className="w-6 h-6 mx-auto animate-bounce text-base-content opacity-50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= MAIN CONTENT ================= */}
              <div className="p-4 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28">

                  {/* Publications */}
                  {sanitizedConfig.publications.length > 0 && (
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <PublicationCard
                        loading={loading}
                        publications={sanitizedConfig.publications}
                      />
                    </motion.div>
                  )}

                  {/* GitHub Projects */}
                  {sanitizedConfig.projects.github.display && (
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.6, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <GithubProjectCard
                        header={sanitizedConfig.projects.github.header}
                        limit={sanitizedConfig.projects.github.automatic.limit}
                        githubProjects={githubProjects}
                        loading={loading}
                        username={sanitizedConfig.github.username}
                        googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
                      />
                    </motion.div>
                  )}

                  {/* External Projects */}
                  {sanitizedConfig.projects.external.projects.length > 0 && (
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <ExternalProjectCard
                        loading={loading}
                        header={sanitizedConfig.projects.external.header}
                        externalProjects={sanitizedConfig.projects.external.projects}
                        googleAnalyticId={sanitizedConfig.googleAnalytics.id}
                      />
                    </motion.div>
                  )}

                  {/* Blog */}
                  {sanitizedConfig.blog.display && (
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <BlogCard
                        loading={loading}
                        googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
                        blog={sanitizedConfig.blog}
                      />
                    </motion.div>
                  )}

                  {/* About Me */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="collapse collapse-arrow bg-base-100 shadow-lg">
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium">
                        More About Me
                      </div>
                      <div className="collapse-content">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                          {/* Avatar & Details */}
                          <div className="space-y-6">
                            <AvatarCard
                              profile={profile}
                              loading={loading}
                              avatarRing={sanitizedConfig.themeConfig.displayAvatarRing}
                              resumeFileUrl={sanitizedConfig.resume.fileUrl}
                            />
                            <DetailsCard
                              profile={profile}
                              loading={loading}
                              github={sanitizedConfig.github}
                              social={sanitizedConfig.social}
                            />
                          </div>

                          {/* Skills */}
                          {sanitizedConfig.skills.length > 0 && (
                            <SkillCard loading={loading} skills={sanitizedConfig.skills} />
                          )}

                          {/* Experience, Education, Certifications */}
                          <div className="space-y-6">
                            {sanitizedConfig.experiences.length > 0 && (
                              <ExperienceCard
                                loading={loading}
                                experiences={sanitizedConfig.experiences}
                              />
                            )}
                            {sanitizedConfig.educations.length > 0 && (
                              <EducationCard
                                loading={loading}
                                educations={sanitizedConfig.educations}
                              />
                            )}
                            {sanitizedConfig.certifications.length > 0 && (
                              <CertificationCard
                                loading={loading}
                                certifications={sanitizedConfig.certifications}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* ================= FOOTER ================= */}
              {sanitizedConfig.footer && (
                <motion.footer
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className={`mt-24 lg:mt-32 p-4 footer ${BG_COLOR} text-base-content footer-center`}
                >
                  <div className="card compact bg-base-100 shadow">
                    <Footer content={sanitizedConfig.footer} loading={loading} />
                  </div>
                </motion.footer>
              )}
            </div>
          </>
        )}
      </div>
    </HelmetProvider>
  );
};

export default GitProfile;
