"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./page.module.css";

export default function Home() {
  const onClick = () => {
    alert(`Hello, World!`);
  };

  const [title, setTitle] = useState(`Hello, World!`);

  return (
    <main className={styles.main}>
      <div className={styles.description} onClick={onClick}>
        <p>
          {title} Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            By{` `}
            <Image
              alt="Vercel Logo"
              className={styles.vercelLogo}
              height={24}
              priority
              src="/vercel.svg"
              width={100}
            />
          </a>
        </div>
      </div>

      {/* Rest of the code */}
    </main>
  );
}
