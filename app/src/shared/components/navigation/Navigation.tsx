import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "shared/components/icons/Search";
import Star from "shared/components/icons/Star";
import styles from "./navigation.module.css";

const LINKS = [
  {
    pathname: "/",
    label: "Foods Search",
    icon: Search,
  },
  {
    pathname: "/favorites",
    label: "See my favorites",
    icon: Star,
  },
];

function setProperties(element: HTMLElement, properties: Map<string, string>) {
  properties.forEach((value, key) => {
    element.style.setProperty(key, value);
  });
}

function findActiveLink(list: HTMLUListElement) {
  if (list?.children) {
    const childrenAsArray = Array.from(list.children) as HTMLLIElement[];
    const activeLink = childrenAsArray.find(
      (child) => child.dataset.active === "true"
    );

    return activeLink;
  }
}

function Navigation() {
  const { pathname: urlPathname } = useLocation();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) {
      return;
    }

    const activeLink = findActiveLink(listRef.current);

    if (activeLink) {
      setProperties(
        listRef.current,
        new Map([
          ["--list-item-active-offset", `${activeLink.offsetLeft}px`],
          ["--list-item-active-width", `${activeLink.clientWidth}px`],
        ])
      );
    }
  }, [urlPathname]);

  useEffect(() => {
    const handleObserver = ([entry]: ResizeObserverEntry[]) => {
      const list = entry.target as HTMLUListElement;
      const activeLink = findActiveLink(list);

      if (activeLink) {
        setProperties(
          list,
          new Map([
            ["--list-item-active-offset", `${activeLink.offsetLeft}px`],
            ["--list-item-active-width", `${activeLink.clientWidth}px`],
          ])
        );
      }
    };

    const resizeObserver = new ResizeObserver(handleObserver);
    const listRefCurrent = listRef.current;

    listRefCurrent && resizeObserver.observe(listRefCurrent);

    return () => {
      listRefCurrent && resizeObserver.unobserve(listRefCurrent);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <ul ref={listRef} className={styles.list}>
        {LINKS.map(({ label, pathname, icon: Icon }) => (
          <li
            key={pathname}
            className={styles.listItem}
            data-active={pathname === urlPathname}
          >
            <Link className={styles.link} to={pathname}>
              <span className={styles.text}>{label}</span>
              <Icon className={styles.icon} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
