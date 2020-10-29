import React from 'react';
import { useNodeListStyles } from './NodeListStyles';
import classNames from 'classnames';
import { ITablesCaptionProps } from '../../../../components/TableComponents/types';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../../../components/TableComponents';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { StkrSdk } from '../../../api';
import { uid } from 'react-uid';
import { ISidecar } from '../../../../store/apiMappers/sidecarsApi';
import { formatDistanceToNowStrict } from 'date-fns';
import { Icon, SvgIcon } from '@material-ui/core';
import { DesktopWindows } from '@material-ui/icons';

const useCaptions = (): ITablesCaptionProps[] =>
  useLocaleMemo(
    () => [
      {
        key: 'name',
        label: t('beacon-node-table.name'),
      },
      {
        key: 'status',
        label: t('beacon-node-table.status'),
      },
      {
        key: 'uptime',
        label: t('beacon-node-table.uptime'),
      },
      {
        key: 'date',
        label: t('beacon-node-table.date'),
      },
      {
        key: 'certificate',
        label: t('beacon-node-table.certificate'),
      },
    ],
    [],
  );

interface INodeListProps {
  className?: string;
  data?: ISidecar[];
}

export const NodeListComponent = ({ className, data }: INodeListProps) => {
  const classes = useNodeListStyles();

  const captions = useCaptions();

  return (
    <div className={classNames(classes.component, className)}>
      <Table
        customCell="1fr 1fr 1fr 1fr 0.7fr"
        columnsCount={captions.length}
        className={classes.table}
      >
        <TableHead>
          {captions.map(cell => (
            <TableHeadCell key={cell.key} label={cell.label} />
          ))}
        </TableHead>
        {data && (
          <TableBody rowsCount={data.length}>
            {data.map(item => (
              <TableRow key={uid(item)}>
                <TableBodyCell>{item.id}</TableBodyCell>
                <TableBodyCell>
                  {t(`beacon-list.status.${item.status}`)}
                </TableBodyCell>
                <TableBodyCell>
                  {formatDistanceToNowStrict(item.created, { addSuffix: true })}
                </TableBodyCell>
                <TableBodyCell>
                  {t('format.date', { value: item.created })}
                </TableBodyCell>
                <TableBodyCell>
                  <svg
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const downloadLink = StkrSdk.getLastInstance().createSidecarDownloadLink(
                        item.id,
                        'linux64',
                      );
                      window.open(downloadLink, '_blank');
                    }}
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.7063 13.0818C17.7063 13.1459 17.6386 13.1459 17.6386 13.1459H17.5709C17.5033 13.1459 17.5033 13.0818 17.4356 13.0177C17.4356 13.0177 17.3679 12.9536 17.3679 12.8895C17.3679 12.8254 17.3679 12.8254 17.4356 12.8254L17.5709 12.8895C17.6386 12.9536 17.7063 13.0177 17.7063 13.0818ZM16.4882 12.4408C16.4882 12.1203 16.3529 11.928 16.1499 11.928C16.1499 11.928 16.1499 11.9921 16.0822 11.9921V12.1203H16.2852C16.2852 12.2485 16.3529 12.3126 16.3529 12.4408H16.4882ZM18.8567 12.1203C18.992 12.1203 19.0597 12.2485 19.1273 12.4408H19.2627C19.195 12.3767 19.195 12.3126 19.195 12.2485C19.195 12.1844 19.195 12.1203 19.1273 12.0562C19.0597 11.9921 18.992 11.928 18.9243 11.928C18.9243 11.928 18.8567 11.9921 18.789 11.9921C18.789 12.0562 18.8567 12.0562 18.8567 12.1203ZM16.8266 13.1459C16.7589 13.1459 16.7589 13.1459 16.7589 13.0818C16.7589 13.0177 16.7589 12.9536 16.8266 12.8895C16.9619 12.8895 17.0296 12.8254 17.0296 12.8254C17.0973 12.8254 17.0973 12.8895 17.0973 12.8895C17.0973 12.9536 17.0296 13.0177 16.8943 13.1459H16.8266ZM16.0822 13.0818C15.8115 12.9536 15.7439 12.7613 15.7439 12.4408C15.7439 12.2485 15.7439 12.1203 15.8792 11.9921C15.9469 11.8639 16.0822 11.7998 16.2176 11.7998C16.3529 11.7998 16.4206 11.8639 16.5559 11.9921C16.6236 12.1844 16.6912 12.3767 16.6912 12.569V12.6331V12.6972H16.7589V12.6331C16.8266 12.6331 16.8266 12.5049 16.8266 12.2485C16.8266 12.0562 16.8266 11.8639 16.6912 11.6716C16.5559 11.4793 16.4206 11.3511 16.1499 11.3511C15.9469 11.3511 15.7439 11.4793 15.6762 11.6716C15.5409 11.928 15.5138 12.1203 15.5138 12.4408C15.5138 12.6972 15.6085 12.9536 15.8792 13.21C15.9469 13.1459 16.0146 13.1459 16.0822 13.0818ZM24.5409 22.1203C24.6085 22.1203 24.6085 22.0947 24.6085 22.037C24.6085 21.8959 24.5409 21.7293 24.3379 21.5434C24.1349 21.3511 23.7965 21.2293 23.3905 21.178C23.3228 21.1716 23.2552 21.1716 23.2552 21.1716C23.1875 21.1588 23.1875 21.1588 23.1198 21.1588C23.0521 21.1524 22.9168 21.1395 22.8491 21.1267C23.0521 20.5306 23.1198 20.0049 23.1198 19.5434C23.1198 18.9024 22.9845 18.4536 22.7138 18.069C22.4431 17.6844 22.1724 17.4921 21.8341 17.428C21.7664 17.4921 21.7664 17.4921 21.7664 17.5562C22.1048 17.6844 22.4431 17.9408 22.6461 18.3254C22.8491 18.7742 22.9168 19.1588 22.9168 19.6075C22.9168 19.9665 22.8491 20.4985 22.5785 21.178C22.3078 21.2806 22.0371 21.5177 21.8341 21.8895C21.8341 21.9472 21.8341 21.9793 21.9018 21.9793C21.9018 21.9793 21.9694 21.9216 22.0371 21.8126C22.1724 21.7036 22.2401 21.5947 22.3755 21.4857C22.5785 21.3767 22.7138 21.319 22.9168 21.319C23.2552 21.319 23.5935 21.3639 23.7965 21.4536C24.0672 21.537 24.2025 21.6267 24.2702 21.7293C24.3379 21.8254 24.4055 21.9152 24.4732 21.9985C24.4732 22.0818 24.5409 22.1203 24.5409 22.1203ZM18.3153 12.8254C18.2476 12.7613 18.2476 12.6331 18.2476 12.5049C18.2476 12.2485 18.2476 12.1203 18.383 11.928C18.5183 11.7998 18.6536 11.7357 18.789 11.7357C18.992 11.7357 19.1273 11.8639 19.2627 11.9921C19.3303 12.1844 19.398 12.3126 19.398 12.5049C19.398 12.8254 19.2627 13.0177 18.992 13.0818C18.992 13.0818 19.0597 13.1459 19.1273 13.1459C19.2627 13.1459 19.3303 13.21 19.4657 13.2742C19.5333 12.8895 19.601 12.6331 19.601 12.3126C19.601 11.928 19.5333 11.6716 19.398 11.4793C19.195 11.287 18.992 11.2229 18.7213 11.2229C18.5183 11.2229 18.3153 11.287 18.1123 11.4152C17.977 11.6075 17.9093 11.7357 17.9093 11.928C17.9093 12.2485 17.977 12.5049 18.1123 12.7613C18.18 12.7613 18.2476 12.8254 18.3153 12.8254ZM19.1273 13.8511C18.2476 14.428 17.5709 14.6844 17.0296 14.6844C16.5559 14.6844 16.0822 14.4921 15.6762 14.1716C15.7439 14.2998 15.8115 14.428 15.8792 14.4921L16.2852 14.8767C16.5559 15.1331 16.8943 15.2613 17.2326 15.2613C17.7063 15.2613 18.2476 15.0049 18.9243 14.5562L19.5333 14.1716C19.6687 14.0434 19.804 13.9152 19.804 13.7229C19.804 13.6588 19.804 13.5947 19.7364 13.5947C19.6687 13.4665 19.3303 13.2742 18.6536 13.0818C18.0446 12.8254 17.5709 12.6972 17.3003 12.6972C17.0973 12.6972 16.7589 12.8254 16.2852 13.0818C15.8792 13.3383 15.6085 13.5947 15.6085 13.8511C15.6085 13.8511 15.6762 13.9152 15.7439 14.0434C16.1499 14.3639 16.5559 14.5562 16.9619 14.5562C17.5033 14.5562 18.18 14.2998 19.0597 13.6588V13.787C19.1273 13.787 19.1273 13.8511 19.1273 13.8511ZM20.6837 26.7998C20.9544 27.2818 21.4281 27.5242 21.9694 27.5242C22.1048 27.5242 22.2401 27.5049 22.3755 27.4665C22.5108 27.4408 22.6461 27.3959 22.7138 27.3447C22.7815 27.2998 22.8491 27.2549 22.9168 27.2036C23.0521 27.1588 23.0521 27.1267 23.1198 27.0947L24.2702 26.1524C24.5409 25.9479 24.8115 25.769 25.1499 25.6139C25.4206 25.46 25.6912 25.3575 25.8266 25.2998C26.0296 25.2485 26.1649 25.1716 26.3003 25.069C26.3679 24.9729 26.4356 24.8511 26.4356 24.6972C26.4356 24.5113 26.3003 24.3703 26.1649 24.2677C26.0296 24.1652 25.8943 24.0947 25.7589 24.0498C25.6236 24.0049 25.4882 23.9024 25.2852 23.7293C25.1499 23.5626 25.0146 23.3318 24.9469 23.0306L24.8792 22.6588C24.8115 22.4857 24.8115 22.3575 24.7439 22.287C24.7439 22.2677 24.7439 22.2613 24.6762 22.2613C24.6085 22.2613 24.4732 22.319 24.4055 22.428C24.2702 22.537 24.1349 22.6588 23.9995 22.787C23.9318 22.9152 23.7288 23.0306 23.5935 23.1395C23.3905 23.2485 23.1875 23.3062 23.0521 23.3062C22.5108 23.3062 22.2401 23.1652 22.0371 22.8895C21.9018 22.6844 21.8341 22.4472 21.7664 22.178C21.6311 22.069 21.5634 22.0113 21.4281 22.0113C21.0897 22.0113 20.9544 22.3447 20.9544 23.0177V23.2293V23.9729V24.5434V24.819V25.0113C20.9544 25.069 20.8867 25.1972 20.8867 25.3959C20.8191 25.5947 20.8191 25.8203 20.8191 26.0754L20.6837 26.787V26.7979V26.7998ZM10.8717 26.4588C11.501 26.5459 12.2251 26.7325 13.0439 27.0171C13.8627 27.2992 14.3634 27.4466 14.5461 27.4466C15.0198 27.4466 15.4123 27.2479 15.7371 26.8639C15.8048 26.7395 15.8048 26.5934 15.8048 26.4254C15.8048 25.8197 15.4191 25.0536 14.6476 24.1242L14.1875 23.5408C14.0927 23.419 13.9777 23.2331 13.8288 22.9831C13.6867 22.7331 13.5582 22.5408 13.4567 22.4062C13.3687 22.2588 13.2266 22.1113 13.0439 21.9639C12.8679 21.8165 12.6649 21.7203 12.4416 21.669C12.1574 21.7203 11.9612 21.81 11.8664 21.9318C11.7717 22.0536 11.7176 22.1883 11.704 22.3293C11.6837 22.4639 11.6431 22.5536 11.5755 22.5985C11.5078 22.637 11.3927 22.669 11.2371 22.7011C11.2033 22.7011 11.1424 22.7011 11.0544 22.7075H10.8717C10.513 22.7075 10.2694 22.7459 10.1409 22.81C9.97169 22.9959 9.88372 23.2075 9.88372 23.4318C9.88372 23.5344 9.91079 23.7075 9.96493 23.9511C10.0191 24.1883 10.0461 24.3806 10.0461 24.5152C10.0461 24.778 9.96493 25.0408 9.79575 25.3036C9.62658 25.5793 9.53861 25.7844 9.53861 25.9306C9.60628 26.1793 10.0529 26.3543 10.8717 26.4568V26.4588ZM13.1251 20.6299C13.1251 20.1876 13.2469 19.7004 13.4973 19.1235C13.7409 18.5466 13.9845 18.162 14.2213 17.9056C14.2078 17.8415 14.1739 17.8415 14.1198 17.8415L14.0521 17.7774C13.8559 17.9697 13.6191 18.4184 13.3349 19.0594C13.0506 19.6363 12.9018 20.1684 12.9018 20.5594C12.9018 20.8479 12.9762 21.0979 13.1115 21.3158C13.2604 21.5274 13.6191 21.835 14.1875 22.2261L14.9048 22.6684C15.6694 23.2966 16.0755 23.7325 16.0755 23.9889C16.0755 24.1235 16.0078 24.2581 15.8048 24.4056C15.6694 24.5594 15.4867 24.6363 15.3311 24.6363C15.3176 24.6363 15.3108 24.6492 15.3108 24.6812C15.3108 24.6876 15.3785 24.8158 15.5206 25.0658C15.8048 25.4312 16.4138 25.6107 17.2258 25.6107C18.7146 25.6107 19.8649 25.0338 20.7446 23.8799C20.7446 23.5594 20.7446 23.3607 20.677 23.2774V23.0402C20.677 22.6235 20.7446 22.3094 20.88 22.1043C21.0153 21.8992 21.1506 21.803 21.3536 21.803C21.489 21.803 21.6243 21.8479 21.7597 21.944C21.8273 21.4504 21.8273 21.0209 21.8273 20.6363C21.8273 20.053 21.8273 19.5722 21.692 19.1235C21.6243 18.7389 21.489 18.4184 21.3536 18.162C21.2183 17.9697 21.083 17.7774 20.9476 17.585C20.8123 17.3927 20.7446 17.2004 20.6093 17.0081C20.5416 16.7517 20.4739 16.5594 20.4739 16.2389C20.2709 15.9184 20.1356 15.5979 19.9326 15.2774C19.7973 14.9568 19.6619 14.6363 19.5266 14.3799L18.9176 14.8286C18.2409 15.2774 17.6995 15.4697 17.2258 15.4697C16.8198 15.4697 16.4815 15.4056 16.2785 15.1492L15.8724 14.8286C15.8724 15.0209 15.8048 15.2774 15.6694 15.5338L15.2431 16.303C15.0536 16.7517 14.9521 17.0081 14.9318 17.2004C14.9048 17.3286 14.8845 17.4568 14.8709 17.4568L14.3634 18.4184C13.8153 19.3799 13.5379 20.2709 13.5379 21.0081C13.5379 21.1556 13.5514 21.3094 13.5785 21.4633C13.2739 21.2645 13.1251 20.9889 13.1251 20.6299ZM17.9702 26.694C17.0905 26.694 16.4138 26.8068 15.9401 27.0306V27.0113C15.6018 27.3959 15.2228 27.5947 14.695 27.5947C14.3634 27.5947 13.8424 27.4729 13.1386 27.2293C12.4281 26.9985 11.7988 26.8216 11.2506 26.7049C11.1965 26.6902 11.0747 26.6684 10.8785 26.6389C10.689 26.61 10.513 26.5806 10.3574 26.5511C10.2153 26.5222 10.0529 26.4786 9.87696 26.4197C9.70778 26.369 9.57245 26.303 9.47094 26.2229C9.37756 26.1421 9.33154 26.0511 9.33154 25.9492C9.33154 25.8466 9.35455 25.737 9.40057 25.6203C9.44387 25.5498 9.49124 25.4793 9.53861 25.4152C9.58598 25.3447 9.62658 25.2806 9.65365 25.2165C9.69425 25.1588 9.72132 25.1011 9.74839 25.037C9.77545 24.9793 9.80252 24.9216 9.81605 24.8511C9.82959 24.787 9.84312 24.7229 9.84312 24.6588C9.84312 24.5947 9.81605 24.4024 9.76192 24.0626C9.70778 23.7293 9.68072 23.5177 9.68072 23.428C9.68072 23.1459 9.74839 22.9216 9.89726 22.7613C10.0461 22.6011 10.1882 22.5177 10.3371 22.5177H11.1153C11.1762 22.5177 11.2709 22.4857 11.413 22.4088C11.4604 22.3062 11.501 22.2229 11.5281 22.1459C11.5619 22.069 11.5755 22.0113 11.589 21.9857C11.6025 21.9472 11.6161 21.9088 11.6296 21.8767C11.6567 21.8318 11.6905 21.7806 11.7379 21.7293C11.6837 21.6652 11.6567 21.5818 11.6567 21.4793C11.6567 21.4088 11.6567 21.3447 11.6702 21.3062C11.6702 21.0754 11.7852 20.7485 12.0288 20.319L12.2657 19.9152C12.4619 19.569 12.6108 19.3126 12.7191 19.0562C12.8341 18.7998 12.9559 18.4152 13.0912 17.9024C13.1995 17.4536 13.4567 17.0049 13.8627 16.5562L14.3702 15.9793C14.7221 15.5947 14.9521 15.2742 15.0807 15.0177C15.2093 14.7613 15.277 14.4408 15.277 14.1844C15.277 14.0562 15.2431 13.6716 15.1687 13.0306C15.101 12.3895 15.0672 11.7485 15.0672 11.1716C15.0672 10.7229 15.1078 10.4024 15.1958 10.0818C15.2837 9.76133 15.4394 9.44082 15.6694 9.18441C15.8724 8.928 16.1431 8.67159 16.5491 8.54338C16.9552 8.41518 17.4288 8.35107 17.9702 8.35107C18.1732 8.35107 18.3762 8.35107 18.5792 8.41518C18.7822 8.41518 19.0529 8.47928 19.3912 8.60748C19.6619 8.73569 19.9326 8.86389 20.1356 9.0562C20.4063 9.24851 20.6093 9.56902 20.8123 9.88953C20.9476 10.2742 21.083 10.6588 21.1506 11.1716C21.2183 11.4921 21.2183 11.8126 21.286 12.2613C21.286 12.6459 21.3536 12.9024 21.3536 13.0947C21.4213 13.287 21.4213 13.5434 21.489 13.8639C21.5567 14.1203 21.6243 14.3767 21.7597 14.569C21.895 14.8254 22.0303 15.0818 22.2333 15.3383C22.4364 15.6588 22.707 15.9793 22.9777 16.3639C23.5867 17.0049 24.0604 17.71 24.3311 18.4152C24.6694 19.0562 24.8724 19.8895 24.8724 20.7806C24.8724 21.2229 24.8048 21.6524 24.6694 22.069C24.8048 22.069 24.8724 22.1203 24.9401 22.21C25.0078 22.2998 25.0755 22.4921 25.1431 22.7934L25.2108 23.2677C25.2785 23.4088 25.3461 23.5434 25.5491 23.6588C25.6845 23.7742 25.8198 23.8703 26.0228 23.9472C26.1582 24.0113 26.3612 24.1011 26.4965 24.2165C26.6318 24.3447 26.6995 24.4793 26.6995 24.6203C26.6995 24.8383 26.6318 24.9985 26.4965 25.1139C26.3612 25.2421 26.2258 25.3318 26.0228 25.3895C25.8875 25.4536 25.6168 25.5818 25.2108 25.7626C24.8724 25.9524 24.5341 26.1825 24.1958 26.4549L23.5191 27.0004C23.2484 27.2504 22.9777 27.4299 22.7747 27.5389C22.5717 27.6543 22.301 27.712 22.0303 27.712L21.5567 27.6607C21.0153 27.5261 20.677 27.2697 20.4739 26.8786C19.3912 26.7543 18.5115 26.6927 17.9702 26.6927"
                      fill="#999999"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="35"
                      height="35"
                      rx="1.5"
                      stroke="white"
                      stroke-opacity="0.2"
                    />
                  </svg>
                  &nbsp;
                  <svg
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const downloadLink = StkrSdk.getLastInstance().createSidecarDownloadLink(
                        item.id,
                        'win64',
                      );
                      window.open(downloadLink, '_blank');
                    }}
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22.3489L16.9183 23.0267V18.332H12V22.3489Z"
                      fill="#999999"
                    />
                    <path
                      d="M12 17.726H16.9183V12.9736L12 13.6515V17.726Z"
                      fill="#999999"
                    />
                    <path
                      d="M17.459 23.0985L23.9998 23.9998V18.3316V18.3315H17.459V23.0985Z"
                      fill="#999999"
                    />
                    <path
                      d="M17.459 12.9014V17.726H23.9998V12L17.459 12.9014Z"
                      fill="#999999"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="35"
                      height="35"
                      rx="1.5"
                      stroke="white"
                      stroke-opacity="0.2"
                    />
                  </svg>
                  &nbsp;
                  <svg
                    style={{ cursor: 'disabled' }}
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.2752 18.8089C22.2536 16.7078 23.9882 15.7023 24.0651 15.6519C23.0909 14.2284 21.5748 14.0325 21.0331 14.0109C19.7441 13.8788 18.5152 14.7701 17.8592 14.7701C17.2057 14.7701 16.1942 14.0289 15.1239 14.0482C13.716 14.0698 12.4198 14.8674 11.6942 16.1264C10.2322 18.6635 11.3194 22.4212 12.7441 24.4814C13.4409 25.4881 14.2722 26.6185 15.3618 26.5789C16.4117 26.5368 16.8081 25.8989 18.0779 25.8989C19.3476 25.8989 19.7044 26.5789 20.8144 26.5584C21.9448 26.5368 22.6596 25.5313 23.3504 24.5223C24.1504 23.3534 24.4796 22.2206 24.5 22.1641C24.4736 22.1497 22.298 21.3172 22.2752 18.8089Z"
                      fill="#999999"
                    />
                    <path
                      d="M20.1875 12.6477C20.7653 11.9473 21.1569 10.9718 21.05 10C20.2151 10.0336 19.2072 10.5538 18.6078 11.2554C18.0708 11.8764 17.6035 12.8675 17.7284 13.8201C18.6582 13.8934 19.6097 13.3468 20.1875 12.6477Z"
                      fill="#999999"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="35"
                      height="35"
                      rx="1.5"
                      stroke="white"
                      stroke-opacity="0.2"
                    />
                  </svg>
                </TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export const NodeList = ({
  className,
  data,
}: {
  className?: string;
  data: ISidecar[];
}) => {
  return <NodeListComponent className={className} data={data} />;
};
