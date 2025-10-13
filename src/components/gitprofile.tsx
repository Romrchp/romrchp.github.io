import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { formatDistance } from 'date-fns';
import {
  CustomError,
  GENERIC_ERROR,
  INVALID_CONFIG_ERROR,
  INVALID_GITHUB_USERNAME_ERROR,
  setTooManyRequestError,
} from '../constants/errors';
import { HelmetProvider } from 'react-helmet-async';
import '../assets/index.css';
import { getInitialTheme, getSanitizedConfig, setupHotjar } from '../utils';
import { SanitizedConfig } from '../interfaces/sanitized-config';
import ErrorPage from './error-page';
import HeadTagEditor from './head-tag-editor';
import { DEFAULT_THEMES } from '../constants/default-themes';
import ThemeChanger from './theme-changer';
import { BG_COLOR } from '../constants';
import { Profile } from '../interfaces/profile';
import { GithubProject } from '../interfaces/github-project';
import GithubProjectCard from './github-project-card';
import ExternalProjectCard from './external-project-card';
import BlogCard from './blog-card';
import Footer from './footer';
import PublicationCard from './publication-card';

const GitProfile = ({ config }: { config: Config }) => {
  const [sanitizedConfig] = useState<SanitizedConfig | Record<string, never>>(
    getSanitizedConfig(config),
  );
  const [theme, setTheme] = useState<string>(DEFAULT_THEMES[0]);
  const [error, setError] = useState<CustomError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [githubProjects, setGithubProjects] = useState<GithubProject[]>([]);
  const [emailOpen, setEmailOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getGithubProjects = useCallback(
    async (publicRepoCount: number): Promise<GithubProject[]> => {
      if (sanitizedConfig.projects.github.mode === 'automatic') {
        if (publicRepoCount === 0) return [];

        const excludeRepo =
          sanitizedConfig.projects.github.automatic.exclude.projects
            .map((project) => `+-repo:${project}`)
            .join('');

        const query = `user:${sanitizedConfig.github.username}+fork:${!sanitizedConfig.projects.github.automatic.exclude.forks}${excludeRepo}`;
        const url = `https://api.github.com/search/repositories?q=${query}&sort=${sanitizedConfig.projects.github.automatic.sortBy}&per_page=${sanitizedConfig.projects.github.automatic.limit}&type=Repositories`;

        const repoResponse = await axios.get(url, {
          headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        });
        return repoResponse.data.items;
      } else {
        const projects = sanitizedConfig.projects.github.manual.projects;
        if (projects.length === 0) return [];

        const results: GithubProject[] = [];
        for (const project of projects) {
          try {
            const res = await axios.get(`https://api.github.com/repos/${project}`, {
              headers: { 'Content-Type': 'application/vnd.github.v3+json' },
            });
            results.push(res.data);
          } catch (err) {
            console.error(`Error fetching ${project}:`, err);
          }
        }
        return results;
      }
    },
    [sanitizedConfig],
  );

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/users/${sanitizedConfig.github.username}`,
      );
      const data = response.data;

      setProfile({
        avatar: data.avatar_url,
        name: data.name || ' ',
        bio: data.bio || '',
        location: data.location || '',
        company: data.company || '',
      });

      if (!sanitizedConfig.projects.github.display) return;
      setGithubProjects(await getGithubProjects(data.public_repos));
    } catch (error) {
      handleError(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  }, [sanitizedConfig, getGithubProjects]);

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

  useEffect(() => {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleError = (error: AxiosError | Error): void => {
    console.error('Error:', error);
    if (error instanceof AxiosError) {
      try {
        const reset = formatDistance(
          new Date(error.response?.headers?.['x-ratelimit-reset'] * 1000),
          new Date(),
          { addSuffix: true },
        );
        if (typeof error.response?.status === 'number') {
          switch (error.response.status) {
            case 403:
              setError(setTooManyRequestError(reset));
              break;
            case 404:
              setError(INVALID_GITHUB_USERNAME_ERROR);
              break;
            default:
              setError(GENERIC_ERROR);
          }
        } else setError(GENERIC_ERROR);
      } catch {
        setError(GENERIC_ERROR);
      }
    } else setError(GENERIC_ERROR);
  };

  // Accepts string | undefined and safely returns if undefined.
  const handleCopyEmail = (email?: string) => {
    if (!email) return;
    try {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      console.error('Clipboard copy failed', err);
    }
  };

  return (
    <HelmetProvider>
      <div className="fade-in min-h-screen">
        {error ? (
          <ErrorPage {...error} />
        ) : (
          <>
            <HeadTagEditor
              googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
              appliedTheme={theme}
            />
            <div className={`min-h-full ${BG_COLOR}`}>
              {/* Hero Section */}
              <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                  <div className="max-w-4xl relative">
                    {/* Theme Switcher */}
                    {!sanitizedConfig.themeConfig.disableSwitch && (
                      <div className="absolute top-4 right-4">
                        <ThemeChanger
                          theme={theme}
                          setTheme={setTheme}
                          loading={loading}
                          themeConfig={sanitizedConfig.themeConfig}
                        />
                      </div>
                    )}

                    {/* Avatar */}
                    {profile && (
                      <div className="avatar mb-8">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={profile.avatar} alt={profile.name} />
                        </div>
                      </div>
                    )}

                    {/* Welcome Text */}
                    <h1 className="text-5xl font-bold mb-4 text-base-content">
                      Welcome to my Portfolio 👋
                    </h1>

                    {profile && (
                      <>
                        <h2 className="text-3xl font-semibold mb-4 text-base-content opacity-80">
                          {profile.name}, Life Sciences Engineer - EPFL 2025 Graduate
                        </h2>
                        {profile.bio && (
                          <p className="text-xl mb-6 text-base-content opacity-70">
                            {profile.bio}
                          </p>
                        )}
                      </>
                    )}

                    <p className="text-lg mb-8 text-base-content opacity-60">
                      Explore my projects, publications, and more below!
                    </p>

                    {/* Contact Buttons */}
                    <div className="flex justify-center gap-4 mb-8 flex-wrap relative">
                      {sanitizedConfig.social.email && (
                        <div className="relative">
                          <button
                            className="btn btn-outline btn-sm transition-transform hover:scale-105"
                            onClick={() => setEmailOpen(!emailOpen)}
                          >
                            Email Me
                          </button>

                          {/* Floating Email Card */}
                          <div
                            className={`absolute left-1/2 -translate-x-1/2 mt-3 bg-base-100/90 backdrop-blur-md text-base-content rounded-2xl shadow-xl border border-base-300 px-4 py-3 w-64 transition-all duration-300 ${
                              emailOpen
                                ? 'opacity-100 visible translate-y-0'
                                : 'opacity-0 invisible -translate-y-2'
                            }`}
                          >
                            <p className="text-sm font-medium text-center mb-2 break-all">
                              {sanitizedConfig.social.email}
                            </p>

                            {/* Buttons - guard before calling */}
                            <div className="flex justify-center gap-2">
                              <button
                                className="btn btn-xs btn-primary"
                                onClick={() =>
                                  sanitizedConfig.social.email &&
                                  handleCopyEmail(sanitizedConfig.social.email)
                                }
                              >
                                {copied ? 'Copied!' : 'Copy'}
                              </button>

                              <a
                                href={
                                  sanitizedConfig.social.email
                                    ? `mailto:${sanitizedConfig.social.email}`
                                    : '#'
                                }
                                className="btn btn-xs btn-outline"
                              >
                                Compose
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      <a
                        href={`https://github.com/${sanitizedConfig.github.username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline btn-sm transition-transform hover:scale-105"
                      >
                        GitHub Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="p-4 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-24">
                  {/* Publications */}
                  {sanitizedConfig.publications.length !== 0 && (
                    <PublicationCard
                      loading={loading}
                      publications={sanitizedConfig.publications}
                    />
                  )}

                  {/* GitHub Projects */}
                  {sanitizedConfig.projects.github.display && (
                    <GithubProjectCard
                      header={sanitizedConfig.projects.github.header}
                      limit={sanitizedConfig.projects.github.automatic.limit}
                      githubProjects={githubProjects}
                      loading={loading}
                      username={sanitizedConfig.github.username}
                      googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
                    />
                  )}

                  {/* External Projects */}
                  {sanitizedConfig.projects.external.projects.length !== 0 && (
                    <ExternalProjectCard
                      loading={loading}
                      header={sanitizedConfig.projects.external.header}
                      externalProjects={sanitizedConfig.projects.external.projects}
                      googleAnalyticId={sanitizedConfig.googleAnalytics.id}
                    />
                  )}

                  {/* Blog */}
                  {sanitizedConfig.blog.display && (
                    <BlogCard
                      loading={loading}
                      googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
                      blog={sanitizedConfig.blog}
                    />
                  )}
                </div>
              </div>

              {/* Footer */}
              {sanitizedConfig.footer && (
                <footer
                  className={`p-4 footer ${BG_COLOR} text-base-content footer-center mt-24`}
                >
                  <div className="card compact bg-base-100 shadow">
                    <Footer content={sanitizedConfig.footer} loading={loading} />
                  </div>
                </footer>
              )}
            </div>
          </>
        )}
      </div>
    </HelmetProvider>
  );
};

export default GitProfile;
