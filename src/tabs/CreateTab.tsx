import { View, ScrollView, StyleSheet } from "react-native";
import { Card,Text } from "react-native-paper";
import UploadNoteDialog from "../components/UploadNoteDialog";
import { useState } from "react";
import UploadFileDialog from "../components/UploadFileDialog";
import { CreateFolder } from "../components/CreateFolder";

function CreateTab() {

    const [noteShown, setNoteDialogVisible] = useState(false);
    const [fileShown, setFileDialogVisible] = useState(false); 
    const [folderShown, setFolderDialogVisible] = useState(false); 

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <ScrollView style={styles.scroll}>

                <Card style={styles.container} onPress={() => setNoteDialogVisible(true)}>
                    <Text style={{ fontSize: 26, fontWeight: "bold" }}>Upload Note</Text>
                </Card>
                <Card style={styles.container} onPress={() => setFileDialogVisible(true)}>
                    <Text style={{ fontSize: 26, fontWeight: "bold" }}>Upload File</Text>
                </Card>
                <Card style={styles.container} onPress={() => setFolderDialogVisible(true)}>
                    <Text style={{ fontSize: 26, fontWeight: "bold" }}>Add Folder</Text>
                </Card>

            </ScrollView>

            { noteShown && (
                <UploadNoteDialog visible={noteShown} onDismiss={() => setNoteDialogVisible(false)}/> 
            )}
            { fileShown && (
                <UploadFileDialog visible={fileShown} onDismiss={() => setFileDialogVisible(false)}/>
            )}
            { folderShown && (
                <CreateFolder visible={folderShown} onDismiss={() => setFolderDialogVisible(false)}/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        marginVertical: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    scroll: {
        padding: 14
    }
})

export default CreateTab;