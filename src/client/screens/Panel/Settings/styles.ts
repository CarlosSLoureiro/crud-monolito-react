import { keyframes } from "@emotion/react";

import styled from "@emotion/styled";

const slideInUpToBottom = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

export const TabContent = styled.div`
  animation: ${slideInUpToBottom} 0.2s;
`;
