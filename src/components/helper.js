export const initalizeDirectoryStructure = () => {
    const directoryTree = {
        home: {
            Air_Drop:{},
            Recents: {},
            Applications: {},
            Downloads: {},
            Amitabh: {},
            Music: {
                Pink_Floyd:{},
                White_Snakes:{},
                Pantera:{}
            },
            Movies: {},
            Creative_Cloud_Files: {}
            }
    }
    if(!localStorage.getItem('directoryTree')){
            localStorage.setItem('directoryTree',directoryTree);
    }
    return directoryTree;
}