"use client";
import { homepages, listingPages, otherPages } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function MobileNav() {
  const pathname = usePathname();
  const isActive = (menus) => {
    let active = false;

    menus.forEach((elm) => {
      if (elm.links) {
        elm.links.forEach((elm2) => {
          if (elm2.href.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        });
      } else {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          active = true;
        }
      }
    });
    return active;
  };

  const handleActive1 = (event) => {
    const dropdown = event.currentTarget.closest(".dropdown2.parent-menu-1");
    const allDropdowns = document.querySelectorAll(".dropdown2.parent-menu-1");
    if (dropdown) {
      const ulElement = dropdown.querySelector("ul");
      if (dropdown.classList.contains("open")) {
        dropdown.classList.remove("open");

        if (ulElement) {
          ulElement.style.height = `0px`;
          ulElement.style.padding = "0px 20px";
        }
      } else {
        dropdown.classList.add("open");

        if (ulElement) {
          ulElement.style.height = `${ulElement.scrollHeight + 30}px`;
          ulElement.style.padding = "15px 20px";
        }
        allDropdowns.forEach((elm) => {
          if (elm !== dropdown) {
            elm.classList.remove("open");
            const ulElement2 = elm.querySelector("ul");
            if (ulElement2) {
              ulElement2.style.height = `0px`;
              ulElement2.style.padding = "0px 20px";
            }
          }
        });
      }
    }
  };
  const handleActive2 = (event) => {
    const dropdown = event.currentTarget.closest(
      ".dropdown2:not(.parent-menu-1)"
    );
    if (dropdown) {
      const ulElement = dropdown.querySelector("ul");
      if (dropdown.classList.contains("open")) {
        dropdown.classList.remove("open");

        if (ulElement) ulElement.style.height = `0px`;
        ulElement.style.padding = "0px 20px";
      } else {
        dropdown.classList.add("open");

        if (ulElement)
          ulElement.style.height = `${ulElement.scrollHeight + 30}px`;
        ulElement.style.padding = "15px 20px";
      }
    }
    const parentElement = dropdown.closest(".dropdown2.parent-menu-1");
    const ulElement2 = parentElement.querySelector("ul");
    ulElement2.style.height = `auto`;
  };
  useEffect(() => {
    document.body.classList.remove("mobile-menu-visible");
  }, [pathname]);

  return (
    <div className="menu-outer">
      <div
        className="navbar-collapse collapse clearfix"
        id="navbarSupportedContent"
      >
        <ul className="navigation clearfix">
          <li
        className={`tf-megamenu  ${
          isActive(homepages) ? "current" : ""
        } `}
      >
        <Link href={homepages[0].href}>{homepages[0].text}</Link>
      </li>
      <li
        className={`tfcl-mega-menu   ${
          isActive(listingPages) ? "current" : ""
        } `}
      >
        <Link href={listingPages[0].links[0].href}>{listingPages[0].links[0].text}</Link>
      </li>
      <li className={`${isActive(otherPages) ? "current" : ""} `}>
        <Link href={otherPages[1].href}>{otherPages[1].text}</Link>
        <ul>
          {otherPages.map((item, index) => (
            <li
              key={index}
              className={`${item.className || ""}  ${
                item.links ? (isActive(item.links) ? "current" : "") : ""
              } ${
                item.href?.split("/")[1] == pathname.split("/")[1]
                  ? "current"
                  : ""
              }`}
            >
              {item.title ? (
                <>
                  <a href="#">{item.title}</a>
                  <ul>
                    {item.links.map((link, linkIndex) => (
                      <li
                        key={linkIndex}
                        className={
                          link.href.split("/")[1] == pathname.split("/")[1]
                            ? "current"
                            : ""
                        }
                      >
                        <Link href={link.href}>{link.text}</Link>
                      </li>
                    ))}
                  </ul>
                  <div className="dropdown2-btn" />
                </>
              ) : (
                <Link href={item.href}>{item.text}</Link>
              )}
            </li>
          ))}
        </ul>
      </li>
      <li className={"contact" == pathname.split("/")[1] ? "current" : ""}>
        <Link href={`/contact`}>Contact</Link>
      </li>
        </ul>
      </div>
    </div>
  );
}
