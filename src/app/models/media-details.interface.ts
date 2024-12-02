export interface MediaDetails {
  poster_path: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  status: string;

  runtime?: number;
  episode_run_time?: number;
  budget?: number;
  revenue?: number;

  number_of_seasons: number;
  number_of_episodes: number;
}
