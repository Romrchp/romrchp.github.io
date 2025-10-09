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
  const accentColors = [
    'border-blue-600',
    'border-indigo-600',
    'border-slate-600',
    'border-emerald-600',
  ];

  const renderSkeleton = () => {
    return publications.map((_, index) => (
      <div className="card shadow-sm bg-base-100" key={index}>
        <div className="p-6 space-y-3">
          {skeleton({ widthCls: 'w-3/4', heightCls: 'h-6' })}
          {skeleton({ widthCls: 'w-1/2', heightCls: 'h-4' })}
          {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
        </div>
      </div>
    ));
  };

  const renderPublications = () =>
    publications.map((item, index) => {
      const accent = accentColors[index % accentColors.length];

      return (
        <div
          key={index}
          className={`card bg-base-100 border-l-4 ${accent} shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer`}
          onClick={() => item.link && window.open(item.link, '_blank')}
        >
          <div className="card-body py-6 px-6 space-y-3">
            {/* Title */}
            <h2 className="text-xl font-serif font-semibold text-base-content leading-snug hover:text-primary transition-colors">
              {item.title}
            </h2>

            {/* Journal / Conference */}
            {(item.conferenceName || item.journalName) && (
              <div className="flex items-center gap-2 text-sm text-base-content/70 italic">
                <FaUniversity className="text-xs opacity-60" />
                <span>{item.conferenceName || item.journalName}</span>
              </div>
            )}

            {/* Authors */}
            {item.authors && (
              <div className="flex items-start gap-2 text-sm text-base-content/70">
                <FaUsers className="text-xs opacity-60 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">{item.authors}</p>
              </div>
            )}

            {/* Description */}
            {item.description && (
              <p className="text-[15px] text-base-content/80 leading-relaxed mt-3">
                {item.description}
              </p>
            )}

            {/* Link */}
            {item.link && (
              <div className="flex items-center gap-2 text-sm font-medium text-primary mt-3">
                <FaExternalLinkAlt className="text-xs" />
                <span>Read publication</span>
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
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                <h5 className="text-4xl font-bold text-base-content font-serif">
                  {loading ? skeleton({ widthCls: 'w-40', heightCls: 'h-8' }) : 'Publications'}
                </h5>
              </div>
              <p className="text-base-content opacity-70 ml-9 text-lg font-light">
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
