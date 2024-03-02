import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: Platform.OS === "web" ? "center" : "stretch",
        margin: 14
    },
    marginTopSmall: {
        marginTop: 14
    },
    heading: { 
        textAlign: "center",
        fontSize: 36,
        fontWeight: "800",
        color: "white"
    },
});
