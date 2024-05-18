import Image from "next/image";

import styles from "./styles.module.css";

export default function HomeScreen() {
  const onClick = () => {
    window.location.href = `/status`;
  };

  return (
    <main className={styles.main}>
      <div className={styles.description} onClick={onClick}>
        <p>
          Hello, World! Get started by editing&nbsp;
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
