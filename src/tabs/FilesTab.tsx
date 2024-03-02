import { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import Loading from "../components/Loading";
import { listFilesAndFolders } from "../github/github";
import { auth } from "../firebase/firebase";
import { BranchItem } from "../models/BranchItem";
import Seperator from "../components/Seperator";
import BranchItemCard from "../components/BranchItemCard";

function FilesTab() {

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<BranchItem[]>([]);

    useEffect(() => {
        setLoading(true);
        listFilesAndFolders(auth.currentUser?.email!)
        .then((res) => {
            setData(res);            
            setLoading(false);
        });        
    }, []);

    return(
        <SafeAreaView style={{ flex: 1 }}>
            { loading ? (
                <Loading/>
            ) : (
                <FlatList 
                    data={data}
                    keyExtractor={item => item.sha}
                    style={{
                        flex: 1,
                        margin: 14
                    }}
                    ItemSeparatorComponent={() => <Seperator/>}
                    
                    renderItem={(props) => <BranchItemCard branchItem={props.item} name={props.item.path}/>}
                />
            ) }
        </SafeAreaView>
    );
}

export default FilesTab;