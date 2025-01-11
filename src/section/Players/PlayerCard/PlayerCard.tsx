"use client";
import React, { useState } from "react";
import styles from "./PlayerCard.module.css";
import fbIcon from "@/assets/images/icons/facebook.svg";
import linkedIcon from "@/assets/images/icons/linkedin.svg";
import twitterIcon from "@/assets/images/icons/twitter.svg";
import discordIcon from "@/assets/images/icons/discord.svg";
import userDefault from "@/assets/images/no-User.png";
import Image from "next/image";
import Link from "next/link";

  
  const PlayerCard = (props:any) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);
  
    /**
     * @param address - full wallet address
     * @returns Formatted address
     */
    const formatAddress = (address: string | undefined): string => {
      if (!address) return "";
  
      if (address.includes(".")) {
        return address;
      }
  
      if (address.length > 15) {
        const firstFive = address.slice(0, 5);
        const lastFive = address.slice(-5);
        return `${firstFive}.....${lastFive}`;
      }
  
      return address;
    };
  
    const handleCopy = (): void => {
      if (!props.address) {
        console.error("No address to copy.");
        return;
      }
  
      navigator.clipboard
        .writeText(props.address)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy!", err);
        });
    };
  

  return (
<div className={styles.wrapper}>
  <Link href={`/profile/${props.id}`} >
    <div className={styles.playerInfo}>
      <div className={styles.playerLogo}>
        <Image
          src={props.image || userDefault.src}
          alt="player-image"
          className={styles.playerImage}
          width={100}
          height={100}
          onError={() => (props.image = userDefault.src)}
        />
      </div>
      <div className={styles.playerDetail}>
        <h4>
          {props.firstname} {props.lastname}
        </h4>
        <div className={styles.mt3}>{props.country}</div>
        <div className={styles.mt3}>{props.email}</div>
        <div className={styles.mt3}>{props.top_points}</div>
        <li
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
            }}
          >
            {props.address ? formatAddress(props.address) : "Wallet Address: N/A"}
          </span>
          {props.address && (
            <button
              onClick={handleCopy}
              style={{
                padding: "5px 5px",
                cursor: "pointer",
                border: "none",
                backgroundColor: "#00ec97",
                color: "Black",
                borderRadius: "5px",
                fontFamily: "Russo One",
                fontSize: "12px",
              }}
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
          )}
        </li>
      </div>
    </div>
  </Link>
  <div className={styles.links}>
    <a href={props.discord}>
      <Image src={discordIcon} alt="icon" />
    </a>
    <a href={props.twitter}>
      <Image src={twitterIcon} alt="icon" />
    </a>
    <a href={props.facebook}>
      <Image src={fbIcon} alt="icon" />
    </a>
    <a href={props.linkedin}>
      <Image src={linkedIcon} alt="icon" />
    </a>
  </div>

</div>

  );
};

export default PlayerCard;
