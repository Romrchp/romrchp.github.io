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
  // Color palette for publications
  const colors = [
    { bg: 'bg-blue-50', border: 'border-blue-500', icon: 'text-blue-500', badge: 'badge-info' },
    { bg: 'bg-purple-50', border: 'border-purple-500', icon: 'text-purple-500', badge: 'badge-secondary' },
    { bg: 'bg-green-50', border: 'border-green-500', icon: 'text-green-500', badge: 'badge-success' },
    { bg: 'bg-orange-50', border: 'border-orange-500', icon: 'text-orange-500', badge: 'badge-warning' },
  ];

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
    return publications.map((item, index) => {
      const color = colors[index % colors.length];
      
      return (
        <div
          className={`card shadow-xl hover:shadow-2xl transition-all duration-300 bg-base-100 border-l-4 ${color.border} cursor-pointer hover:-translate-y-1 overflow-hidden`}
          key={index}
          onClick={() => item.link && window.open(item.link, '_blank')}
        >
          <div className="card-body">
            {/* Header with Colored Icon */}
            <div className="flex items-start gap-4">
              <div className={`${color.bg} p-4 rounded-xl flex-shrink-0 shadow-md`}>
                <FaBook className={`${color.icon} text-3xl`} />
              </div>
              <div className="flex-grow">
                <h2 className="card-title text-xl mb-3 text-base-content hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h2>
                
                {/* Conference/Journal Badge */}
                {(item.conferenceName || item.journalName) && (
                  <div className="flex items-center gap-2 mb-3">
                    <FaUniversity className={`text-sm ${color.icon}`} />
                    <span className={`badge ${color.badge} badge-lg font-medium`}>
                      {item.conferenceName || item.journalName}
                    </span>
                  </div>
                )}

                {/* Authors */}
                {item.authors && (
                  <div className="flex items-start gap-2 mb-4">
                    <FaUsers className={`text-sm ${color.icon} mt-1 flex-shrink-0`} />
                    <p className="text-sm text-base-content opacity-70 leading-relaxed">
                      {item.authors}
                    </p>
                  </div>
                )}

                {/* Description */}
                {item.description && (
                  <div className={`mt-4 p-4 ${color.bg} rounded-lg border-l-2 ${color.border}`}>
                    <p className="text-sm text-base-content opacity-90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}

                {/* Link indicator */}
                {item.link && (
                  <div className={`mt-4 flex items-center gap-2 ${color.icon} text-sm font-semibold`}>
                    <span>Read Publication</span>
                    <FaExternalLinkAlt className="text-xs" />
                  </div>
                )}
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
            {/* Section Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-10 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <h5 className="text-4xl font-bold text-base-content">
                  {loading ? (
                    skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
                  ) : (
                    'Publications'
                  )}
                </h5>
              </div>
              <p className="text-base-content opacity-60 ml-9 text-lg">
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