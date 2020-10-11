export interface IPool {
  name: string;
  provider: string;
  period: number;
  fee: number;
  currentStake: number;
  totalStake: number;
  status: 'pending' | 'ongoing';
}
