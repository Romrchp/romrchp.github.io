import { Fragment } from 'react';
import { AiOutlineFork, AiOutlineStar, AiOutlineCode } from 'react-icons/ai';
import { MdInsertLink } from 'react-icons/md';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { ga, getLanguageColor, skeleton } from '../../utils';
import { GithubProject } from '../../interfaces/github-project';

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
  if (!loading && githubProjects.length === 0) {
    return null;
  }

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < limit; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="flex justify-between flex-col p-8 h-full w-full">
            <div>
              <div className="flex items-center">
                <span>
                  <h5 className="card-title text-lg">
                    {skeleton({
                      widthCls: 'w-32',
                      heightCls: 'h-8',
                      className: 'mb-1',
                    })}
                  </h5>
                </span>
              </div>
              <div className="mb-5 mt-1">
                {skeleton({
                  widthCls: 'w-full',
                  heightCls: 'h-4',
                  className: 'mb-2',
                })}
                {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-grow">
                <span className="mr-3 flex items-center">
                  {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
                </span>
                <span className="flex items-center">
                  {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
                </span>
              </div>
              <div>
                <span className="flex items-center">
                  {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
                </span>
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return array;
  };

  const renderProjects = () => {
    return githubProjects.map((item, index) => (
      <div
        className="card shadow-xl hover:shadow-2xl transition-all duration-300 bg-base-100 cursor-pointer hover:-translate-y-1 border border-base-300 hover:border-primary"
        key={index}
        onClick={(e) => {
          e.preventDefault();

          try {
            if (googleAnalyticsId) {
              ga.event('Click project', {
                project: item.name,
              });
            }
          } catch (error) {
            console.error(error);
          }

          window?.open(item.html_url, '_blank');
        }}
      >
        <div className="card-body">
          {/* Project Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-primary bg-opacity-10 p-3 rounded-lg flex-shrink-0">
              <AiOutlineCode className="text-primary text-2xl" />
            </div>
            <div className="flex-grow min-w-0">
              <h2 className="card-title text-lg flex items-center gap-2 text-base-content hover:text-primary transition-colors">
                <span className="truncate">{item.name}</span>
                <FaExternalLinkAlt className="text-xs flex-shrink-0" />
              </h2>
              {/* Language Badge */}
              {item.language && (
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getLanguageColor(item.language) }}
                  />
                  <span className="badge badge-sm badge-ghost">{item.language}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div className="mb-4">
              <p className="text-base-content opacity-70 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          )}

          {/* Stats Bar */}
          <div className="flex items-center gap-4 pt-4 border-t border-base-300">
            <div className="flex items-center gap-2 text-base-content opacity-60">
              <AiOutlineStar className="text-warning" />
              <span className="text-sm font-medium">{item.stargazers_count}</span>
              <span className="text-xs opacity-50">stars</span>
            </div>
            <div className="flex items-center gap-2 text-base-content opacity-60">
              <AiOutlineFork className="text-info" />
              <span className="text-sm font-medium">{item.forks_count}</span>
              <span className="text-xs opacity-50">forks</span>
            </div>
          </div>

          {/* Hover Indicator */}
          <div className="mt-3 flex items-center gap-2 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <MdInsertLink />
            <span>View on GitHub</span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="grid grid-cols-1 gap-6">
          <div className="col-span-1">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-primary rounded-full"></div>
                  <h5 className="text-3xl font-bold text-base-content">
                    {loading ? (
                      skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
                    ) : (
                      header
                    )}
                  </h5>
                </div>
                <p className="text-base-content opacity-60 ml-7">
                  Open source projects and code repositories
                </p>
              </div>
              {!loading && (
                <a
                  href={`https://github.com/${username}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-sm gap-2"
                >
                  View All
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              )}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? renderSkeleton() : renderProjects()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GithubProjectCard;