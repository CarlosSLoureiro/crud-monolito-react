import styled from "@emotion/styled";

export const jsonPrettyStyles = {
  main: `line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;`,
  error: `line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;`,
  key: `color:#f92672;`,
  string: `color:#fd971f;`,
  value: `color:#a6e22e;`,
  boolean: `color:#ac81fe;`,
};

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
