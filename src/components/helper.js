export const initalizeDirectoryStructure = () => {
    const directoryTrees = {
        home: {
            Air_Drop: {},
            Recents: {},
            Applications: {},
            Downloads: {},
            Amitabh: {
                Documents: {

                }
            },
            Music: {
                Pink_Floyd: {
                    Album1: {
                        Wallpapers: {

                        },
                        Songs: {

                        }
                    },
                    Album2: {
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
    const directoryTree = {
        home: {
            17772: {
                name: 'Amitabh',
                child: {
                    177773: {
                        name: 'Documents',
                        child: {

                        }
                    },
                    177774: {
                        name: 'Files',
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
    if (!localStorage.getItem('directoryTree')) {
        localStorage.setItem('directoryTree', directoryTree);
    }
    return directoryTree;
}