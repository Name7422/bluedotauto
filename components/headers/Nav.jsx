"use client";
import React from "react";
import Link from "next/link";
import { homepages, listingPages, otherPages } from "@/data/menu";
import { usePathname } from "next/navigation";

export default function Nav() {
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
  return (
    <>
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
    </>
  );
}
