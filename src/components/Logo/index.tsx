import logo from './logo.svg';
import './style.scss';

export const Logo = () => {
  return (
    <div className="logo">
      <img className="logo__img" src={logo} alt="logo" />
      <p className="logo__text">React Crypto</p>
    </div>
  );
};
