import { Component, ReactElement, ReactNode } from 'react';
import { AlertType } from '../../utils/enums';
import { IAlert } from '../../utils/interfaces';
import {
  IoCheckmarkCircleOutline,
  IoInformationCircleOutline,
  IoWarningOutline,
} from 'react-icons/io5';
import './style.scss';

interface IProps {
  alert: IAlert;
  hideAlert: Function;
}

export class Alert extends Component<IProps, {}> {
  componentDidMount() {
    setTimeout(() => this.props.hideAlert(), 3000);
  }

  render(): ReactNode {
    let alertClasses = ['alert__content'];
    let icon: ReactElement;
    switch (this.props.alert.type) {
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
    if (this.props.alert.show) alertClasses.push('alert__content_show');

    return (
      <div className="alert">
        <div className={alertClasses.join(' ')}>
          <p className="alert__text">
            {icon}
            {this.props.alert.text}
          </p>
        </div>
      </div>
    );
  }
}
