/**
 * GitHub API Utilities
 * 
 * This file contains utilities for interacting with GitHub's REST and GraphQL APIs
 * to fetch user data, repositories, commits, and contribution statistics.
 */

// Types for GitHub API responses
export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    url: string;
  } | null;
  topics: string[];
  visibility: string;
}

export interface GithubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  html_url: string;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface ContributionStats {
  totalCommits: number;
  currentStreak: number;
  longestStreak: number;
  contributionDays: ContributionDay[];
  globalRankPercentage: number;
}

/**
 * Get the authorization headers for GitHub API requests
 */
const getAuthHeaders = (): Record<string, string> => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json'
  };
  
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  
  return headers;
};

/**
 * Fetch a user's profile information from GitHub
 */
export const fetchGithubUser = async (username: string): Promise<GithubUser> => {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }
  
  return await response.json();
};

/**
 * Fetch a user's repositories from GitHub
 */
export const fetchUserRepositories = async (username: string, perPage = 100): Promise<GithubRepo[]> => {
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&sort=updated`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.statusText}`);
  }
  
  return await response.json();
};

/**
 * Fetch commits for a specific repository
 */
export const fetchRepositoryCommits = async (
  username: string,
  repo: string,
  perPage = 100
): Promise<GithubCommit[]> => {
  const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits?per_page=${perPage}`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    // If we get a 409, it might be an empty repository
    if (response.status === 409 || response.status === 404) {
      return [];
    }
    throw new Error(`Failed to fetch commits for ${repo}: ${response.statusText}`);
  }
  
  return await response.json();
};

/**
 * GraphQL response types
 */
export interface ContributionCalendarWeek {
  contributionDays: {
    date: string;
    contributionCount: number;
  }[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionCalendarWeek[];
}

export interface ContributionCollection {
  contributionCalendar: ContributionCalendar;
}

export interface GraphQLUserData {
  user: {
    contributionsCollection: ContributionCollection;
  };
}

/**
 * Fetch contribution data using GitHub's GraphQL API
 */
export const fetchContributionData = async (username: string): Promise<GraphQLUserData> => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  if (!token) {
    throw new Error('GitHub token is required for GraphQL API');
  }
  
  const query = `{
    user(login: "${username}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }`;
  
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query })
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch contribution data: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`GraphQL Error: ${data.errors[0].message}`);
  }
  
  return data.data;
};

/**
 * Calculate streak information from contribution data
 */
export const calculateStreakData = (contributionData: GraphQLUserData): { currentStreak: number; longestStreak: number } => {
  // Extract contribution days from the GraphQL response
  const weeks = contributionData.user.contributionsCollection.contributionCalendar.weeks;
  const allDays: ContributionDay[] = [];
  
  // Flatten the weeks array into a single array of days
  weeks.forEach((week: ContributionCalendarWeek) => {
    week.contributionDays.forEach((day: {date: string; contributionCount: number}) => {
      allDays.push({
        date: day.date,
        contributionCount: day.contributionCount
      });
    });
  });
  
  // Sort days by date (newest first)
  allDays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Calculate current streak (consecutive days with contributions, starting from today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < allDays.length; i++) {
    const day = allDays[i];
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);
    
    // Check if this is part of the current streak
    if (i === 0) {
      // First day in the list (most recent)
      if (dayDate.getTime() === today.getTime() && day.contributionCount > 0) {
        currentStreak = 1;
      } else if (dayDate.getTime() === today.getTime() - 86400000 && day.contributionCount > 0) {
        // Yesterday had contributions
        currentStreak = 1;
      } else {
        break; // No current streak
      }
    } else {
      // Check if this day is consecutive with the previous day
      const prevDay = allDays[i - 1];
      const prevDate = new Date(prevDay.date);
      prevDate.setHours(0, 0, 0, 0);
      
      if (dayDate.getTime() === prevDate.getTime() - 86400000 && day.contributionCount > 0) {
        currentStreak++;
      } else {
        break; // Streak is broken
      }
    }
  }
  
  // Calculate longest streak
  for (let i = 0; i < allDays.length; i++) {
    const day = allDays[i];
    
    if (day.contributionCount > 0) {
      tempStreak++;
      
      if (i < allDays.length - 1) {
        const nextDay = allDays[i + 1];
        const dayDate = new Date(day.date);
        const nextDate = new Date(nextDay.date);
        
        // Check if days are consecutive
        const diffTime = Math.abs(dayDate.getTime() - nextDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays !== 1) {
          // Streak is broken
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 0;
        }
      } else {
        // Last day in the array
        longestStreak = Math.max(longestStreak, tempStreak);
      }
    } else {
      // No contributions on this day
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 0;
    }
  }
  
  return { currentStreak, longestStreak };
};

/**
 * Calculate a global rank percentage based on user stats
 */
export const calculateGlobalRank = (user: GithubUser, totalCommits: number): number => {
  // This is a simplified ranking algorithm
  // In a real implementation, you might compare against actual GitHub statistics
  // or use a third-party API that provides ranking data
  
  const score = (
    user.followers * 2 + 
    totalCommits * 0.1 + 
    user.public_repos * 5 + 
    (new Date().getFullYear() - new Date(user.created_at).getFullYear()) * 10
  );
  
  // Map score to a percentile (simplified)
  // These thresholds are arbitrary and should be adjusted based on real data
  if (score > 5000) return 99; // Top 1%
  if (score > 2000) return 95; // Top 5%
  if (score > 1000) return 90; // Top 10%
  if (score > 500) return 80;  // Top 20%
  if (score > 200) return 70;  // Top 30%
  if (score > 100) return 50;  // Top 50%
  
  return 25; // Bottom 75%
};

/**
 * Fetch complete GitHub stats for a user
 */
export const fetchGithubStats = async (username: string): Promise<ContributionStats> => {
  try {
    // Fetch user data
    const userData = await fetchGithubUser(username);
    
    // Fetch repositories
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const repos = await fetchUserRepositories(username);
    
    // Fetch contribution data using GraphQL
    const contributionData = await fetchContributionData(username);
    
    // Calculate total commits from contribution data
    const totalContributions = contributionData.user.contributionsCollection.contributionCalendar.totalContributions;
    
    // Calculate streak data
    const { currentStreak, longestStreak } = calculateStreakData(contributionData);
    
    // Extract contribution days
    const weeks = contributionData.user.contributionsCollection.contributionCalendar.weeks;
    const contributionDays: ContributionDay[] = [];
    
    weeks.forEach((week: ContributionCalendarWeek) => {
      week.contributionDays.forEach((day: {date: string; contributionCount: number}) => {
        contributionDays.push({
          date: day.date,
          contributionCount: day.contributionCount
        });
      });
    });
    
    // Calculate global rank
    const globalRankPercentage = calculateGlobalRank(userData, totalContributions);
    
    return {
      totalCommits: totalContributions,
      currentStreak,
      longestStreak,
      contributionDays,
      globalRankPercentage
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    throw error;
  }
};