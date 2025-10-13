import { Fragment } from 'react';
import { SanitizedPublication } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import { FaUniversity, FaUsers, FaExternalLinkAlt } from 'react-icons/fa';

const PublicationCard = ({
  publications,
  loading,
}: {
  publications: SanitizedPublication[];
  loading: boolean;
}) => {
  const colors = [
    'border-blue-500',
    'border-purple-500',
    'border-green-500',
    'border-orange-500',
  ];

  const renderSkeleton = () => {
    return publications.map((_, index) => (
      <div className="card shadow-sm bg-base-100" key={index}>
        <div className="p-6">
          {skeleton({ widthCls: 'w-3/4', heightCls: 'h-6', className: 'mb-3' })}
          {skeleton({ widthCls: 'w-1/2', heightCls: 'h-4', className: 'mb-2' })}
          {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
        </div>
      </div>
    ));
  };

  const renderPublications = () =>
    publications.map((item, index) => {
      const color = colors[index % colors.length];
      return (
        <div
          key={index}
          className={`card bg-base-100 shadow-md hover:shadow-lg border-l-4 ${color} transition-all duration-300 hover:-translate-y-0.5 cursor-pointer`}
          onClick={() => item.link && window.open(item.link, '_blank')}
        >
          <div className="card-body space-y-3">
            {/* Title */}
            <h2 className="text-xl font-semibold text-base-content leading-snug hover:text-primary transition-colors">
              {item.title}
            </h2>

            {/* Journal / Conference */}
            {(item.conferenceName || item.journalName) && (
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <FaUniversity className="opacity-70" />
                <span>{item.conferenceName || item.journalName}</span>
              </div>
            )}

            {/* Authors */}
            {item.authors && (
              <div className="flex items-start gap-2 text-sm text-base-content/70">
                <FaUsers className="opacity-70 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">{item.authors}</p>
              </div>
            )}

            {/* Description */}
            {item.description && (
              <p className="text-sm text-base-content/80 leading-relaxed border-l-2 pl-3 border-base-300">
                {item.description}
              </p>
            )}

            {/* Link */}
            {item.link && (
              <div className="flex items-center gap-2 text-sm font-medium text-primary mt-2">
                <FaExternalLinkAlt className="text-xs" />
                <span>View publication</span>
              </div>
            )}
          </div>
        </div>
      );
    });

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
                      : 'Publications'}
                  </h5>
                </div>

                {/* ✨ Updated Subtitle */}
                <p className="ml-9 mt-1 text-lg font-medium text-base-content/90 tracking-wide leading-relaxed">
                  Research papers and academic contributions showcasing collaborative and independent work.
                </p>
              </div>
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
