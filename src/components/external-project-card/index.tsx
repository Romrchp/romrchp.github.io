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
                    <div className="mt-2">
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mx-auto',
                      })}
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
        {item.imageUrl && (
          <figure className="relative h-48 overflow-hidden bg-base-200">
            <LazyImage
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              placeholder={skeleton({
                widthCls: 'w-full',
                heightCls: 'h-full',
                shape: '',
              })}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-base-100 rounded-full p-3">
                <FaExternalLinkAlt className="text-primary text-xl" />
              </div>
            </div>
          </figure>
        )}

        <div className="card-body">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            {!item.imageUrl && (
              <div className="bg-primary bg-opacity-10 p-3 rounded-lg flex-shrink-0">
                <FaLaptopCode className="text-primary text-2xl" />
              </div>
            )}
            <div className="flex-grow">
              <h2 className="card-title text-lg text-base-content hover:text-primary transition-colors mb-2">
                {item.title}
              </h2>
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

          {/* Link indicator */}
          <div className="mt-auto pt-4 border-t border-base-300">
            <div className="flex items-center gap-2 text-primary text-sm font-medium">
              <span>View Project</span>
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
            <div className="mb-6">
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
                Featured projects and web applications
              </p>
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