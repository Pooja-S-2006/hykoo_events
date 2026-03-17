import { NavLink as RouterNavLink } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const NavLink = forwardRef(({ to, className, children, ...props }, ref) => {
  return (
    <RouterNavLink
      ref={ref}
      to={to}
      className={cn("nav-link", className)}
      {...props}
    >
      {children}
    </RouterNavLink>
  );
});

NavLink.displayName = "NavLink";

export default NavLink;

