import { Card, Modal, Portal, IconButton, Text, Button } from "react-native-paper";
import { Note } from "../models/Note";
import { ScrollView, Linking } from "react-native";

function DetailedCardDialog({
    note, visible, onDismiss
}: {
    note: Note,
    visible: boolean,
    onDismiss: () => void
}) {

    const onLinkButtonPressed = () => {
        if(note.link) {
            Linking.openURL(note.link);
        } else {
            alert("link was not provided");
        }
    }

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                style={{
                    backgroundColor: "white",
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 20,
                    marginBottom: 20,
                    borderRadius: 24,
                    justifyContent: "flex-start",
                    elevation: 16
                }}
            >
                <Card style={{ margin: 10 }}>
                    <Card.Title
                        titleNumberOfLines={1}
                        title={note.title}
                        right={() => <IconButton icon="location-exit" onPress={onDismiss} />}
                    />
                    <Card.Content>
                        {note.link !== '' && (
                            <Button mode="contained" onPress={onLinkButtonPressed}>
                                Visit Attached Link
                            </Button>
                        )}
                        <ScrollView
                            style={{
                                marginTop: 12,
                                backgroundColor: "#c9c9c9",
                                borderRadius: 12,
                                padding: 12,
                                maxHeight: 400
                            }}
                        >
                            <Text selectable>{note.description}</Text>
                        </ScrollView>
                    </Card.Content>
                </Card>
            </Modal>
        </Portal>
    );
};

export default DetailedCardDialog;