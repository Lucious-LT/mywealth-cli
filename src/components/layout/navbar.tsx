import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  HiAdjustments,
  HiCreditCard,
  HiGlobeAlt,
  HiHome,
  HiUser,
  HiCog,
  HiDatabase,
  HiChevronRight, HiDotsHorizontal, HiLogout, HiLogin
} from "react-icons/hi";
import { api } from "~/utils/api";


/**
 * @param {string[]} classes
 */
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}


/**
 * @param {{ currentView: string; }} page
 */
export default function Navbar(page: { currentView: string; }) {
  const { data: session } = useSession();
  const { data: picture } = api.profile.loadClientPicture.useQuery({ clientId: session?.user?.clientId ?? "" },
    { enabled: session?.user.clientId != null, staleTime: 600000 });
  const { data: logo } = api.profile.getTenantLogo.useQuery({ tenantId: session?.user?.tenant ?? "" },
    { enabled: session?.user.clientId != null, staleTime: 600000 });

  // https://daisyui.com/components/navbar/
  // https://www.freecodecamp.org/news/how-to-use-svg-icons-in-react-with-react-icons-and-font-awesome/

  const navigation = [
    { name: "Dashboard", href: "/dashboard", current: true, tabName: "Home", icon: <HiHome className="h-5 w-5" /> },
    { name: "Banking", href: "/bank", current: false, tabName: "Bank", icon: <HiCreditCard className="h-5 w-5" /> },
    {
      name: "Investments",
      href: "/invest",
      current: false,
      tabName: "Invest",
      icon: <HiGlobeAlt className="h-5 w-5" />
    },
    {
      name: "Insurance",
      href: "/insure",
      current: false,
      tabName: "Insure",
      icon: <HiAdjustments className="h-5 w-5" />
    }
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/auth/signin";
  }

  const handleLogin = async () => {
    await signIn()
  }

  return (
    <div className="navbar border-b bg-base-100 px-5 pt-5">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    item.tabName === page.currentView
                      ? "bg-gray-200 text-black"
                      : "text-black-300 hover:bg-gray-200 hover:text-black dark:text-gray-100",
                    "text-md rounded-md px-3 py-2 font-medium"
                  )}
                  aria-current={
                    item.tabName === page.currentView ? "page" : undefined
                  }
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-shrink-0 items-center">
          <img className="hidden h-8 w-auto lg:block" alt="MyWealth Inc"
            src={logo != null ? logo : "/logo.svg"} />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal mx-2 px-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    item.tabName === page.currentView
                      ? "bg-gray-200 text-black"
                      : "text-black-300 hover:bg-gray-200 hover:text-black",
                    "mx-1 rounded-md px-3 py-2 text-sm  font-medium"
                  )}
                  aria-current={
                    item.tabName === page.currentView ? "page" : undefined
                  }
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        {/*<a className="btn">Get started</a>*/}
        <span className="font-small mr-3 hidden text-sm lg:block">
          {session?.user?.name
            ? `${session.user.name} # ${session.user.clientCode}` : ""}
        </span>
        <div className="flex items-center">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-1 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow"
            >
              <div className="card-body divide-y-1">
                <span className="cursor-pointer pt-1">* Order #110234 filled</span>
                <span className="cursor-pointer pt-1">* Order #110234 filled</span>
                <span className="cursor-pointer pt-1">* Order #110234 filled</span>
                <div className="card-actions">
                  <button className="btn-primary btn-block capitalize btn">
                    View notifications
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <img src={picture != null ? picture : "/images/avatar.jpg"} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <Link href={`/profile`}>
                  <HiUser />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link href={`/case-management`}>
                  <HiDatabase />
                  <span>Feedback</span>
                </Link>
              </li>
              <li>
                <a
                  onClick={
                    session ? handleLogout : handleLogin
                  }
                  href="#"
                >
                  {session ? <HiLogout /> : <HiLogin />}
                  {session ? "Sign out" : "Sign in"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
