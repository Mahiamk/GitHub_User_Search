import { NextRequest, NextResponse } from 'next/server';

interface GitHubActivity {
  lastCommitDays: number;
  hasOpenIssues: boolean;
  hasPullRequests: boolean;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    // In a real application with a GitHub token, we would:
    // 1. Check the user's recent commits to determine streak
    // 2. Check for open issues assigned to the user
    // 3. Check for open pull requests created by or assigned to the user
    
    // For this demo, we'll use the stats endpoint for commit data
    // and simulate the issues and PRs data
    const statsResponse = await fetch(
      `${request.nextUrl.origin}/api/github/stats?username=${username}`,
      { headers: { 'Accept': 'application/json' } }
    );
    
    if (!statsResponse.ok) {
      throw new Error('Failed to fetch user stats');
    }
    
    const statsData = await statsResponse.json();
    
    // Determine if the user has committed recently based on current streak
    // If currentStreak > 0, they've committed recently
    const lastCommitDays = statsData.currentStreak > 0 ? 0 : 1;
    
    // For demo purposes, we'll simulate having open issues and PRs
    // In a real app with a GitHub token, we would fetch this data from GitHub API
    const usernameHash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hasOpenIssues = (usernameHash % 3 === 0); // Roughly 1/3 chance
    const hasPullRequests = (usernameHash % 4 === 0); // Roughly 1/4 chance
    
    const activityData: GitHubActivity = {
      lastCommitDays,
      hasOpenIssues,
      hasPullRequests
    };
    
    return NextResponse.json(activityData);
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity data' },
      { status: 500 }
    );
  }
}