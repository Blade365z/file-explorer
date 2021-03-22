//Directory Tree Initiator


export const initalizeDirectoryStructure = (Tree = null) => {
    var directoryTree = {}
    //Check if exists in LS
    if (!localStorage.getItem('directoryTree')) {
        if (Tree) {
            directoryTree = Tree
        } else {
            directoryTree = {
                home: {
                    6710: {
                        name: 'Air_Drop',
                        child: {

                        }
                    },
                    6722: {
                        name: 'Recents',
                        child: {

                        }
                    },

                    6711: {
                        name: 'Applications',
                        child: {
                            177773: {
                                name: 'Lightroom',
                                child: {

                                }
                            },
                            177774: {
                                name: 'Photoshop',
                                child: {

                                }
                            }
                        }
                    },

                    17772: {
                        name: 'Amitabh',
                        child: {
                            177773: {
                                name: 'Documents',
                                child: {

                                }
                            },
                            177774: {
                                name: 'Downloads',
                                child: {

                                }
                            }
                        }
                    },
                    18882: {
                        name: 'Music',
                        child: {
                            1888234: {
                                name: 'Pink_Floyd',
                                child: {
                                    188299391: {
                                        name: 'First_Album',
                                        child: {

                                        }
                                    },
                                    188299392: {
                                        name: 'Second_Album',
                                        child: {

                                        }
                                    }
                                }
                            },
                            1888235: {
                                name: 'Megadeth',
                                child: {
                                    188299391: {
                                        name: 'First_Album',
                                        child: {

                                        }
                                    },
                                    188299392: {
                                        name: 'Second_Album',
                                        child: {

                                        }
                                    }
                                }
                            },
                        }
                    },
                    18883: {
                        name: 'Movies',
                        child: {
                            15447586: {
                                name: 'Adventure',
                                child: {
                                    5256355: {
                                        name: 'Fast & Furious',
                                        child: {
                                            5251: {
                                                name: 'FF7',
                                                child: {

                                                },
                                            },
                                            1213233: {
                                                name: 'Tokyo Drift',
                                                child: {

                                                }
                                            },
                                        }
                                    },
                                    8966525: {
                                        name: 'Jumanji',
                                        child: {

                                        }
                                    }
                                }
                            },
                            78455124: {
                                name: 'Comedy',
                                child: {
                                    121212121: {
                                        name: 'Rush_hour',
                                        child: {

                                        }
                                    },
                                    3211221: {
                                        name: 'The Dictator',
                                        child: {

                                        }
                                    }
                                }
                            },
                        }
                    }
                }
            }
        }
        localStorage.setItem('directoryTree', JSON.stringify(directoryTree));
    } else {
        directoryTree = JSON.parse(localStorage.getItem('directoryTree'))
    }
    return directoryTree;
}

 //Update Tree on Procss
export const updateDirectoryTree = (updatedTree) => {
    if (localStorage.getItem('directoryTree')) {
        localStorage.setItem('directoryTree', JSON.stringify(updatedTree));
    } else {
        initalizeDirectoryStructure(updatedTree);
    }
}