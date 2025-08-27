import { FC, useMemo } from 'react';
import { ContributionDay } from '../utils/githubApi';

interface ContributionStatsProps {
  totalCommits: number;
  currentStreak: number;
  longestStreak: number;
  contributionDays?: ContributionDay[];
  globalRankPercentage?: number;
}

const ContributionStats: FC<ContributionStatsProps> = ({ 
  totalCommits,
  currentStreak,
  longestStreak,
  contributionDays = [],
  globalRankPercentage
}) => {
  // Generate contribution heatmap data
  const contributionHeatmap = useMemo(() => {
    if (!contributionDays || contributionDays.length === 0) {
      return [];
    }

    // Sort contribution days by date
    const sortedDays = [...contributionDays].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Get the last 12 months of data (approximately 365 days)
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const recentDays = sortedDays.filter(day => 
      new Date(day.date).getTime() >= oneYearAgo.getTime()
    );

    // Create a map of all dates in the last year with their contribution counts
    const contributionMap = new Map<string, number>();
    recentDays.forEach(day => {
      contributionMap.set(day.date, day.contributionCount);
    });
    
    // Generate a complete grid for the last year
    const weeks: Array<Array<{date: string, count: number}>> = [];
    const startDate = new Date(oneYearAgo);
    // Adjust to start from the beginning of the week (Sunday)
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);
    
    // eslint-disable-next-line prefer-const
    let currentDate = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    while (currentDate <= today) {
      // Start a new week on Sunday
      if (currentDate.getDay() === 0) {
        weeks.push([]);
      }
      
      const dateString = currentDate.toISOString().split('T')[0];
      const count = contributionMap.get(dateString) || 0;
      
      // Add to the current week
      if (weeks.length > 0) {
        weeks[weeks.length - 1].push({
          date: dateString,
          count: count
        });
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return weeks;
  }, [contributionDays]);
  
  // Get month labels for the contribution graph
  const monthLabels = useMemo(() => {
    if (!contributionDays || contributionDays.length === 0) return [];
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels: {month: string, index: number}[] = [];
    
    // Calculate month positions without depending on contributionHeatmap
     const oneYearAgo = new Date();
     oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
     
     // Adjust to start from the beginning of the week (Sunday)
     const startDate = new Date(oneYearAgo);
     const dayOfWeek = startDate.getDay();
      startDate.setDate(startDate.getDate() - dayOfWeek);
      
      // eslint-disable-next-line prefer-const
      let tempDate = new Date(startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let weekIndex = 0;
      let currentMonth = -1;
      
      while (tempDate <= today) {
        if (tempDate.getDay() === 0) { // Sunday, start of week
          const month = tempDate.getMonth();
          if (month !== currentMonth) {
            labels.push({ month: months[month], index: weekIndex });
            currentMonth = month;
          }
          weekIndex++;
        }
        tempDate.setDate(tempDate.getDate() + 1);
    }
    
    return labels;
  }, [contributionDays]);

  // Get contribution level class based on count (GitHub style)
  const getContributionClass = (count: number) => {
    if (count === 0) return 'bg-gray-800';
    if (count === 1) return 'bg-emerald-900';
    if (count <= 3) return 'bg-emerald-700';
    if (count <= 9) return 'bg-emerald-500';
    return 'bg-emerald-300';
  };

  // Format date for tooltip
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Activity Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="h-8 w-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-white">{totalCommits}</div>
            <div className="text-sm text-gray-400">Total Contributions</div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="h-8 w-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58a2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-white">{currentStreak}</div>
            <div className="text-sm text-gray-400">Current Streak (days)</div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="h-8 w-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-white">{longestStreak}</div>
            <div className="text-sm text-gray-400">Longest Streak (days)</div>
          </div>
          
          {globalRankPercentage !== undefined && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.352-.035-.696-.1-1.028A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-white">
                {globalRankPercentage}%
              </div>
              <div className="text-sm text-gray-400">Global Rank</div>
            </div>
          )}
        </div>
        
        {/* Contribution Heatmap */}
        {contributionHeatmap && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{totalCommits} contributions in the last year</h3>
              <div className="text-sm text-gray-400 cursor-pointer">Contribution settings ▼</div>
            </div>
            
            <div className="overflow-x-auto">
              {/* Month labels */}
              <div className="flex text-xs text-gray-400 mb-1 pl-10 relative h-5">
                {monthLabels.map((label, index) => (
                  <div 
                    key={index} 
                    className="text-center" 
                    style={{ 
                      position: 'absolute', 
                      left: `${label.index * 16 + 40}px`,
                      top: '-4px'
                    }}
                  >
                    {label.month}
                  </div>
                ))}
              </div>
              
              <div className="relative">
                {/* Day of week labels */}
                <div className="absolute left-0 top-0 flex flex-col justify-around h-full text-xs text-gray-400 pr-2">
                  <div>Mon</div>
                  <div>Wed</div>
                  <div>Fri</div>
                </div>
                
                {/* Contribution grid */}
                <div className="flex space-x-1 min-w-max pl-10">
                  {contributionHeatmap.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col space-y-1">
                      {week.map((day) => (
                        <div 
                          key={day.date} 
                          className={`w-3 h-3 rounded-sm ${getContributionClass(day.count)}`}
                          title={`${day.count} contributions on ${formatDate(day.date)}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end mt-2 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <span>Less</span>
                  <div className="w-3 h-3 rounded-sm bg-gray-800"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-900"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-700"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-300"></div>
                  <span>More</span>
                </div>
              </div>
              
              <div className="mt-2 text-center text-xs text-gray-400">
                <a href="#" className="hover:text-gray-300">Learn how we count contributions</a>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Activity data based on public GitHub contributions.</p>
        </div>
      </div>
    </div>
  );
};

export default ContributionStats;