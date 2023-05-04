import i18next from 'i18next';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import useLocales from '../hooks/useLocales';
import languages from '../utils/langs';

const Navbar = () => {
  const { currentLanguageCountryCode, nativeName } = useLocales();
  return (
    <div
      className="shadow py-2 px-4 d-flex justify-content-between align-items-center"
      data-bs-theme="light"
    >
      <Link to="/">
        <img width={80} height="auto" src={Logo} alt="cavea-logo" />
      </Link>
      <div className="d-flex gap-5">
        <div className="dropdown z-20">
          <button
            className="btn bg-white shadow border dropdown-toggle d-flex align-items-center gap-2"
            type="button"
            data-bs-toggle="dropdown"
          >
            <span
              className={`flag-icon flag-icon-${currentLanguageCountryCode}`}
            ></span>
            <p className="mb-0">{nativeName}</p>
          </button>
          <ul className="dropdown-menu">
            {languages.map((lang) => (
              <li
                onClick={() => i18next.changeLanguage(lang.code)}
                key={lang.name}
              >
                <a className="dropdown-item" href="#">
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className={`flag-icon flag-icon-${lang.country_code}`}
                    ></span>
                    <p className="mb-0">{lang.name}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
