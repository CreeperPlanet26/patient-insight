"use client";
import { createTheme, ThemeProvider } from "@mui/material";


const theme = createTheme({
    palette: {
        text: {
            primary: "#FFFFFF",
        },
        primary: {
            main: "#ff3f3f",
            light: "#e94d3d",
            contrastText: "#fff",
        },
        secondary: {
            main: "#3f69ff",
            contrastText: "#fff",
        },
    },
    typography: {
        fontFamily: "Rubik",
    },
});


export default function ThemeRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}