/**
 * The app's primary navigation, defined once.
 *
 * Every surface that lists the main destinations (desktop sidebar, mobile
 * drawer) renders THIS list. The two used to carry their own copies and
 * drifted: the drawer still said Dashboard · Library · Saved while the
 * sidebar had moved on to Home · Holy Bible · Readings · Saved.
 *
 * The first slot is the only conditional one: signed in it is the Dashboard
 * ("jump back to where I was"); signed out it is the marketing Home.
 */

export interface NavLink {
  href: string;
  label: string;
  iconSrc: string;
  /** Exact paths that light this link up; otherwise `href` prefix matching. */
  exact?: string[];
}

export function getNavLinks(isAuthenticated: boolean): NavLink[] {
  return [
    {
      href: isAuthenticated ? '/dashboard' : '/',
      label: isAuthenticated ? 'Dashboard' : 'Home',
      iconSrc: '/icons/sidebar/home.webp',
      exact: ['/', '/dashboard'],
    },
    { href: '/library', label: 'Holy Bible', iconSrc: '/icons/sidebar/library.webp' },
    { href: '/readings', label: 'Readings', iconSrc: '/icons/sidebar/writings.webp' },
    { href: '/saved', label: 'Saved', iconSrc: '/icons/general/laurel.webp' },
  ];
}

export function isNavLinkActive(link: NavLink, pathname: string): boolean {
  if (link.exact) return link.exact.includes(pathname);
  return pathname === link.href || pathname.startsWith(link.href + '/');
}
