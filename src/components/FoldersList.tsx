import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Card, Text } from "react-native-paper";
import Seperator from "./Seperator";
import { getFolders } from "../firebase/firestore";
import { Folder } from "../models/Folder";

export default function FoldersList({
    folderSetter
}: {
    folderSetter: (selected: string) => void
}) {

    const [folders, setFolders] = useState<Folder[]>([])


    useEffect(() => {
        getFolders().then((val) => setFolders(val))
    }, []);

    return (
        <Card
            style={{
                elevation: 10,
                marginVertical: 16,
                height: 325
            }}
        >
            <Card.Title title="Folders" />
            <Card.Content>
                {folders.length === 0 ? (
                    <Text>No folders created</Text>
                ) : (
                    <FlatList
                        data={folders}
                        keyExtractor={it => it.id}
                        renderItem={it => <FolderItem name={it.item.name} onClick={() => folderSetter(it.item.name)} />}
                        ItemSeparatorComponent={() => <Seperator />}
                        style={{
                            height: 250
                        }}
                    />
                )
                }
            </Card.Content>
        </Card>
    );
}

function FolderItem({
    name,
    onClick
}: {
    name: string,
    onClick: (str: string) => void
}) {
    return (
        <Card
            style={{
                backgroundColor: "#c9c9c9"
            }}
            onPress={() => onClick(name)}
        >
            <Card.Title title={name} />
        </Card>
    );
}