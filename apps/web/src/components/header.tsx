"use client";
import Link from "next/link";
import { Logo } from "../icons/logo";
import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames";
import { Arrow } from "../icons/left-arrow";

export const Header = () => {
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    const position = window.scrollY;
    setIsVisible(position > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      console.log(open);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={classNames(
        "w-full block fixed z-20 transition-all duration-500",
        isVisible && !open
          ? "bg-white text-dark fill-dark"
          : "bg-transparent text-white border-white fill-white"
      )}
    >
      <nav className="max-w-[92.5rem] my-0 mx-auto py-[1.25rem] px-[1.69rem] flex justify-between items-center">
        <Link className="w-[10.375rem] h-[2.31rem]" href={"/"}>
          <Logo className={isVisible ? "fill-dark" : "fill-white"} />
        </Link>

        <div
          className="lg:hidden cursor-pointer z-50"
          onClick={() => {
            var isOpen = open ? open : false;
            setOpen(!isOpen);
            document.body.classList.toggle("max-lg:overflow-y-hidden");
          }}
        >
          <span
            className={classNames(
              "block w-[26px] h-0.5 bg-black transition-all duration-30  ease-in-out mb-[5px] origin-mid",
              open ? "rotate-45" : "",
              isVisible && !open ? "bg-dark" : "bg-white"
            )}
          ></span>
          <span
            className={classNames(
              "block w-[26px] h-0.5 bg-black transition-all duration-300 ease-in-out mb-[5px] opactiy-100 origin-mid",
              open ? "opacity-0" : "",
              isVisible ? "bg-dark" : "bg-white"
            )}
          ></span>
          <span
            className={classNames(
              "block w-[26px] h-0.5 bg-black transition-all duration-300 ease-in-out origin-mid",
              open ? "rotate-[-45deg]" : "",
              isVisible ? "bg-dark" : "bg-white"
            )}
          ></span>
        </div>

        <div
          className={classNames(
            "flex justify-between w-[55%]",
            "flex-row max-lg:hidden"
          )}
        >
          <NavItem href="/why">why orluna</NavItem>
          <NavItem href="/products">products</NavItem>
          <NavItem href="/projects">projects</NavItem>
          <NavItem href="/why">circular product</NavItem>
          <NavItem href="/why">contact</NavItem>
        </div>
      </nav>
      <div
        className={classNames(
          "opacity-0 invisible absolute w-[100%] h-[100vh] flex flex-col items-center text-inherit left-[50%] top-0 translate-x-[-50%] bg-dark lg:hidden",
          open != null ? (open ? "animate-fade-in" : "animate-fade-out") : ""
        )}
      >
        <Link className="w-[10.375rem] h-[2.31rem] mb-14 mt-5" href={"/"}>
          <Logo className="fill-white" />
        </Link>
        <div className="flex flex-col w-full pr-5 pl-[27vw]">
          <NavItem
            className="py-2.5 mt-3.5 hover:text-accent transition-colors"
            href="/why"
          >
            why orluna
            <Arrow className="w-14 h-5" />
          </NavItem>
          <NavItem
            className="py-2.5 mt-3.5 hover:text-accent transition-colors"
            href="/products"
          >
            products
            <Arrow className="w-14 h-5" />
          </NavItem>
          <NavItem
            className="py-2.5 mt-3.5 hover:text-accent transition-colors"
            href="/projects"
          >
            projects
            <Arrow className="w-14 h-5" />
          </NavItem>
          <NavItem
            className="py-2.5 mt-3.5 hover:text-accent transition-colors"
            href="/why"
          >
            circular product
            <Arrow className="w-14 h-5" />
          </NavItem>
          <NavItem
            className="py-2.5 mt-3.5 hover:text-accent transition-colors"
            href="/why"
          >
            contact
            <Arrow className="w-14 h-5" />
          </NavItem>
        </div>
      </div>
    </header>
  );
};

const NavItem: React.FC<{
  href: string;
  children: ReactNode;
  className?: string;
}> = ({ href, children, className }) => {
  return (
    <div
      className={classNames(
        "text-[18px] block relative",
        "after:z-20 after:max-lg:hidden after:content-[''] after:border-solid after:border-inherit after:border after:bottom-0 after:left-0 after:absolute after:w-full after:text-inherit after:transition-opacity after:duration-500 after:opacity-0 after:hover:opacity-100",
        className
      )}
    >
      <Link
        href={href}
        className="flex flex-row items-center justify-between w-full"
      >
        {children}
      </Link>
    </div>
  );
};
