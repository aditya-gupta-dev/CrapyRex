import { ProgressBar, Button, Card, FAB, IconButton, Modal, Portal, Text, useTheme } from "react-native-paper";
import { StyleSheet, Platform } from "react-native";
import * as DocPicker from "expo-document-picker";
import { useState } from "react";
import { File } from "../models/File";
import { readAsStringAsync } from "expo-file-system";
import FoldersList from "./FoldersList";
import { confirmEligibility, uploadFile } from "../github/github";
import { Response } from "../enums/Response";

function UploadFileDialog({
    visible, onDismiss
}: {
    visible: boolean,   
    onDismiss: () => void
}) {

    const theme = useTheme();

    const [progress, setProgress] = useState<number>(0.00)
    const [fileSelected, setFileSelected] = useState<File | null>(null);
    const [uploadFolder, setUploadFolder] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const setFolder = (selected: string) => {
        setUploadFolder(selected);
    }

    const clickHandler = async () => {
        setFileSelected(null);

        try {
            const result = await DocPicker.getDocumentAsync({
                multiple: false
            });

            if (result.canceled) {
                setFileSelected(null);
                return;
            }

            const currentFile = result.assets[0];

            setFileSelected({
                name: currentFile.name,
                size: currentFile.size!,
                uri: currentFile.uri,
                mimeType: currentFile.mimeType!
            });
        } catch (err) {
            alert("Selection Failed.")
        }
    }

    const upload = async () => {
        setLoading(true);
        setProgress(0.0);

        let content = "";

        switch(Platform.OS) { 
            case "android":            
                content = await readAsStringAsync(fileSelected?.uri!, { encoding: "base64" })
                break;

            case "web":
                content = fileSelected?.uri!.split(',')[1]!;
                break;

            default:
                alert("Your current platform is not supported :( Coming Soon...");
        }

        let name = "";
        if(uploadFolder === "") {
            name = fileSelected?.name!; 
        } else {
            name = `${uploadFolder}/${fileSelected?.name}`; 
        }
        
        await confirmEligibility();
        
        const result = await uploadFile(name, content, (ev) => setProgress(ev.loaded / ev.total!))

        if(result === Response.success) {
            alert("Uploaded Successfully");
        } else {
            alert("Upload Failed");
        }
        setProgress(0.0);
        setLoading(false);
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
                <Card style={styles.card}>

                    <Card.Title
                        title={fileSelected ? fileSelected.name : "No File Selected"}
                        subtitle={fileSelected ? `${fileSelected.size} Bytes` : "No File Selected"}
                        titleNumberOfLines={1}
                        right={(props) => <IconButton icon="location-exit" size={props.size} onPress={onDismiss} />}
                    />

                    {fileSelected && (

                        <Card.Content>

                            <ProgressBar 
                                progress={progress}
                                style={{
                                    marginVertical: 12,
                                    backgroundColor: "#c9c9c9",
                                    borderRadius: 24
                                }}
                            />

                            <Button 
                                icon="cloud-upload"
                                mode="contained"
                                onPress={ upload }
                                style={{ marginVertical : 8 }}
                                loading={ loading }
                                disabled={ loading }
                            >
                                <Text style={{ color: "white" }}>Start Uploading</Text>
                            </Button>

                            <Text>{ uploadFolder }</Text>
                            <FoldersList folderSetter={setFolder}/>
                        </Card.Content>
                    )}

                    <FAB
                        icon="cloud-upload"
                        style={{ ...styles.fab, backgroundColor: theme.colors.primary }}
                        animated
                        onPress={clickHandler}
                    />
                </Card>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "white",
        padding: 12,
        margin: 24,
        flex: 1,
        borderRadius: 24
    },
    card: {
        flex: 1,
        borderRadius: 24,
        elevation: 14
    },
    fab: {
        position: "absolute",
        right: 10,
        bottom: 10
    }
})

export default UploadFileDialog;