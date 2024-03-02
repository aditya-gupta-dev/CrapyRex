import { useState } from "react";
import { Button, Card, IconButton, Modal, Portal, TextInput } from "react-native-paper";
import { addFolder } from "../firebase/firestore";
import { FirestoreResponse } from "../enums/Response";

export function CreateFolder({
    visible, onDismiss
}: {
    visible: boolean,
    onDismiss: () => void
}) {

    const [folder, setFolder] = useState("");
    const [loading, setLoading] = useState(false);

    const clickHandler = async () => {
        setLoading(true);
        if(folder !== "") {
            const result =  await addFolder(folder);
            if(result === FirestoreResponse.success) {
                setLoading(false);
            } else {
                alert("Folder Upload Failed");
            }
        } else {
            alert("Folder name is empty");
        }
        setLoading(false);
    }

    return (
        <Portal>
            <Modal 
                visible={visible}
                onDismiss={onDismiss}
                style={{
                    margin: 14
                }}
            >
                <Card style={{ padding: 14 }}>
                    <Card.Title 
                        title="Add New Folder"
                        right={props => <IconButton icon="location-exit" size={props.size} onPress={onDismiss}/>} 
                    />
                    <Card.Content>
                        <TextInput
                            value={folder}
                            onChangeText={(newText) => setFolder(newText) }
                            style={{ marginVertical: 8 }}
                        />
                        <Button
                            icon="plus"
                            mode="outlined"
                            loading={loading}
                            disabled={loading}
                            onPress={clickHandler}
                        >Add folder</Button>
                    </Card.Content>
                </Card>
            </Modal>
        </Portal>
    )
}