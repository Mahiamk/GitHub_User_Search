'use client';

import { useState } from 'react';
import UserProfile from '../components/UserProfile';
import ReposList from '../components/ReposList';
import ContributionStats from '../components/ContributionStats';
import { MonaOctocat, Copilot, Ducky, Star } from '../components/Characters';
import { 
  fetchGithubUser,
  fetchUserRepositories, 
  fetchGithubStats,
  GithubUser,
  GithubRepo,
  ContributionStats as ContributionStatsType 
} from '../utils/githubApi';

export default function Home() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [contributionStats, setContributionStats] = useState<ContributionStatsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);
    setRepos([]);
    setContributionStats(null);

    try {
      // Fetch user data using our GitHub API utility
      const userData = await fetchGithubUser(username);
      setUserData(userData);

      // Fetch repositories using our GitHub API utility
      const repos = await fetchUserRepositories(username, 10);
      setRepos(repos);

      // Fetch contribution stats using our GitHub API utility
      const stats = await fetchGithubStats(username);
      setContributionStats(stats);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #30363d 100%)'
    }}>
      {/* Animated Characters Floating */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Purple glow background */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-radial from-purple-500/20 to-transparent"></div>
        
        {/* Mona the Octocat */}
        <div className="absolute bottom-10 left-1/4 animate-float-slow">
          <MonaOctocat />
        </div>
        
        {/* Copilot */}
        <div className="absolute bottom-5 right-1/4 animate-float-medium">
          <Copilot />
        </div>
        
        {/* Ducky */}
        <div className="absolute bottom-8 left-1/2 animate-float-fast">
          <Ducky />
        </div>
        
        {/* Stars */}
        <Star size={10} top="30%" left="20%" delay="0s" />
        <Star size={8} top="25%" left="40%" delay="0.5s" />
        <Star size={12} top="35%" left="60%" delay="1s" />
        <Star size={6} top="20%" left="70%" delay="1.5s" />
        <Star size={9} top="40%" left="80%" delay="2s" />
        <Star size={7} top="15%" left="30%" delay="2.5s" />
        <Star size={11} top="45%" left="50%" delay="3s" />
        <Star size={8} top="25%" left="90%" delay="3.5s" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-8 flex flex-col justify-center min-h-screen">
        <div className="flex-grow"></div>
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-8 flex items-center justify-center gap-3 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub User Search
          </h1>

          
          <div className="flex max-w-md mx-auto">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter username..."
              className="flex-grow px-4 py-3 border border-gray-700 bg-gray-900 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              className="px-5 py-3 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </header>

        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-gray-800 border border-red-500 text-red-300 px-4 py-3 rounded max-w-md mx-auto mb-6">
            {error}
          </div>
        )}

        {userData && (
        <div className="flex flex-col gap-6 mt-8">
          {/* User Profile at the top */}
          <div className="w-full">
            <UserProfile user={{
              login: userData.login,
              name: userData.name || userData.login,
              avatar_url: userData.avatar_url,
              html_url: userData.html_url,
              bio: userData.bio || '',
              followers: userData.followers,
              following: userData.following,
              public_repos: userData.public_repos,
              location: userData.location || undefined,
              blog: userData.blog || undefined,
              company: userData.company || undefined,
              twitter_username: undefined,
              created_at: userData.created_at
            }} />
          </div>
          {/* Stats and Repos below */}
          <div className="w-full">
            {contributionStats && (
              <ContributionStats 
                totalCommits={contributionStats.totalCommits}
                currentStreak={contributionStats.currentStreak}
                longestStreak={contributionStats.longestStreak}
                contributionDays={contributionStats.contributionDays}
                globalRankPercentage={contributionStats.globalRankPercentage}
              />
            )}
            <ReposList repos={repos} />
          </div>
        </div>
      )}
        
        <div className="flex-grow"></div>
        
        {/* Copyright Footer */}
        <footer className="absolute bottom-0 right-0 text-gray-400 text-sm p-4">
          <p>
            © {new Date().getFullYear()} | Developed by <a 
              href="https://github.com/Mahiamk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Anwar-Koji
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
