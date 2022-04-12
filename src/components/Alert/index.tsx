import { ReactElement, useEffect } from 'react';
import { AlertType } from '../../utils/enums';
import { IAlert } from '../../utils/interfaces';
import {
  IoCheckmarkCircleOutline,
  IoInformationCircleOutline,
  IoWarningOutline,
} from 'react-icons/io5';
import './style.scss';
import { useDispatch } from 'react-redux';
import { removeAlert } from '../../store/alerts/actions';

interface IProps {
  alert: IAlert;
}

export const Alert = ({ alert }: IProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.setTimeout(() => dispatch(removeAlert()), 2900);
  }, [dispatch]);

  let alertClasses = ['alert__content'];
  let icon: ReactElement;
  switch (alert.type) {
    case AlertType.success:
      alertClasses.push('alert__content_success');
      icon = <IoCheckmarkCircleOutline />;
      break;
    case AlertType.info:
      alertClasses.push('alert__content_info');
      icon = <IoInformationCircleOutline />;
      break;
    case AlertType.warning:
      alertClasses.push('alert__content_warning');
      icon = <IoWarningOutline />;
      break;
  }
  if (alert.show) alertClasses.push('alert__content_show');

  return (
    <div className="alert">
      <div className={alertClasses.join(' ')}>
        <p className="alert__text">
          {icon}
          {alert.text}
        </p>
      </div>
    </div>
  );
};
