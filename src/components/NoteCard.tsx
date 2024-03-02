import { Button, Card, Text } from "react-native-paper";
import { Note } from "../models/Note";
import { useState } from "react";
import DetailedCardDialog from "./DetailedCardDialog";

function NoteCard({
    note
}: {
    note: Note
}) {

    const [toggleModal, setToggleModal] = useState<boolean>(false)

    const dismiss = () => setToggleModal(false);

    return (
        <Card onPress={() => setToggleModal(true)}>
            <Card.Title
                title={note.title}
                subtitle={note.description}
            />

            {note.link !== '' && (
                <Card.Content>
                    <Button
                        icon="link-variant"
                        mode="contained"
                        style={{
                            borderRadius: 16,
                            elevation: 16,
                            marginBottom: 8
                        }}
                    >
                        <Text style={{ color: "white" }}>Visit</Text>
                    </Button>
                </Card.Content>
            )}

            <DetailedCardDialog
                visible={toggleModal}
                onDismiss={dismiss}
                note={note}
            />
        </Card>

    );
}

export default NoteCard;