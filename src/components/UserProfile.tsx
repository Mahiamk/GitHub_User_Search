import Image from 'next/image';
import { FC } from 'react';

interface UserProfileProps {
  user: {
    login: string;
    name: string;
    avatar_url: string;
    html_url: string;
    bio: string;
    followers: number;
    following: number;
    public_repos: number;
    location?: string;
    blog?: string;
    company?: string;
    twitter_username?: string;
    created_at: string;
  };
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row items-center md:items-start p-6">
        <div className="md:flex-shrink-0 mb-6 md:mb-0 md:mr-8">
          <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-gray-700">
            <Image 
              src={user.avatar_url} 
              alt={`${user.login}'s avatar`} 
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white text-center md:text-left">{user.name || user.login}</h2>
              <p className="text-gray-400 text-center md:text-left">@{user.login}</p>
            </div>
            <a 
              href={user.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
            >
              View Profile
            </a>
          </div>
          
          {user.bio && (
            <p className="text-gray-300 mb-4 text-center md:text-left">{user.bio}</p>
          )}
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
            <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-center min-w-[100px]">
              <div className="text-xl font-bold text-white">{user.followers}</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-center min-w-[100px]">
              <div className="text-xl font-bold text-white">{user.following}</div>
              <div className="text-sm text-gray-400">Following</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-center min-w-[100px]">
              <div className="text-xl font-bold text-white">{user.public_repos}</div>
              <div className="text-sm text-gray-400">Repositories</div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {user.location && (
              <div className="flex items-center text-gray-300">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{user.location}</span>
              </div>
            )}
            
            {user.blog && (
              <div className="flex items-center text-gray-300 ml-0 md:ml-4">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                  {user.blog}
                </a>
              </div>
            )}
            
            {user.company && (
              <div className="flex items-center text-gray-300 ml-0 md:ml-4">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                <span>{user.company}</span>
              </div>
            )}
            
            {user.twitter_username && (
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  @{user.twitter_username}
                </a>
              </div>
            )}
            
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Joined {formatDate(user.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;