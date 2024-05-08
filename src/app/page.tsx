'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const onClick = () => {
    alert("Hello, World!");
  };

  const [ title, setTitle ] = useState("Hello, World!");

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
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      {/* Rest of the code */}
    </main>
  );
}
