import { SafeAreaView, Platform } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { auth } from "../firebase/firebase";
import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import Notice from "../components/Notice";

function ProfileTab() {

    const [verifyText, setVerifyText] = useState("Send Verification Link");

    const signOut = async () => {
        await auth.signOut();
    };

    const verify = async () => {
        sendEmailVerification(auth.currentUser!);
        setVerifyText("Check Inbox")
    }

    return (
        <SafeAreaView>
            <Card style={{ margin: 8 }}>
                <Card.Title
                    left={() => <Avatar.Image
                        source={{ uri: auth.currentUser?.photoURL! }}
                        style={{ marginVertical: 8 }}
                    />}
                    title=""
                />
                <Card.Content style={{ backgroundColor: "#c9c9c9", margin: 6 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 8 }}>Email: {auth.currentUser?.email}</Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 8 }}>{auth.currentUser?.displayName}</Text>

                    {auth.currentUser?.emailVerified ? (<Button icon="check" color="green" mode="outlined">Email Verified</Button>) : (
                        <Button icon="exclamation-thick" mode="outlined" onPress={verify}>{verifyText}</Button>
                    )}

                    <Button onPress={signOut} style={{ marginVertical: 8 }} mode="contained">Sign Out</Button>
                </Card.Content>
            </Card>
            <Notice />

        </SafeAreaView>
    );
}

export default ProfileTab;