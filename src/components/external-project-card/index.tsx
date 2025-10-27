import { Fragment } from 'react';
import LazyImage from '../lazy-image';
import { ga, skeleton } from '../../utils';
import { SanitizedExternalProject } from '../../interfaces/sanitized-config';
import { FaExternalLinkAlt, FaLaptopCode } from 'react-icons/fa';

const ExternalProjectCard = ({
  externalProjects,
  header,
  loading,
  googleAnalyticId,
}: {
  externalProjects: SanitizedExternalProject[];
  header: string;
  loading: boolean;
  googleAnalyticId?: string;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < externalProjects.length; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="p-8 h-full w-full">
            <div className="flex items-center flex-col">
              <div className="w-full">
                <div className="flex items-start px-4">
                  <div className="w-full">
                    <h2>
                      {skeleton({
                        widthCls: 'w-32',
                        heightCls: 'h-8',
                        className: 'mb-2 mx-auto',
                      })}
                    </h2>
                    <div className="avatar w-full h-full">
                      <div className="w-24 h-24 mask mask-squircle mx-auto">
                        {skeleton({
                          widthCls: 'w-full',
                          heightCls: 'h-full',
                          shape: '',
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return array;
  };

  const renderExternalProjects = () => {
    return externalProjects.map((item, index) => (
      <div
        className="card shadow-xl hover:shadow-2xl transition-all duration-300 bg-base-100 cursor-pointer hover:-translate-y-1 overflow-hidden group"
        key={index}
        onClick={(e) => {
          e.preventDefault();

          try {
            if (googleAnalyticId) {
              ga.event('Click External Project', {
                post: item.title,
              });
            }
          } catch (error) {
            console.error(error);
          }

          window?.open(item.link, '_blank');
        }}
      >
        {/* Image Section */}
        {/* Image Section */}
        {item.imageUrl ? (
          <figure className="relative bg-base-200 flex items-center justify-center p-4">
            <LazyImage
              src={item.imageUrl}
              alt={item.title}
              className="max-h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              placeholder={skeleton({
                widthCls: 'w-full',
                heightCls: 'h-40',
                shape: '',
              })}
            />
          </figure>
        ) : (
          <div className="relative h-52 bg-base-100 flex items-center justify-center rounded-lg border border-base-200 overflow-hidden">
            <FaLaptopCode className="text-gray-400 text-6xl opacity-60" />
          </div>
        )}
        

        <div className="card-body">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-grow">
              <h2 className="card-title text-xl text-base-content group-hover:text-primary transition-colors mb-2">
                {item.title}
              </h2>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div className="mb-4">
              <p className="text-base-content opacity-80 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          )}

          {/* Link indicator */}
          <div className="mt-auto pt-4 border-t border-primary border-opacity-20">
            <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
              <span>Explore</span>
              <FaExternalLinkAlt className="text-xs" />
            </div>
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
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-10 bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-600 rounded-full"></div>
                  <h5 className="text-4xl font-bold text-base-content tracking-tight">
                    {loading
                      ? skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
                      : header}
                  </h5>
                </div>

                {/* ✨ Updated Subtitle */}
                <p className="ml-9 mt-1 text-lg font-medium text-base-content/90 tracking-wide leading-relaxed">
                  Other additional featured projects and web applications.
                </p>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? renderSkeleton() : renderExternalProjects()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ExternalProjectCard;
