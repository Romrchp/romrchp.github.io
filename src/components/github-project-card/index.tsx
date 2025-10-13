import { Fragment } from 'react';
import { AiOutlineFork, AiOutlineStar } from 'react-icons/ai';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { ga, getLanguageColor, skeleton } from '../../utils';
import { GithubProject } from '../../interfaces/github-project';

import IMAGES from '../../../gitprofile-images.json';
import TITLES from '../../../gitprofile-titles.json';

const GithubProjectCard = ({
  header,
  githubProjects,
  loading,
  limit,
  username,
  googleAnalyticsId,
}: {
  header: string;
  githubProjects: GithubProject[];
  loading: boolean;
  limit: number;
  username: string;
  googleAnalyticsId?: string;
}) => {
  if (!loading && githubProjects.length === 0) return null;

  // Helper function to get project visual (image or gradient)
  const getProjectVisual = (projectName: string) => {
    const imageMap: Record<string, string> = IMAGES;

    if (imageMap[projectName]) {
      return { type: 'image' as const, value: imageMap[projectName] };
    }

    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-yellow-500 to-orange-500',
    ];

    const index = projectName
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return { type: 'gradient' as const, value: gradients[index % gradients.length] };
  };

  const getProjectTitle = (projectName: string) => {
    const titleMap: Record<string, string> = TITLES;
    return titleMap[projectName] || projectName;
  };

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < limit; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="flex justify-between flex-col p-8 h-full w-full">
            <div>
              <div className="flex items-center">
                <h5 className="card-title text-lg">
                  {skeleton({ widthCls: 'w-32', heightCls: 'h-8', className: 'mb-1' })}
                </h5>
              </div>
              <div className="mb-5 mt-1">
                {skeleton({ widthCls: 'w-full', heightCls: 'h-4', className: 'mb-2' })}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return array;
  };

  const renderProjects = () => {
    return githubProjects.map((item, index) => {
      const visual = getProjectVisual(item.name);
      const displayTitle = getProjectTitle(item.name);

      return (
        <div
          className="card shadow-xl hover:shadow-2xl transition-all duration-300 bg-base-100 cursor-pointer hover:-translate-y-1 overflow-hidden group"
          key={index}
          onClick={(e) => {
            e.preventDefault();
            try {
              if (googleAnalyticsId) {
                ga.event('Click project', { project: item.name });
              }
            } catch (error) {
              console.error(error);
            }
            window?.open(item.html_url, '_blank');
          }}
        >
          {/* Visual Header */}
          <div
            className="relative h-32 overflow-hidden"
            style={
              visual.type === 'image'
                ? { backgroundImage: `url(${visual.value})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : {}
            }
          >
            {visual.type === 'gradient' && (
              <div className={`absolute inset-0 bg-gradient-to-br ${visual.value}`}></div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>

            {item.language && (
              <div className="absolute top-3 right-3 flex items-center gap-2 bg-base-100 bg-opacity-90 px-3 py-1 rounded-full shadow-md">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: getLanguageColor(item.language) }}
                />
                <span className="text-xs font-semibold text-base-content">{item.language}</span>
              </div>
            )}
          </div>

          <div className="card-body">
            {/* Project Title */}
            <h2 className="card-title text-lg flex items-center justify-between text-base-content hover:text-primary transition-colors mb-2">
              <span className="whitespace-normal break-words">{displayTitle}</span>
              <FaExternalLinkAlt className="text-xs flex-shrink-0 opacity-50" />
            </h2>

            {item.description && (
              <p className="text-base-content opacity-70 text-sm leading-relaxed mb-2 line-clamp-2">
                {item.description}
              </p>
            )}

            {item.topics && item.topics.length > 0 && (
              <div className="flex flex-col mb-4">
                <span className="text-sm font-semibold text-base-content mb-1">Keywords:</span>
                <div className="flex flex-wrap gap-2">
                  {item.topics.slice(0, 5).map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="badge badge-sm bg-primary bg-opacity-10 text-primary border-primary border-opacity-20 font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                  {item.topics.length > 5 && (
                    <span className="badge badge-sm badge-ghost">+{item.topics.length - 5} more</span>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-base-300 mt-auto">
              <div className="flex items-center gap-2 text-base-content">
                <AiOutlineStar className="text-yellow-500 text-lg" />
                <span className="text-sm font-semibold">{item.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-2 text-base-content">
                <AiOutlineFork className="text-blue-500 text-lg" />
                <span className="text-sm font-semibold">{item.forks_count}</span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="grid grid-cols-1 gap-6">
          <div className="col-span-1">
            <div className="flex items-center justify-between mb-10">
              <div>
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-10 bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-600 rounded-full"></div>
                  <h5 className="text-4xl font-bold text-base-content tracking-tight">
                    {loading ? skeleton({ widthCls: 'w-40', heightCls: 'h-8' }) : header}
                  </h5>
                </div>
                <p className="ml-9 mt-1 text-lg font-medium text-base-content/90 tracking-wide leading-relaxed">
                  A selection of projects conducted during my academic journey, blending theory and practice.
                </p>
              </div>
              {!loading && (
                <a
                  href={`https://github.com/${username}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-primary gap-2"
                >
                  View All on GitHub
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              )}
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loading ? renderSkeleton() : renderProjects()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GithubProjectCard;
