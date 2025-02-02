import { NavLink, useLocation } from 'react-router-dom';
import SvgIcon from '../Svg';

interface SiderItemProps {
  iconName: string;
  title: string;
  navigateLink: string;
}

const SidebarItem = ({ iconName, title, navigateLink }: SiderItemProps) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <li>
      <NavLink
        to={navigateLink !== 'index' ? `/${navigateLink}` : '/'}
        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          navigateLink !== 'index'
            ? pathname.includes(navigateLink) && 'bg-graydark dark:bg-meta-4'
            : pathname.length === 1 && 'bg-graydark dark:bg-meta-4'
        }`}
      >
        <SvgIcon name={iconName} />
        {title}
      </NavLink>
    </li>
  );
};

export default SidebarItem;
