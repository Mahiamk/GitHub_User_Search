import { FC } from 'react';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface ReposListProps {
  repos: Repo[];
}

const ReposList: FC<ReposListProps> = ({ repos }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Language colors for the language indicator
  const languageColors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Go: '#00ADD8',
    Rust: '#dea584',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89e051',
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Repositories</h2>
        
        <div className="space-y-4">
          {repos.length === 0 ? (
            <p className="text-gray-400">No repositories found.</p>
          ) : (
            repos.map((repo) => (
              <div key={repo.id} className="border border-gray-700 rounded-lg p-4 hover:bg-gray-800 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-purple-400 hover:underline"
                    >
                      {repo.name}
                    </a>
                    {repo.description && (
                      <p className="text-gray-400 mt-1">{repo.description}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
                      </svg>
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
                      </svg>
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  {repo.language && (
                    <div className="flex items-center">
                      <span 
                        className="w-3 h-3 rounded-full mr-1" 
                        style={{ backgroundColor: languageColors[repo.language] || '#8b949e' }}
                      ></span>
                      <span className="text-gray-400">{repo.language}</span>
                    </div>
                  )}
                  <div className="text-gray-500 dark:text-gray-400">
                    Updated on {formatDate(repo.updated_at)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReposList;