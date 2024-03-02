import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import NoteCard from "../components/NoteCard";
import Loading from "../components/Loading";
import { getNotes, postUserInfo, postUserDeviceInfo } from "../firebase/firestore";
import { Note } from "../models/Note";
import Seperator from "../components/Seperator";

function NotesTab() {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Note[]>([]);

    useEffect(() => {
        postUserInfo();
        postUserDeviceInfo();
        const fetch = async () => {
            const result = await getNotes();
            setData(result);
            setLoading(false);
        }
        fetch();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            { loading ? (
                <Loading/>
            ) : (
                <FlatList
                    style={ styles.list }
                    data={ data }
                    renderItem={ (info) => <NoteCard note={info.item}/> }
                    keyExtractor={ (item) => item.id }
                    ItemSeparatorComponent={() => <Seperator/>}
                />
            ) }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        margin: 14
    }
})

export default NotesTab;