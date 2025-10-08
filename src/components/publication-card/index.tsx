import { Fragment } from 'react';
import { SanitizedPublication } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import { FaBook, FaUniversity, FaUsers, FaExternalLinkAlt } from 'react-icons/fa';

const PublicationCard = ({
  publications,
  loading,
}: {
  publications: SanitizedPublication[];
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < publications.length; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="p-8 h-full w-full">
            <div className="flex items-center flex-col">
              <div className="w-full">
                <div className="px-4">
                  <div className="text-center w-full">
                    <h2 className="mb-2">
                      {skeleton({
                        widthCls: 'w-32',
                        heightCls: 'h-8',
                        className: 'mb-2 mx-auto',
                      })}
                    </h2>
                    <div>
                      {skeleton({
                        widthCls: 'w-20',
                        heightCls: 'h-4',
                        className: 'mb-2 mx-auto',
                      })}
                    </div>
                    <div>
                      {skeleton({
                        widthCls: 'w-20',
                        heightCls: 'h-4',
                        className: 'mb-2 mx-auto',
                      })}
                    </div>
                    <div>
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mb-2 mx-auto',
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

  const renderPublications = () => {
    return publications.map((item, index) => (
      <div
        className="card shadow-xl hover:shadow-2xl transition-all duration-300 bg-base-100 border-l-4 border-primary cursor-pointer hover:-translate-y-1"
        key={index}
        onClick={() => item.link && window.open(item.link, '_blank')}
      >
        <div className="card-body">
          {/* Header with Icon */}
          <div className="flex items-start gap-4">
            <div className="bg-primary bg-opacity-10 p-3 rounded-lg flex-shrink-0">
              <FaBook className="text-primary text-2xl" />
            </div>
            <div className="flex-grow">
              <h2 className="card-title text-lg mb-2 text-base-content hover:text-primary transition-colors">
                {item.title}
              </h2>
              
              {/* Conference/Journal Badge */}
              {(item.conferenceName || item.journalName) && (
                <div className="flex items-center gap-2 mb-3">
                  <FaUniversity className="text-sm text-base-content opacity-50" />
                  <span className="badge badge-ghost badge-sm">
                    {item.conferenceName || item.journalName}
                  </span>
                </div>
              )}

              {/* Authors */}
              {item.authors && (
                <div className="flex items-start gap-2 mb-3">
                  <FaUsers className="text-sm text-base-content opacity-50 mt-1 flex-shrink-0" />
                  <p className="text-sm text-base-content opacity-70 leading-relaxed">
                    {item.authors}
                  </p>
                </div>
              )}

              {/* Description */}
              {item.description && (
                <div className="mt-4 p-4 bg-base-200 rounded-lg">
                  <p className="text-sm text-base-content opacity-80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )}

              {/* Link indicator */}
              {item.link && (
                <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                  <span>Read Publication</span>
                  <FaExternalLinkAlt className="text-xs" />
                </div>
              )}
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
                    'Publications'
                  )}
                </h5>
              </div>
              <p className="text-base-content opacity-60 ml-7">
                Research papers and academic contributions
              </p>
            </div>

            {/* Publications Grid */}
            <div className="grid grid-cols-1 gap-6">
              {loading ? renderSkeleton() : renderPublications()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PublicationCard;