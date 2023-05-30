import styled from "styled-components";

export const ChatImage = styled.img`
    width: 50%;
    height: 50%;
`

export const ChatOpener = styled.div`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 4rem;
    color: blue;
    cursor: pointer;
`


export const ChatContainer = styled.div`
  position: fixed;
  z-index: 1;
  bottom: 1rem;
  right: 1rem;
  background: #f6f6f6;
  max-height: 70vh;
  width: 30%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ChatBody = styled.div`
    p {
        font-family: 'Arial';
        color: blue;
    }
`;

export const ChatMessages = styled.div`
    max-height: calc(65vh - 60px); /* Subtract header and input height */
    overflow-y: auto;

`;

export const ChatMessage = styled.div`
    margin-bottom: 8px;
`;

export const ChatMessageText = styled.p<any>`
  background-color: #f6f6f6;
  padding: 8px;
  border-radius: 20px;
  margin-left: ${({ user }) => (user ? 'auto' : 'initial')};
  word-break:break-all;
`;

export const ChatMessageImage = styled.img<any>`
  max-width: 100%;
  border-radius: 20px;
  margin-left: ${({ user }) => (user ? 'auto' : 'initial')};
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: red;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  border-top: 1px solid #ddd;
`;

export const ChatInput = styled.textarea`
    resize: none;
    overflow-y: scroll;
    font-size: 14px;
    flex-grow: 1;
    border: none;
    outline: none;
    padding: 8px;
    background-color: #f6f6f6;
    border-radius: 20px;
    margin-right: 1rem;
    color: #000;
`;

export const SendButton = styled.button`
    background-color: #0084ff;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    cursor: pointer;
`;