import { Text } from "react-native-paper";
import { useState, useEffect } from "react";
import { getDeveloperNotice } from "../firebase/firestore";

export default function Notice() {

    const [notice, setNotice] = useState("");

    const update = async () => {
        setNotice("Fetching...");
        const res = await getDeveloperNotice();
        if(res !== 1) {
            setNotice(`${res.message}`);
        } else {
            setNotice("Reload Required");
        }
    };

    useEffect(() => {
        update();
    }, []);

    return (
        <Text 
            style={{ 
                textAlign: "center",
                color: "white",
                backgroundColor: "orange",
                marginHorizontal: 20,
                borderRadius: 12,
                padding: 6 
            }}
            onPress={update}
        >{notice}</Text>
    );
}