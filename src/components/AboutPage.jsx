import { css } from "@emotion/react";
import { Box, Card } from "rebass";

const AboutPage = ({ aboutPageActive, setAboutPageActive }) => {
    return (
     <>
     <Box css={css`
        position: absolute;
        width:100vw;
        height: 100vh;
        left: 0;
        top: 0;

    `}>
        <Box css={css`
        position: absolute;
        width: 100vw;
        height: 100vh;
        z-index: 1;
        background: #000;
        opacity: 0.7;`}
        onClick={() => setAboutPageActive(!aboutPageActive)}
        />
        
            <Card css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            background-color: #191918;
            padding: 1.5rem;
            border-radius: 10px;
            min-width: 300px;
            `}>
                <h1>Addis Software Test Project</h1>
            </Card>
    </Box>
     </>   
    )
};
    
    export default AboutPage;