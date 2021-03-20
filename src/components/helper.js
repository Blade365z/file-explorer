export const initalizeDirectoryStructure = () => {
    const directoryTree = {
        home: {
            Air_Drop: {},
            Recents: {},
            Applications: {},
            Downloads: {},
            Amitabh: {},
            Music: {
                Pink_Floyd: {
                    Album1: {
                        Wallpapers: {

                        },
                        Songs: {

                        }
                    }
                },
                White_Snakes: {
                    Album2: {
                        Wallpapers: {

                        },
                        Songs: {

                        }
                    }
                },
                Pantera: {
                    Album3: {
                        Wallpapers: {

                        },
                        Songs: {

                        }
                    }
                }
            },
            Movies: {
                Action: {},
                Comedy: {}
            },
            Creative_Cloud_Files: {}
        }
    }
    if (!localStorage.getItem('directoryTree')) {
        localStorage.setItem('directoryTree', directoryTree);
    }
    return directoryTree;
}