import { useState } from "react";
import { StyleSheet } from "react-native";
import { Portal, Modal, Card, Text, TextInput, Button, IconButton } from "react-native-paper";
import { addNote } from "../firebase/firestore";
import { FirestoreResponse } from "../enums/Response";

function UploadNoteDialog({
    visible, onDismiss 
   } : {
       visible: boolean,
       onDismiss: () => void 
   }) {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const upload = async () => {
        setLoading(true);

        const response = await addNote({ title: title, description: description, link: link });

        switch(response) {
            case FirestoreResponse.success:
                setLoading(false);
                break;
            case FirestoreResponse.authError:
                alert("Auth Error");
                break;
            case FirestoreResponse.error:
                alert("Upload Failed. Check your inputs or internet connection");
                break;
        }
        setLoading(false);
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} style={styles.container}>
                <Card>
                    <Card.Title
                        title="Upload a note"
                        right={(props) => <IconButton icon="location-exit" size={props.size} onPress={onDismiss}/>}
                    />
                    <Card.Content>
                        
                        <TextInput
                            value={ title }
                            onChangeText={(e) => setTitle(e)}
                            placeholder="Enter title"  
                        />

                        <TextInput
                            value={ description }
                            onChangeText={(e) => setDescription(e)}
                            style={{
                                marginTop: 14,
                                maxHeight: 120
                            }}
                            placeholder="Enter Description"
                            multiline
                        />
                        
                        <TextInput
                            value={ link }
                            onChangeText={(e) => setLink(e)}
                            placeholder="Enter url"
                            style={{
                                marginTop: 14,
                                marginBottom: 14
                            }}
                        />

                        <Button 
                            mode="contained"
                            icon="upload"
                            onPress={ upload }
                            loading={ loading }
                            disabled={ loading }
                        >
                            <Text style={{ color: "white" }}>Upload</Text>
                        </Button>

                    </Card.Content>
                </Card>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        padding: 24
    }
});

export default UploadNoteDialog;
