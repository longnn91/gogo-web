import styled from "@emotion/styled";

export const Spinner = () => {
  return (
    <SpinnerWrapper>
      <SpinnerContainer>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </SpinnerContainer>
    </SpinnerWrapper>
  );
};

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const SpinnerContainer = styled.div`
  position: relative;
  margin: auto calc(50% - 2.3rem);

  .lds-ripple {
    color: rgb(96, 150, 255);
  }
  .lds-ripple,
  .lds-ripple div {
    box-sizing: border-box;
  }
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 6rem;
    height: 6rem;
  }
  .lds-ripple div {
    position: absolute;
    border: 0.3rem solid;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 2.7rem;
      left: 2.7rem;
      width: 0.6rem;
      height: 0.6rem;
      opacity: 0;
    }
    4.9% {
      top: 2.7rem;
      left: 2.7rem;
      width: 0.6rem;
      height: 0.6rem;
      opacity: 0;
    }
    5% {
      top: 2.7rem;
      left: 2.7rem;
      width: 0.6rem;
      height: 0.6rem;
      opacity: 1;
    }
    100% {
      top: 0;
      left: 0;
      width: 6rem;
      height: 6rem;
      opacity: 0;
    }
  }
`;
