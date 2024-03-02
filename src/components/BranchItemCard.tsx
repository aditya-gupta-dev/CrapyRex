import { useState } from "react";
import { downloadFile, getFolderInfo } from "../github/github";
import { BranchItem } from "../models/BranchItem";
import { Button, Card, IconButton, Modal, Portal } from "react-native-paper";
import { FlatList, Linking } from "react-native";
import Seperator from "./Seperator";
 
export default function BranchItemCard({
    branchItem,
    name
}: {
    branchItem: BranchItem,
    name: string
}) {

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<FolderItem[]>([]);

    const openLink = async () => {
        const response = await downloadFile(branchItem.path);
        if(response)
            Linking.openURL(response);
        else
            alert("unable to get download url");
    }

    const listFiles = async () => {
        const info = await getFolderInfo(branchItem.url);
        setData(info);
        setVisible(true);   
    }

    return (
        <Card>
            <Card.Title
                left={props => <IconButton size={props.size} icon={branchItem.type === "tree" ? "folder" : "file"}/>}
                title={branchItem.path}
            />
            
            <Card.Content>
            { branchItem.type === "tree" ? (
                <Button icon="view-list" mode="contained" onPress={listFiles}>Files</Button>    
            ) : (
                <Button icon="download" mode="contained" onPress={openLink}>Download</Button>
            )}
            </Card.Content>

            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                >
                    <Card>
                        <Card.Title 
                            title="files"
                            subtitle={`${data.length} files`}
                            right={() => <IconButton icon="location-exit" onPress={() => setVisible(false)}/>}
                        />
                        <Card.Content>
                            <FlatList
                                data={data}
                                keyExtractor={item => item.sha}
                                ItemSeparatorComponent={() => <Seperator/>}
                                renderItem={(props) => <FolderItem item={props.item} name={name}/>}
                                style={{
                                    padding: 14,
                                    maxHeight: 350
                                }}
                            />
                        </Card.Content>
                    </Card>
                    
                </Modal>
            </Portal>
        </Card>
    );
}

function FolderItem({
    item,
    name
}: {
    item: FolderItem,
    name: string
}) {

    const onClick = async () => {
        const response = await downloadFile(`${name}/${item.path}`);
        if(response) {
            Linking.openURL(response);
        } else {
            alert("unable to get download url");
        }
    }

    return (
        <Card
            style={{
                backgroundColor: "#c9c9c9"
            }}
        >
            <Card.Title 
                title={item.path} 
                subtitle={`${item.size} bytes`}                
            />
            <Card.Content>
                <Button mode="contained" icon="download" onPress={onClick}>Download</Button>
            </Card.Content>
        </Card>
    );
}