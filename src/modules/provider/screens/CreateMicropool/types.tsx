import { ISelectOption } from '../../../../UiKit/SelectField/SelectField';

export interface IStage6StoreProps {
  balance: number;
  amount: number;
  price?: number | string;
  beacon: ISelectOption[];
}
