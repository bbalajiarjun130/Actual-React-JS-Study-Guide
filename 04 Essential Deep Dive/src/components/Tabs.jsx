import { Children } from "react";

export default function Tabs({ children, buttons, ButtonsContainer = Section }) {
    // const ButtonsContainer = buttonsContainer;
    return ( <> 
         <ButtonsContainer>
            {buttons}
        </ButtonsContainer>
        {children}
    </>   
    );
}