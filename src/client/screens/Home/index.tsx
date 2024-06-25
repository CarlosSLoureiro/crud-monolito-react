import Image from "next/image";
import { useRouter } from "next/navigation";

import { Auth } from "@client/utils/auth";

import styles from "./styles.module.css";

export default function HomeScreen() {
  const route = useRouter();

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          {Auth.user ? (
            <>
              Olá <b>{Auth.user.name}</b>! 😊
            </>
          ) : (
            <>Olá! Você não está logado.</>
          )}
        </p>
        <p onClick={() => route.push(`/painel`)}>
          {Auth.user ? (
            <>Clique aqui para acessar o painel.</>
          ) : (
            <>Clique aqui para entrar ou se cadastrar.</>
          )}
        </p>
        <p onClick={() => route.push(Auth.user ? `/status-autenticado` : `/status`)}>
          Cliquue aqui para conferir status da API{` `}
          <em>({Auth.user ? `autenticado` : `não autenticado`})</em>
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
