import styled, { keyframes } from "styled-components";
import { ReactComponent as Logo } from "../icons/logo.svg";
import { ReactComponent as SearchIcon } from "../icons/search-location-solid.svg";
import { ReactComponent as SendIcon } from "../icons/paper-plane-solid.svg";
import { ReactComponent as StarSolid } from "../icons/star-solid.svg";
import { ReactComponent as AddFriend } from "../icons/user-plus-solid.svg";

export const AddFriendStyle = styled(AddFriend)`
    cursor: pointer;
    color: #4f4f4f;
    width: 1.5em;
`;

export const StarSolidStyle = styled(StarSolid)`
    color: gold;
    width: 1em;
`;

export const Wrapper = styled.div`
    font-family: "Poppins", sans-serif;

    width: 100vw;
    height: 100vh;
`;

export const LogoContainer = styled.div`
    position: absolute;

    font-family: Rosarivo;
    font-size: 24px;
`;

export const LogoStyle = styled(Logo)`
    margin-left: 0.5rem;
`;

export const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const InputText = styled.input`
    text-align: center;
    margin: 0.5em 0;
    padding: 1em 2em;
    background: #ebebeb;
    border-radius: 6px;
    border: none;
    font-family: "Poppins", sans-serif;
    color: #141414;
`;

export const TextArea = styled.textarea`
    text-align: center;
    margin: 0.5em 0;
    padding: 1em 2em;
    width: 15em;
    height: 4em;
    background: #ebebeb;
    border-radius: 6px;
    border: none;
    color: #141414;
    font-family: "Poppins", sans-serif;
`;

export const InputSubmit = styled.input.attrs({ type: "submit" })`
    padding: 0.75em 2em;
    background: #4bc66d;
    border-radius: 6px;
    border: none;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        transition: 0.2s ease-in-out;
        background-color: #47ba67;
    }
`;

export const SearchPanel = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0.5em;
`;

export const SearchInput = styled.input`
    border-radius: 6px;
    border: none;
    background-color: #ffffff;
    padding: 0.5em 0.5em;
    width: 20em;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

export const SearchIconStyle = styled(SearchIcon)`
    color: #ffffff;
    width: 2em;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

export const SendIconStyle = styled(SendIcon)`
    color: #75cff0;
    width: 1.5em;
`;

export const SimpleButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
`;

export const Markup = styled.div`
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #ff416c 0%, #ff4b2b 100%), #c64b4b;
    border-radius: 100px;
`;

export const LogoutButton = styled.button`
    border: none;
    background: linear-gradient(180deg, #ff416c 0%, #ff4b2b 100%), #c64b4b;
    border-radius: 6px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    margin: 5em 0.5em;
    color: #ffffff;
    padding: 0.5em 0.5em;
    cursor: pointer;

    &:hover {
        transition: 0.2s ease-in-out;
        background-color: #a83e3e;
    }
`;

export const Message = styled.div`
    position: relative;
    width: 12.5em;
    height: 3em;
    background-color: lightgray;
`;

export const Name = styled.div`
    font-size: 12px;
    top: 0;
    float: left;
    margin-right: 1em;
`;

export const Stars = styled.div`
    font-size: 12px;
`;

export const MessageBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.5em;
    max-width: 15em;
    padding: 1em 1.3em;
    border-radius: 6px;
    background-color: #ffffff;
`;

const loadingEffect = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
    // top: 50%;
    // left: 50%;
    // transfrom: translate(-50%, -50%);
    // box-sizing: border-box;
    // display: block;

    position: absolute;
    width: 15em;
    height: 15em;
    margin: 8px;
    border: 25px solid #f5f5f5;
    border-radius: 50%;
    animation: ${loadingEffect} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #f5f5f5 transparent transparent transparent;
`;
