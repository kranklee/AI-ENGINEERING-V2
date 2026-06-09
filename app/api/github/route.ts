import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'cembesli-portfolio',
    };

    const [reposRes, userRes] = await Promise.all([
      fetch('https://api.github.com/users/kranklee/repos?sort=updated&per_page=10', { headers, next: { revalidate: 3600 } }),
      fetch('https://api.github.com/users/kranklee', { headers, next: { revalidate: 3600 } }),
    ]);

    if (!reposRes.ok || !userRes.ok) {
      throw new Error('GitHub API error');
    }

    const repos = await reposRes.json();
    const user = await userRes.json();

    const repoData = repos
      .filter((r: { fork: boolean }) => !r.fork)
      .slice(0, 4)
      .map((r: {
        name: string;
        description: string | null;
        language: string | null;
        stargazers_count: number;
        updated_at: string;
        html_url: string;
        topics: string[];
      }) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        updatedAt: r.updated_at,
        url: r.html_url,
        topics: r.topics?.slice(0, 3) ?? [],
      }));

    return NextResponse.json({
      repos: repoData,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      username: user.login,
      avatarUrl: user.avatar_url,
      bio: user.bio,
    });
  } catch {
    return NextResponse.json({ error: 'GitHub API unavailable' }, { status: 500 });
  }
}
